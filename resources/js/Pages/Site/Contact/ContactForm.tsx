import React from 'react';
import { Button } from "@/Pages/Site/components/ui/button";
import { Input } from "@/Pages/Site/components/ui/input";
import { Textarea } from "@/Pages/Site/components/ui/textarea";
import { useToast } from "@/Pages/Site/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Pages/Site/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Pages/Site/components/ui/select";

import useRecaptcha from "@/Hooks/useRecaptcha";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import ReCAPTCHA from "react-google-recaptcha";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import {Container} from "typedi";
import "reflect-metadata";
import EmailService from "@/Services/NotificationService/EmailService/EmailService";
import {useTranslation} from "react-i18next";
import {isValidPhoneNumber} from "react-phone-number-input";
import CustomerType from "@/Interfaces/CustomerType";

const userTypes = [
    { value: "investor", label: "Investor" },
    { value: "end-user", label: "End User" },
    { value: "broker", label: "Broker" },
    { value: "other", label: "Other" },
];
const ContactForm = () => {
    const {t} = useTranslation();
    const customerType = Object.entries(CustomerType).map(([key, _]) => ({
        value: key,
        label: t(key.toLowerCase()),
    }))
    const formSchema = z.object({
        name: z.string().min(2, t('name-err')).max(100, t('too-long-name')),
        phone: z
            .string()
            .min(8, t('phone-err'))
            .refine(val => isValidPhoneNumber(val), {
                message: t('phone-invalid')
            })
        ,
        email: z.string().email(t('invalid-email')).optional().or(z.literal("")),
        note: z.string().max(500, t('too-long-note')).optional(),
        userType: z.string().min(1, "Please select an option"),
    });
    const emailService = Container.get(EmailService);
    const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();
    const [disabled, setDisabled] = React.useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            note: "",
            userType: "",
        },
    });

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (!capchaToken) return;
        const formData = new FormData();
        formData.append('name', form.getValues('name'));
        formData.append('phone', form.getValues('phone'));
        formData.append('email', form.getValues('email') || "");
        formData.append('message', form.getValues('note') || "");
        formData.append('type', form.getValues('userType'));
        setDisabled(true);
        emailService.sendEmail(formData)
            .then(() => {
                // =====================================
                //Send Data to Google Analytics:
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: "contact_form_submitted",
                    form_type: "lead",   // or "property", "contact"
                    page: "Contact Page",
                    // form_id: leadType.id,   // optional
                    // form_name: leadType.propertyName // optional
                });
                // =====================================
                setDisabled(false);
                setSnackbar(snackbarState =>
                        ({ ...snackbarState, open: true, message: "Your message has been submitted. We'll contact you soon.", severity: "success" })
                );
            })
            .catch(error => {
                setDisabled(false);
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: "Error message when sending your inquiry.", severity: "success" })
                );
            })

        form.reset();
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('name')} *</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('full-name')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('phone')} *</FormLabel>
                                <FormControl>
                                    <Input placeholder="+971 XX XXX XXXX" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('email')}</FormLabel>
                                <FormControl>
                                    <Input placeholder="your@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="userType"
                        render={({ field }) => (
                            <FormItem id="userType">
                                <FormLabel>Describe Yourself *</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an option" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="z-20 bg-white">
                                        {/*{userTypes.map((type) => (*/}
                                        {/*    <SelectItem key={type.value} value={type.value}>*/}
                                        {/*        {t(type.value)}*/}
                                        {/*    </SelectItem>*/}
                                        {/*))}*/}
                                        {
                                            customerType.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('note')}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={t('any-specific')}
                                        rows={6}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={handleRecaptcha}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={disabled}
                    >
                        {t('send')}
                    </Button>
                </form>
            </Form>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </div>
    );
};

export default ContactForm;
