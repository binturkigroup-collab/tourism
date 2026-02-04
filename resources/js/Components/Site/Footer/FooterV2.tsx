import React from 'react';
import HeaderProps from "@/Interfaces/Site/HeaderProps";
import {useTranslation} from "react-i18next";
import {Link, usePage} from "@inertiajs/react";
import CommonService from "@/Services/CommonService/CommonService";
import {Container} from "typedi";
import "reflect-metadata";
import LogoSection from "@/Components/Site/Footer/FooterLogo";
import {Box, Stack} from "@mui/material";
import styles from "@/Components/Site/Footer/styles.module.scss";
import FileService from "@/Services/FileService/FileService";
import MenuService from "@/Services/MenuService/MenuService";
import SocialIcon from "@/Components/Site/SocialIcon/SocialIcon";
import BlockCategories from "@/Enums/BlockCategories";

const FooterV2:React.FC = () => {
    const getLink = (name: string) => {
        return name.toLowerCase() === 'home' ? `/${lang}/${name}` : `/${lang}/block/${name}`
    }
    const { t } = useTranslation();
    const lang = usePage().props.lang;
    const {mainLinks, contactLinks, socialLinks, footerLinks} = usePage().props.links;
    const languages = usePage().props.settings.activeLanguages
    const commonService = Container.get(CommonService);
    const menuService = Container.get(MenuService);
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className={'px-[16px] pb-[8px]'}>
                            <Link href={route('home')}>
                                <img className={styles.logoImg} src={FileService.LOGO} alt="LOGO"/>
                                {/*<LogoImg src={logo}/>*/}
                            </Link>
                        </div>

                        {/*<h3 className="text-2xl font-bold mb-4">{t('dsh')}</h3>*/}
                        <p className="text-primary-foreground/80 mb-4">
                            {t('building-excellence')}
                        </p>
                    </div>

                    {/* Main Menu */}
                    <div>
                        <h4 className="text-lg text-secondary font-semibold mb-4">{t('main-menu')}</h4>
                        <ul className="space-y-2">
                            {mainLinks.filter(link => link.slug !== commonService.toSnakeCase(BlockCategories.ABOUT)).map((link, key) => (
                                link.children.length > 0 ?
                                    (
                                        link.children.map((child, key) => (
                                            <li key={key}>
                                                <Link href={`/${lang}${child.url}`}
                                                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                                                    {child.name}
                                                </Link>
                                            </li>
                                        ))
                                    ) :
                                    <li key={key}>
                                        <Link href={`/${lang}${link.url}`}
                                              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                                            {link.name}
                                        </Link>
                                </li>
                            ))}

                        </ul>
                    </div>

                    {/* Additional Links */}
                    <div>
                        <h4 className="text-lg text-secondary font-semibold mb-4">{t('company-info')}</h4>
                        <ul className="space-y-2">
                            {footerLinks && footerLinks.map((link, key) => (
                                <li key={key}>
                                    <Link href={`/${lang}${link.url}`}
                                          className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col justify-start">
                        <h4 className="text-lg text-secondary font-semibold mb-4">{t('contact-info')}</h4>
                        <div className="space-y-2 text-primary-foreground/80">
                            <p><strong>{t('email')}:</strong> {menuService.getSplitLink(contactLinks, 'mail')}</p>
                            <p><strong>{t('phone')}:</strong> <span dir="ltr">{menuService.getSplitLink(contactLinks, 'phone')}</span></p>
                            {/*<p>Address: Office # 313 Makatib Building</p>*/}
                            {/*<p>Opp. Toyota AlMakhtoom road</p>*/}
                            {/*<p>Port Saeed, Dubai, UAE</p>*/}

                            {/*<p><strong>{t('address')}:</strong> </p>*/}
                            {/*{menuService.getAddress().map((address, key) => (*/}
                            {/*    <p key={key}>{address}</p>*/}
                            {/*))}*/}
                        </div>
                        <Stack
                            direction="row"
                            justifyContent={{xs: 'center', md: 'flex-start'}}
                            alignItems="center"
                            spacing={2}
                            useFlexGap
                            flexWrap="wrap"
                            className="mt-auto"
                        >
                            {socialLinks.map((link, index) =>(
                                <a className="hover:text-secondary/80 text-secondary px-3 py-4
                                            lg:py-2 flex items-center text-xs uppercase font-bold"
                                   key={index}
                                   href={link.url}
                                   target={link.target}>
                                    <SocialIcon name={link.image}></SocialIcon>
                                </a>
                            ))}
                        </Stack>
                    </div>
                </div>

                <div
                    className="border-t border-primary-foreground/20 mt-8 pt-8 text-center"
                    dir={lang === 'en' ? 'ltr' : 'rtl'}
                >
                    <p className="text-primary-foreground/80">
                        <span className="text-secondary">©</span> {new Date().getFullYear()} | {t('all-rights-reserved')}.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterV2;
