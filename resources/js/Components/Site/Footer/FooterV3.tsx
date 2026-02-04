import React from 'react';
import FileService from "@/Services/FileService/FileService";
import {Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube} from 'lucide-react';
import {Link, usePage} from "@inertiajs/react";
import { useTranslation } from 'react-i18next';
import {Container} from "typedi";
import "reflect-metadata";
import MenuService from "@/Services/MenuService/MenuService";

const FooterV3 = () => {
    const menuService = Container.get(MenuService);
    const {mainLinks, contactLinks, socialLinks} = usePage().props.links;
    const {packages} = usePage().props;
    const {lang} = usePage().props;
    const {t} = useTranslation();
    const year = new Date().getFullYear();
    const facebookLink = socialLinks.find(link => link.name === "facebook")?.url || "";
    const twitterLink = socialLinks.find(link => link.name === "twitter")?.url || "";
    const instagramLink = socialLinks.find(link => link.name === "instagram")?.url || "";
    const youtubeLink = socialLinks.find(link => link.name === "youtube")?.url || "";
    return (
        <footer className="bg-secondary text-secondary-foreground">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <img src={FileService.LOGO} alt="Bin Turki" className="h-14 w-auto" />
                            <div className="flex flex-col">
                <span className="font-heading font-bold text-lg text-secondary-foreground leading-tight">
                  Bin Turki
                </span>
                                <span className="text-xs text-secondary-foreground/70 tracking-wider uppercase">
                  Tourism Group
                </span>
                            </div>
                        </div>
                        <p className="text-secondary-foreground/80 text-sm leading-relaxed">
                            {t('footer-hero')}
                        </p>
                        <div className="flex gap-4">
                            <a href={instagramLink} target="_blank"
                               className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                <Instagram className="w-5 h-5"/>
                            </a>
                            <a href={facebookLink} target="_blank"
                               className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                <Facebook className="w-5 h-5"/>
                            </a>
                            <a href={twitterLink} target="_blank"
                               className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                <Twitter className="w-5 h-5"/>
                            </a>
                            <a href={youtubeLink} target="_blank"
                               className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                <Youtube className="w-5 h-5"/>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-heading font-semibold text-lg">{t('quick-links')}</h4>
                        <ul className="space-y-3">
                            {mainLinks.map((link, index) => (
                                <li key={`${crypto.randomUUID()}-${index}`}>
                                    <Link href={`/${lang}${link.url}`} className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Packages */}
                    <div className="space-y-4">
                        <h4 className="font-heading font-semibold text-lg">{t('our-pac')}</h4>
                        <ul className="space-y-3">
                            {packages.map((pkg) => (
                                <li key={pkg.title}>
                                    <Link href={`/${lang}/package/${pkg.slug}`} className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                                        {pkg.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="font-heading font-semibold text-lg">{t('contact-us')}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-secondary-foreground/80 text-sm">
                                  Downtown Dubai, UAE<br />Sheikh Zayed Road
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-secondary-foreground/80 text-sm" dir="ltr">{menuService.getSplitLink(contactLinks, t('mob'))}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-secondary-foreground/80 text-sm">{menuService.getSplitLink(contactLinks, t('em'))}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-center">
                    <p className="text-secondary-foreground/60 text-sm">
                        {t('bin-turki')} © {year}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterV3;
