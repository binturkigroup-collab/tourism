import React from 'react';
import { Mail, Phone, MapPin } from "lucide-react";
import {useTranslation} from "react-i18next";
import {Container} from "typedi";
import MenuService from "@/Services/MenuService/MenuService";
import {usePage} from "@inertiajs/react";

const ContactInfo = () => {
    const menuService = Container.get(MenuService);
    const {contactLinks} = usePage().props.links;
    const {t} = useTranslation();
    return (
        <div className="space-y-8">
            <div className="bg-background border border-border rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-6">{t('contact-info')}</h2>

                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-secondary/10 p-3 rounded-lg">
                            <Mail className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                            <p className="font-medium text-foreground">{t('email')}</p>
                            <p className="text-muted-foreground">{menuService.getSplitLink(contactLinks, 'mail')}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-secondary/10 p-3 rounded-lg">
                            <Phone className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                            <p className="font-medium text-foreground">{t('phone')}</p>
                            <p className="text-muted-foreground">{menuService.getSplitLink(contactLinks, 'phone')}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-secondary/10 p-3 rounded-lg">
                            <MapPin className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                            <p className="font-medium text-foreground">{t('address')}</p>
                            <p className="text-muted-foreground">
                                Dubai Marina, Dubai<br />
                                United Arab Emirates
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('office-hour')}</h3>
                <div className="space-y-2 text-muted-foreground">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
