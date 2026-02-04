import {Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import {Button} from "@/Pages/Site/components/ui/button";
import tripCity from "@/images/trip-city.jpg";
import {useTranslation} from "react-i18next";
import {usePage} from "@inertiajs/react";
import {Container} from "typedi";
import "reflect-metadata";
import MenuService from "@/Services/MenuService/MenuService";

const CtaSection = () => {

    const {t} = useTranslation();
    const {contactLinks} = usePage().props.links
    const menuService = Container.get(MenuService);
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={tripCity}
                    alt="Dubai City"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-secondary/90"/>
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6">
                        {t('ready')}{" "}
                        <span className="text-gradient-gold">{t('journey')}?</span>
                    </h2>
                    <p className="text-secondary-foreground/80 text-lg mb-8">
                        {t('contact-hero')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="gold" size="xl">
                            <Phone className="w-5 h-5"/>
                            {t('call')}
                        </Button>
                        <Button variant="hero-outline" size="xl"
                                className="border-secondary-foreground/50 text-secondary-foreground hover:bg-secondary-foreground/10">
                            <Mail className="w-5 h-5"/>
                            {t('send')}
                        </Button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 mt-12">
                        <div className="flex items-center gap-2 text-secondary-foreground/80">
                            <Phone className="w-5 h-5 text-primary"/>
                            <span dir="ltr">{menuService.getSplitLink(contactLinks, t('mobile'))}</span>
                        </div>
                        <div className="flex items-center gap-2 text-secondary-foreground/80">
                            <Mail className="w-5 h-5 text-primary"/>
                            <span>{menuService.getSplitLink(contactLinks, t('email'))}</span>
                        </div>
                        <div className="flex items-center gap-2 text-secondary-foreground/80">
                            <MapPin className="w-5 h-5 text-primary"/>
                            <span>Dubai, UAE</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
