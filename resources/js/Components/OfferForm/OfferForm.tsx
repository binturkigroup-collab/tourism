import React, {useMemo, useState} from "react";
import styles from "./styles.module.scss";
import {z} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormService from "@/Services/FormService/FormService";
import OfferService from "@/Services/OfferService/OfferService";
import {Container} from "typedi";
import "reflect-metadata";
import ValidatedSwitch from "@/Components/ValidatedComponents/ValidatedSwitch";
import ValidatedDatePicker from "@/Components/ValidatedComponents/ValidatedDatePicker";
import CustomButton from "@/Components/Button/CustomButton";
import {
    Box,
    Stack,
    Typography,
} from "@mui/material";
import Offer from "@/models/offer/Offer";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import DeleteModal from "@/Components/DeleteModal/DeleteModal";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import {router} from "@inertiajs/react";
import ValidatedPercentInput from "@/Components/ValidatedComponents/ValidatedPercentInput";

const OfferForm: React.FC<{
    type?: string,
    id?: number,
    offer?: Offer,
    handleChange?: (ofr: Offer) => void,
}> = ({
       type = 'all',
       id = -1,
        offer = new Offer({}),
        handleChange,
}) => {
    const [isPercent, setIsPercent] = React.useState<boolean>(offer.isPercent);
    const [selectedOffer, setSelectedOffer] = React.useState<Offer>(offer);
    const formService = Container.get(FormService);
    const offerService = Container.get(OfferService);
    const offerSchema = z.object({
        isActive: z.boolean().default(true),
        offer: z.object({
            percent: z.boolean(),
            amount: z.string()
                .default('0')
                .refine(formService.isNumeric, {message: 'Offer Amount must be number!'})
                .refine(formService.isPositive, {message: 'Offer Amount must be more than 0!'}),
        }).refine(({percent, amount}) => {
            return (!percent || parseFloat(amount) < 100)
        }, {
            message: "Percent Offer is between 0% and 100%",
            path: ['amount'],
        }),
        // TODO: refine dates such that startDate is less than endDate, after choosing date-time picker!
        date: z.object({
            startDate: z.coerce.date().refine(date => {
                // return date > (new Date());
                return true;
            }, {message: "Start date should be in the future"}),
            endDate: z.coerce.date().refine(date => {
                // return date.getTime() > (new Date()).getTime();
                return true;
            }, {message: "End date should be in the future"}),
        }).refine(async ({startDate, endDate}) => {
            return  endDate > startDate;
        }, {
            message: "End date should be after start date",
            path: ["endDate"],
        })

    });

    type offerSchemaType = z.infer<typeof offerSchema>;

    const methods = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(offerSchema),
        defaultValues: {
            isActive: selectedOffer.isActive,
            offer: {
                percent: selectedOffer.isPercent,
                amount: String(selectedOffer.amount),
            },
            date: {
                startDate: new Date(selectedOffer.startDate),
                endDate: new Date(selectedOffer.endDate),
            }
        }
    });

    const receivePercentSwitchState = (value: boolean) => {
        setIsPercent(value);
    }

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================
    // Handle Modal for Delete:
    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    // =========================================================================================


    const onSubmit = () => {
        const refId = offer && offer.referenceId > 0 ? offer.referenceId : id;
        const formData = new FormData();
        formData.append('type', offer?.type || type);
        formData.append('id', String(refId));
        formData.append('isActive', String(methods.getValues('isActive')));
        formData.append('isPercent', String(methods.getValues('offer.percent')));
        formData.append('amount', String(methods.getValues('offer.amount')));
        formData.append('startDate', new Date(methods.getValues('date.startDate')).toDateString());
        formData.append('endDate', new Date(methods.getValues('date.endDate')).toDateString());

        //Update status
        if (offer.id > 0) {
            offerService.updateOffer(formData, selectedOffer.id).then(response => {
                setSelectedOffer(response.data);
                if (handleChange) handleChange(response.data);
                // methods.reset();
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Offer has been updated!', severity: "success" })
                );
            }).catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error while updating offer!', severity: "error" })
                );
            })
        }

        //Store status
        else {
            offerService.storeOffer(formData).then(response => {
                setSelectedOffer(response.data);
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Offer has been added!', severity: "success" })
                );
            }).catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error while adding offer!', severity: "error" })
                );
            })
        }
    }

    const deleteOffer = () => {
        offerService.deleteOffer(selectedOffer.id).then(response => {
            router.get('/admin/marketing/offer');
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Offer has been deleted!', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error while deleting offer!', severity: "error" })
            );
        })
    }

    return (
        <Box>
            {
                offer && offer.type === 'common' && <Typography variant="body1">This offer is general and will applied on all products</Typography>
            }

            <Box className="p-[16px]">
                {
                    offer && offer.id > 0 && <Typography variant="body1">This offer is applied to {offer.name}</Typography>
                }
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
                    <ValidatedSwitch
                        controlName="isActive"
                        name="isActive"
                        id="isActive"
                        color="secondary"
                        label="Is Active"
                        methods={methods}
                        // sendSwitchState={receiveSwitchState}
                    />

                    <ValidatedPercentInput
                        methods={methods}
                        switchControlName={'offer.percent'}
                        inputControlName={'offer.amount'}
                        switchName={'isPercent'}
                        switchId={'isPercent'}
                        switchLabel="Is Percent"
                        inputName="amount"
                        inputId="amount"
                        inputLabel="Offer Amount"
                        sendSwitchState={receivePercentSwitchState}
                    />

                    <ValidatedDatePicker
                        controlName="date.startDate"
                        methods={methods}
                        label="Start Date"
                        // disablePast
                    />

                    <ValidatedDatePicker
                        controlName="date.endDate"
                        methods={methods}
                        label="End Date"
                        // disablePast
                    />
                    {
                        offer.id < 0
                            ? <CustomButton task='add' text="New Offer"></CustomButton>
                            : <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                                className="m-[8px]"
                            >
                                <CustomButton task="update" text="Offer"></CustomButton>
                                <CustomButton task="delete" text="Offer" onClick={handleOpenModal}></CustomButton>
                            </Stack>
                    }

                </Box>
            </FormProvider>

            <DeleteModal
                open={openModal}
                onClose={handleCloseModal}
                message={`Are you sure that you want to delete this offer?`}
                confirmDelete={deleteOffer}
            ></DeleteModal>

            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </Box>
    );
}

export default OfferForm;
