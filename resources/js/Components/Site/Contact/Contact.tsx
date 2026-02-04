import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";
import {useTranslation} from "react-i18next";
import SectionTitle from "@/Components/Site/Title/SectionTitle";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import {z} from "zod";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Container} from "typedi";
import "reflect-metadata";
import EmailService from "@/Services/NotificationService/EmailService/EmailService";
import {Box, Button, Stack, Typography} from "@mui/material";
import ValidatedInput from "@/Components/ValidatedComponents/ValidatedInput";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import CustomButton from "@/Components/Button/CustomButton";
import {useAppDispatch} from "@/Redux/Store/hook";
import {setSpinner} from "@/Redux/Reducers/SpinnerSlice/SpinnerSlice";
import {Link, usePage} from "@inertiajs/react";
import SendIcon from "@mui/icons-material/Send";
import useRecaptcha from "@/Hooks/useRecaptcha";
import ReCAPTCHA from 'react-google-recaptcha';

const Contact = () => {
    const { t } = useTranslation();

    const emailService = Container.get(EmailService);
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
        }
    });

    const onSubmit = () => {
        if (!capchaToken) return;
        const formData = new FormData();
        formData.append('name', methods.getValues('name'));
        formData.append('subject', methods.getValues('subject'));
        formData.append('email', methods.getValues('email'));
        formData.append('message', methods.getValues('message'));
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
        <Box className="p-[16px]">
            <Link href={`/${lang}/block/contact-us`}>
                <SectionTitle title={t('contact-us')}></SectionTitle>
            </Link>
            <Box sx={{maxWidth: '700px', margin: 'auto'}}>
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
                        <ValidatedInput
                            controlName="name"
                            name={`name`}
                            id="name"
                            label={t('name')}
                            placeholder={`John Doe`}
                            control={methods.control}
                        />

                        <ValidatedInput
                            controlName="subject"
                            name={`subject`}
                            id="subject"
                            label={t('subject')}
                            placeholder={``}
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
                                startIcon={<SendIcon />}
                                // endIcon={<SendIcon />}
                            >

                                <Typography variant={'body2'} className="px-[5px]">{t('send')} {t('your-message')}</Typography>
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


            <div className="my-[32px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3606.8001551806415!2d55.369926275385495!3d25.310917577637888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDE4JzM5LjMiTiA1NcKwMjInMjEuMCJF!5e0!3m2!1sen!2sae!4v1721477313942!5m2!1sen!2sae"
                    width="100%"
                    height="450"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </Box>

    );
};

export default Contact;
