import React from 'react';
import { Button } from "@/Pages/Site/components/ui/button"
import { Card } from "@/Pages/Site/components/ui/card";
import { Input } from "@/Pages/Site/components/ui/input";
import { Textarea } from "@/Pages/Site/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Pages/Site/components/ui/form";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useRecaptcha from "@/Hooks/useRecaptcha";
import ReCAPTCHA from "react-google-recaptcha";
import {Container} from "typedi";
import EmailService from "@/Services/NotificationService/EmailService/EmailService";
import "reflect-metadata";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import {usePage} from "@inertiajs/react";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});
const ContactForm1 = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        context: undefined,
        criteriaMode: undefined,
        delayError: 0,
        disabled: false,
        errors: undefined,
        formControl: undefined,
        mode: "onBlur",
        progressive: false,
        reValidateMode: "onBlur",
        resetOptions: undefined,
        shouldFocusError: false,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        values: undefined,
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        }
    });

    const emailService = Container.get(EmailService);

    const [disable, setDisable] = React.useState<boolean>(false);
    const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();
    const token = usePage().props.csrf_token;

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (!capchaToken) return;
        const formData = new FormData();

        formData.append('name', form.getValues('name'));
        formData.append('subject', form.getValues('subject'));
        formData.append('email', form.getValues('email'));
        formData.append('message', form.getValues('message'));
        formData.append('_token', token);

        setDisable(true)
        emailService.sendEmail(formData)
            .then(response => {
                setDisable(false);
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Your Message has been sent', severity: "success" })
                );
                form.reset();
            })
            .catch(error => {
                setDisable(false);
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error while sending your message', severity: "error" })
                );
            });
    };
    return (
        <Card className="p-8 bg-card border-border shadow-card">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Project Inquiry</h3>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your full name" {...field} />
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="your.email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input placeholder="Project subject" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell me about your project requirements..."
                                        className="min-h-[120px]"
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
                        disabled={disable}
                        type="submit"
                        className="w-full flex items-center space-x-2"
                    >
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                    </Button>
                </form>
            </Form>
        </Card>
    );
};

export default ContactForm1;
