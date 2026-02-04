import React, {useState} from "react";
import Coupon from "@/models/coupon/Coupon";
import CommonService from "@/Services/CommonService/CommonService";
import FormService from "@/Services/FormService/FormService";
import CouponService from "@/Services/CouponService/CouponService";
import {Container} from "typedi";
import "reflect-metadata";

import {z} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import ValidatedSwitch from "@/Components/ValidatedComponents/ValidatedSwitch";
import ValidatedInput from "@/Components/ValidatedComponents/ValidatedInput";
import ValidatedAutoGenerateInput from "@/Components/ValidatedComponents/ValidatedAutoGenerateInput";
import ValidatedDatePicker from "@/Components/ValidatedComponents/ValidatedDatePicker";
import CustomButton from "@/Components/Button/CustomButton";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import DeleteModal from "@/Components/DeleteModal/DeleteModal";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import ValidatedPercentInput from "@/Components/ValidatedComponents/ValidatedPercentInput";
import {
    Box,
    Stack,
    Typography,
} from "@mui/material";
import Offer from "@/models/offer/Offer";
import {router} from "@inertiajs/react";


const CouponForm: React.FC<{
    coupon?: Coupon,
    handleChange?: (coupon: Coupon) => void,
}> = ({
    coupon = new Coupon({}),
    handleChange,
                        }) => {
    const [selectedCoupon, setSelectedCoupon] = React.useState<Coupon>(coupon);
    const formService = Container.get(FormService);
    const couponService = Container.get(CouponService);
    const couponSchema = z.object({
        code: z.string().min(8, {message: 'Code must be at least 8 characters'}),
        coupon: z.object({
            percent: z.boolean(),
            amount: z.string()
                .default('0')
                .refine(formService.isNumeric, {message: 'Coupon Amount must be number!'})
                .refine(formService.isPositive, {message: 'Coupon Amount must be more than 0!'}),
        }).refine(({percent, amount}) => {
            return (!percent || parseFloat(amount) < 100)
        }, {
            message: "Percent Coupon is between 0% and 100%",
            path: ['amount'],
        }),

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
        }),
    });

    type couponSchemaType = z.infer<typeof couponSchema>;

    const methods = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(couponSchema),
        defaultValues: {
            code: selectedCoupon.code,
            isActive: selectedCoupon.isActive,
            coupon: {
                percent: selectedCoupon.isPercent,
                amount: String(selectedCoupon.amount),
            },
            date: {
                startDate: new Date(selectedCoupon.startDate),
                endDate: new Date(selectedCoupon.endDate),
            }
        }
    });

    const receivePercentSwitchState = (value: boolean) => {
        console.log('switch state: ', value);
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
    //Handle Add/Update Coupon:
    const onSubmit = () => {
        const formData = new FormData();
        formData.append('isActive', String(methods.getValues('isActive')));
        formData.append('isPercent', String(methods.getValues('coupon.percent')));
        formData.append('amount', String(methods.getValues('coupon.amount')));
        formData.append('code', methods.getValues('code'));
        formData.append('startDate', new Date(methods.getValues('date.startDate')).toDateString());
        formData.append('endDate', new Date(methods.getValues('date.endDate')).toDateString());
        if (coupon.id > 0) {
            couponService.updateCoupon(formData, coupon.id).then(response => {
                setSelectedCoupon(response.data);
                if (handleChange) handleChange(response.data);
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Coupon has been updated!', severity: "success" })
                );
            }).catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error while updating coupon!', severity: "error" })
                );
            })
        } else {
            couponService.storeCoupon(formData)
                .then(response => {
                    setSelectedCoupon(response.data);
                    setSnackbar(snackbarState =>
                        ({ ...snackbarState, open: true, message: 'Coupon has been added!', severity: "success" })
                    );
                })
                .catch(error => {
                    setSnackbar(snackbarState =>
                        ({ ...snackbarState, open: true, message: 'Error while adding coupon!', severity: "error" })
                    );
                })
        }
        // console.log('submit');
        // console.log('code: ', methods.getValues('code'));
        // console.log('percent: ', methods.getValues('coupon.percent'))
        // console.log('amount: ', methods.getValues('coupon.amount'))

    }
    // =========================================================================================
    // Handle Delete Coupon:
    const onDelete = () => {
        couponService.deleteCoupon(selectedCoupon.id).then(response => {
            router.get('/admin/marketing/coupon');
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Coupon has been deleted!', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error while deleting coupon!', severity: "error" })
            );
        })
    }

    return (
        <Box>
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
                        switchControlName={'coupon.percent'}
                        inputControlName={'coupon.amount'}
                        switchName={'isPercent'}
                        switchId={'isPercent'}
                        switchLabel="Is Percent"
                        inputName="amount"
                        inputId="amount"
                        inputLabel="Coupon Amount"
                        sendSwitchState={receivePercentSwitchState}
                    />

                    <ValidatedAutoGenerateInput
                        controlName="code"
                        name="code"
                        id="code"
                        label="Code"
                        placeholder="Code"
                        methods={methods}
                    />

                    <ValidatedDatePicker
                        controlName="date.startDate"
                        methods={methods}
                        label="Start Date"

                    />

                    <ValidatedDatePicker
                        controlName="date.endDate"
                        methods={methods}
                        label="End Date"
                    />
                    {
                        coupon.id < 0
                            ? <CustomButton task='add' text="New Coupon"></CustomButton>
                            : <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                                className="m-[8px]"
                            >
                                <CustomButton type="submit" task="update" text="Coupon"></CustomButton>
                                <CustomButton task="delete" text="Coupon" onClick={handleOpenModal}></CustomButton>
                            </Stack>
                    }

                </Box>
            </FormProvider>

            <DeleteModal
                open={openModal}
                onClose={handleCloseModal}
                message={`Are you sure that you want to delete this coupon?`}
                confirmDelete={onDelete}
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

export default CouponForm;
