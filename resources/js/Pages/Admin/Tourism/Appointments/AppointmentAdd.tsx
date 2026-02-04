import React from 'react';
import {Container} from "typedi";
import BlockService from "@/Services/BlockService/BlockService";
import CommonService     from "@/Services/CommonService/CommonService";
import AppointmentService from "@/Services/BlockService/AppointmentService";
import "reflect-metadata";
import Trip from "@/models/block/Trip";
import BlockCategories from "@/Enums/BlockCategories";

import {z} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import {Box, Breadcrumbs, Stack, Typography} from "@mui/material";
import {Head, Link} from "@inertiajs/react";
import ValidatedSelect from "@/Components/ValidatedComponents/ValidatedSelect";
import ValidatedDatePicker from '@/Components/ValidatedComponents/ValidatedDatePicker';
import ValidatedCheckbox from "@/Components/ValidatedComponents/ValidatedCheckbox";
import CustomButton from "@/Components/Button/CustomButton";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import FormService from "@/Services/FormService/FormService";




const AppointmentAdd: React.FC<{category: string}> = ({category}) => {
    const blockService = Container.get(BlockService);
    const commonService = Container.get(CommonService);
    const appointmentService = Container.get(AppointmentService);
    const formService = Container.get(FormService);
    const [trips, setTrips] = React.useState<Trip []>([]);

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
            blockId:' -1',
            startDate: new Date(),
            isActive: true,
        }
    })

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    React.useEffect(() => {
        blockService.getActiveBlocks(BlockCategories.TRIP).then(response => {
            setTrips(response.data as Trip[]);

            console.log(response.data);
            methods.setValue('blockId', response.data[0].id.toString(), {
                shouldValidate: false,
                shouldDirty: false,
            });
        })
    }, [])

    const onSubmit = () => {
        const formData = new FormData();
        formData.append("category", category);
        formData.append('blockId', String( methods.getValues('blockId') ));
        formData.append('startDate', new Date(methods.getValues('startDate')).toDateString());
        formData.append('isActive', String(methods.getValues('isActive')));

        appointmentService.store(formData)
            .then(response => {
                methods.reset();
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

    return (
        <AdminLayout>
            <Head title={'Appointments'}></Head>
            <Box className="py-[16px]">
                <Box>
                    <Breadcrumbs>
                        <Link href={`/admin/appointments`}>Back to {commonService.toTitleCase(category)}</Link>
                        <Typography>Add New {commonService.toTitleCase(category)}</Typography>
                    </Breadcrumbs>
                    <Box className="p-[16px]">
                        <Typography variant="h5">Add New {commonService.toTitleCase(category)}</Typography>
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
                        className="mx-[8px] my-[24px]"
                    >
                        <CustomButton task="add" text={commonService.toTitleCase(category)}></CustomButton>
                    </Stack>

                </Box>
            </FormProvider>

                    <CustomSnackbar
                        open={snackbar.open}
                        message={snackbar.message}
                        onClose={handleClose}
                        severity={snackbar.severity}
                    />
                </Box>
            </Box>
        </AdminLayout>
    );
};

export default AppointmentAdd;
