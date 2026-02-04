import React from 'react';
import {useToast} from "@/Pages/Site/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/Pages/Site/components/ui/card";
import { Button } from "@/Pages/Site/components/ui/button";
import { Input } from "@/Pages/Site/components/ui/input";
import { Textarea } from "@/Pages/Site/components/ui/textarea";
import "reflect-metadata";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Pages/Site/components/ui/form";
import {isValidPhoneNumber} from "react-phone-number-input";
import useRecaptcha from "@/Hooks/useRecaptcha";
import ReCAPTCHA from "react-google-recaptcha";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import LeadService from "@/Services/LeadService/LeadService";
import {Container} from "typedi";
import "reflect-metadata";
import {useTranslation} from "react-i18next";

export type LeadType = {
    type: "project" | "property" | "developer",
    id: number,
    propertyName: string;
    isBrochureDownloaded?: boolean;
}


const LeadSection: React.FC<{leadType: LeadType, callback? : () => void}> = ({leadType, callback}) => {
    const {t} = useTranslation();

    const formSchema = z.object({
        name: z
            .string()
            .min(2, t('name-err'))
            .max(100, t('too-long-name')),
        phone: z.string()
            .min(8, t('phone-err'))
            .refine(
                val => isValidPhoneNumber(val),
                {message: t('phone-invalid')}
            ),
        email: z
            .string()
            .email(t('invalid-email'))
            .optional()
            .or(z.literal("")),
        note: z
            .string()
            .max(500, t("too-long-note"))
            .optional(),
    });
    const leadService = Container.get(LeadService);
    const [disabled, setDisabled] = React.useState(false);

    const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            note: "",
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
        const customerName = form.getValues('name');
        const phoneNumber = form.getValues('phone');
        formData.append('referenceId', leadType.id.toString());
        formData.append('type', leadType.type);
        formData.append('name', customerName);
        formData.append('phone', phoneNumber);
        formData.append('email', form.getValues('email') || "");
        formData.append('note', form.getValues('note') || "");
        formData.append('downloadPDF', String(leadType.isBrochureDownloaded || false));
        formData.append('action', `${customerName} with number ${phoneNumber} asks for ${leadType.type} ${leadType.propertyName}
        ${leadType.isBrochureDownloaded ? ". Brochure Downloaded" : ""}
        `)
        setDisabled(true);

        //Send Callback to the parent component:
        if (callback) {
            callback();
        }

        leadService.store(formData)
            .then(() => {
                // =====================================
                //Send Data to Google Analytics:
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: "lead_form_submitted",
                    form_type: "lead",   // or "property", "contact"
                    page: leadType.type,
                    form_id: leadType.id,   // optional
                    form_name: leadType.propertyName // optional
                });
                // =====================================

                setDisabled(false);
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: "Your inquiry has been submitted. We'll contact you soon.", severity: "success" })
                );
            })
            .catch((error) => {
                setDisabled(false);
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: "Error happened when sending your inquiry.", severity: "success" })
                );
            })
        form.reset();
    };

    return (
        <div className="lg:col-span-1">
            <Card className="sticky top-4 bg-backgrund">
                <CardHeader>
                    <CardTitle className="text-primary">{t('req-info')}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        {t('fill-details')}
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={'text-primary'}>{t('name')} *</FormLabel>
                                        <FormControl>
                                            <Input className={'text-primary'} placeholder={t('full-name')} {...field} />
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
                                        <FormLabel className={'text-primary'}>{t('phone')} *</FormLabel>
                                        <FormControl>
                                            <Input className={'text-primary'} placeholder="+971 XX XXX XXXX" {...field} />
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
                                        <FormLabel className={'text-primary'}>{t('email')}</FormLabel>
                                        <FormControl>
                                            <Input className={'text-primary'} placeholder="your.email@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {!callback && <FormField
                                control={form.control}
                                name="note"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={'text-primary'}>{t('note')}</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className={'text-primary'}
                                                placeholder={t('any-specific')}
                                                rows={4}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />}

                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                onChange={handleRecaptcha}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={disabled}
                            >
                                {t('sub-inq')}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CustomSnackbar
                    open={snackbar.open}
                    message={snackbar.message}
                    onClose={handleClose}
                    severity={snackbar.severity}
                />
            </Card>
        </div>
    );
};

export default LeadSection;
