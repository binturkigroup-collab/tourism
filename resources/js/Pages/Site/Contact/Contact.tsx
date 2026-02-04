import React from 'react';
import {Head} from "@inertiajs/react";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import ContactForm from "@/Pages/Site/Contact/ContactForm";
import ContactInfo from "@/Pages/Site/Contact/ContactInfo";
import ContactMap from "@/Pages/Site/Contact/ContactMap";
import {useTranslation} from "react-i18next";
import SEO from "@/Pages/Site/components/SEO";

const Contact = () => {
    const {t} = useTranslation();
    return (
        <HeaderLayout>
            <Head title={'Contact Us'}>
                {/*<SEO*/}
                {/*    title="Contact Us"*/}
                {/*    description="Get in touch with Prestige Palace Properties. Contact our expert real estate team for property inquiries, viewings, and investment opportunities in Dubai and UAE."*/}
                {/*    canonical="https://prestigepropertydxb.com/en/contact-us"*/}
                {/*/>*/}
            </Head>

            <div className="min-h-screen bg-background py-16 px-4">
                <div className="container max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('get-in-touch')}</h1>
                        <p className="text-muted-foreground text-lg">
                            {t('contact-hero')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 mb-12">
                        <ContactForm />

                        <ContactInfo />
                    </div>

                    <ContactMap />
                </div>
            </div>

        </HeaderLayout>
    );
};

export default Contact;
