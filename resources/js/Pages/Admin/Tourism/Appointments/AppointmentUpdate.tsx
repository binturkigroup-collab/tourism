import React from 'react';
import {Block} from "@/models/block/Block";
import Appointment from "@/models/block/Appointment";
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import {Box, Breadcrumbs, Stack, Typography} from "@mui/material";
import {Head, Link, router} from "@inertiajs/react";
import {Container} from "typedi";
import BlockService from "@/Services/BlockService/BlockService";
import CommonService     from "@/Services/CommonService/CommonService";
import AppointmentService from "@/Services/BlockService/AppointmentService";
import "reflect-metadata";
import Trip from "@/models/block/Trip";
import BlockCategories from "@/Enums/BlockCategories";
import FormService from "@/Services/FormService/FormService";
import {z} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import ValidatedCheckbox from "@/Components/ValidatedComponents/ValidatedCheckbox";
import ValidatedSelect from "@/Components/ValidatedComponents/ValidatedSelect";
import ValidatedDatePicker from "@/Components/ValidatedComponents/ValidatedDatePicker";
import CustomButton from "@/Components/Button/CustomButton";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import DeleteModal from '@/Components/DeleteModal/DeleteModal';

const AppointmentUpdate: React.FC<{appointment: Appointment}> = ({appointment}) => {
    const blockService = Container.get(BlockService);
    const commonService = Container.get(CommonService);
    const appointmentService = Container.get(AppointmentService);
    const formService = Container.get(FormService);
    const [trips, setTrips] = React.useState<Trip []>([]);
    const [selectedAppointment, setSelectedAppointment] = React.useState<Appointment>(appointment);

    const appointmentSchema = z.object({
        blockId: z.string({message: "Please determine the trip"}).refine(val => {
            return formService.isPositive(val)
        }),
        startDate: z.date({message: "Date is required!"})
    })

    type appointmentType = z.infer<typeof appointmentSchema>;

    const methods = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            blockId: selectedAppointment.blockId.toString(),
            startDate: new Date(selectedAppointment.startDate),
            isActive: selectedAppointment.isActive,
        }
    })

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================
    // Handle Modal for Delete:
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    // =========================================================================================

    React.useEffect(() => {
        blockService.getActiveBlocks(BlockCategories.TRIP).then(response => {
            setTrips(response.data as Trip[]);
        })
    }, [])

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('blockId', String( methods.getValues('blockId') ));
        formData.append('startDate', new Date(methods.getValues('startDate')).toDateString());
        formData.append('isActive', String(methods.getValues('isActive')));

        appointmentService.update(formData, appointment.id)
            .then(response => {
                console.log('response', response.data.appointment)
                setSelectedAppointment(response.data.appointment)
                setSnackbar(snackbarState =>
                    ({ ...snackbarState,
                            open: true,
                            message: 'A new appointment has been added', severity: "success" }
                    )
                );
            })
            .catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error Happened while storing appointment', severity: "error" })
                );
            })
    }

    // =========================================================================================
    // Handle delete appointment

    const deleteAppointment = () => {
        setOpenModal(false);
        const formData = new FormData;
        formData.append('category', 'appointment');
        appointmentService.destroy(appointment.id, formData)
            .then(response => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Block has been deleted!', severity: "success" })
                );
                router.get('/admin/appointments');
            })
            .catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error Happened while deleting block!', severity: "error" })
                );
            })
    }

    return (
        <AdminLayout>
            <Head title={'Appointments'}></Head>
            <Box className="py-[16px]">
                <Box>
                    <Breadcrumbs>
                        <Link href={`/admin/appointments`}>Back to Appointments</Link>
                        <Typography>Update {selectedAppointment.trip}</Typography>
                    </Breadcrumbs>
                    <Box className="p-[16px]">
                        <Typography variant="h5">Update {selectedAppointment.trip}</Typography>
                    </Box>

                    <FormProvider {...methods}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <ValidatedCheckbox
                                name="isActive"
                                id="isActive"
                                color="secondary"
                                control={methods.control}
                                label="Is Active"
                            />
                            {trips.length > 0 && <ValidatedSelect
                                control={methods.control}
                                controlName='blockId'
                                id="blockId"
                                label="Trip"
                                placeholder="Trip"
                                withNone={false}
                                // items={blockService.getAllTranslations(selectedCategories)}
                                items={trips.map(trip => ({
                                    id: trip.id.toString(),
                                    name: blockService.getBlockName(trip),
                                }))}

                            />}

                            <ValidatedDatePicker
                                controlName="startDate"
                                methods={methods}
                                label="Trip Date"
                            />

                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                                className="m-[8px]"
                            >
                                <CustomButton task="update" text={''}></CustomButton>
                                <CustomButton task="delete" text={''} onClick={handleOpenModal}></CustomButton>
                            </Stack>

                        </Box>
                    </FormProvider>

                    <CustomSnackbar
                        open={snackbar.open}
                        message={snackbar.message}
                        onClose={handleClose}
                        severity={snackbar.severity}
                    />

                    <DeleteModal
                        open={openModal}
                        onClose={handleCloseModal}
                        message={`Are you sure that you want to delete this appointment?`}
                        confirmDelete={deleteAppointment}
                    ></DeleteModal>
                </Box>
            </Box>
        </AdminLayout>
    );
};

export default AppointmentUpdate;
