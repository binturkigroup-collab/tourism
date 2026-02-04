import React from 'react';
import {useTranslation} from "react-i18next";
import {Container} from "typedi";
import EmailService from "@/Services/NotificationService/EmailService/EmailService";
import "reflect-metadata";
import {useAppDispatch} from "@/Redux/Store/hook";
import {usePage} from "@inertiajs/react";
import useRecaptcha from "@/Hooks/useRecaptcha";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import {z} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {setSpinner} from "@/Redux/Reducers/SpinnerSlice/SpinnerSlice";
import {Box, Button, Stack, Typography} from "@mui/material";
import ValidatedInput from "@/Components/ValidatedComponents/ValidatedInput";
import SendIcon from "@mui/icons-material/Send";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import ReCAPTCHA from "react-google-recaptcha";
import ValidatedSelect from "@/Components/ValidatedComponents/ValidatedSelect";
import BlockService from "@/Services/BlockService/BlockService";
import BlockProps from "@/Interfaces/Site/BlockProps";

const ContactFormV2: React.FC<{industries: BlockProps []}> = ({industries}) => {
    const { t } = useTranslation();

    const emailService = Container.get(EmailService);
    const blockService = Container.get(BlockService);
    const dispatch = useAppDispatch();
    const [disable, setDisable] = React.useState<boolean>(false);
    const lang = usePage().props.lang;
    const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    const contactSchema = z.object({
        name: z.string({required_error: 'The name is required'}).min(3, {message: t('name-is-required')}),
        subject: z.string(),
        email: z.string().email({message: t('invalid-email')}),
        message: z.string()
            .min(10, {message: t('minimum-length', {length: 10}) })
            .max(500, {message: t('maximum-length', {length: 500}) }),
    });

    type contactSchemaType = z.infer<typeof contactSchema>

    const methods = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            subject: '',
            email: '',
            message: '',
            mobile: '',
            company: '',
            industry: industries[0].title,
        }
    });

    const onSubmit = () => {
        if (!capchaToken) return;
        const formData = new FormData();
        formData.append('name', methods.getValues('name'));
        formData.append('subject', methods.getValues('subject'));
        formData.append('email', methods.getValues('email'));
        formData.append('message', methods.getValues('message'));
        formData.append('mobile', methods.getValues('mobile'));
        formData.append('company', methods.getValues('company'));
        formData.append('industry', methods.getValues('industry'));
        // dispatch(setSpinner(true));
        setDisable(true)
        emailService.sendEmail(formData)
            .then(response => {
                setDisable(false);
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Your Message has been sent', severity: "success" })
                );
            })
            .catch(error => {
                dispatch(setSpinner(false));
                setDisable(false);
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error while sending your message', severity: "error" })
                );
            });
    }

    return (
        <Box className={'mx-[32px]'}>
            <FormProvider {...methods}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '100%'},
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="flex justify-between items-center gap-2">
                        <ValidatedInput
                            controlName="name"
                            name={`name`}
                            id="name"
                            label={t('name')}
                            placeholder={`John Doe`}
                            control={methods.control}
                        />

                        <ValidatedInput
                            controlName="email"
                            name={`email`}
                            id="email"
                            label={t('email')}
                            placeholder="john@email.com"
                            control={methods.control}
                        />
                    </div>

                    <div className="flex justify-between items-center gap-2">
                        <ValidatedInput
                            required={false}
                            controlName="mobile"
                            name={`mobile`}
                            id="mobile"
                            label={t('mobile')}
                            placeholder="+1 (555) 123-4567"
                            control={methods.control}
                        />

                        <ValidatedInput
                            required={false}
                            controlName="company"
                            name={`company`}
                            id="company"
                            label={t('company')}
                            placeholder=""
                            control={methods.control}
                        />
                    </div>

                    <ValidatedInput
                        required={false}
                        controlName="subject"
                        name={`subject`}
                        id="subject"
                        label={t('subject')}
                        placeholder={``}
                        control={methods.control}
                    />

                    {industries.length > 0 && <ValidatedSelect
                        control={methods.control}
                        controlName='industry'
                        id="industry"
                        label={t('industry')}
                        placeholder={t('industry')}
                        withNone={false}
                        items={
                            industries.map(
                                industry => ({
                                    id: industry.title,
                                    name: industry.title,
                                })
                            )
                        }
                    />}



                        <ValidatedInput
                            controlName="message"
                            name="message"
                            id="message"
                            label={t('message')}
                            placeholder={`Your Message`}
                            control={methods.control}
                            multiline={true}
                            rows={8}
                        />
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                            onChange={handleRecaptcha}
                        />
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={2}
                            className="m-[8px]"
                        >
                            <Button
                                type="submit"
                                size="small"
                                variant="contained"
                                color="secondary"
                                disabled={disable}
                                startIcon={<SendIcon/>}
                                // endIcon={<SendIcon />}
                            >

                                <Typography variant={'body2'}
                                            className="px-[5px]">{t('send')} {t('your-message')}</Typography>
                            </Button>
                            {/*<CustomButton disabled={disable} task="send" text={t('your-message')}></CustomButton>*/}
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
    );
};

export default ContactFormV2;
