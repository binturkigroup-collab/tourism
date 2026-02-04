import Header from "@/Components/Site/Header/Header";
import MenuLink from "@/models/Link/MenuLink";
import Language from "@/models/language/Language";
import React, {ReactNode} from "react";
import SiteAppRoot from "@/SiteAppRoot";
import {useAppSelector} from "@/Redux/Store/hook";
import {Box, IconButton} from "@mui/material";
import {Head, router, usePage} from "@inertiajs/react";
import {useTranslation} from "react-i18next";
import styles from "./styles.module.scss";
import FooterV2 from "@/Components/Site/Footer/FooterV2";
import WhatsAppButton from "@/Layouts/Site/WhatsAppButton";
import FooterV3 from "@/Components/Site/Footer/FooterV3";

interface HeaderLayoutProps {
    children: ReactNode,
    // mainLinks: MenuLink[],
    socialLinks: MenuLink[],
    contactLinks: MenuLink[],
    footerLinks: MenuLink[],
    logo: {logo: string},
    languages: Language[],
}
const HeaderLayout =(
    {
        children,
    }) =>
{
    const dark = useAppSelector(state => state.siteTheme.dark);
    const lang = usePage().props.lang;
    const spinner = useAppSelector(state => state.spinner.spinner);
    const { t, i18n: {changeLanguage, language} } = useTranslation();
    React.useEffect(() => {
        changeLanguage(lang);
    }, [lang]);

    // Google Analytics:
    React.useEffect(() => {
        // Ensure GA is loaded
        if (typeof window.gtag === "function") {
            window.gtag("js", new Date());
            window.gtag("config", import.meta.env.VITE_G);
        }
    }, []);


    React.useEffect(() => {
        const unlisten = router.on("navigate", (event) => {
            if (typeof window.gtag === "function") {
                window.gtag("event", "page_view", {
                    page_title: document.title,
                    page_path: event.detail.page.url,
                });
            }
        });

        return () => unlisten();
    }, []);


    return(
        <SiteAppRoot lang={lang}>
            <Head>
                {/* Google Analytics */}
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_G}`}></script>

                <script
                    id="ga-init"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            window.gtag = gtag;
                        `,
                    }}
                />
            </Head>
            <Box className={`${dark ? 'site-dark' : 'site-light'}`}>
                <Header />
                <div className={`${styles.minHeight} ${styles.marginTop}`}>{children}</div>
                {/*<div className={styles.whatsIcon}>*/}
                {/*    <div className="flex justify-center align-middle gap-2">*/}
                {/*        <a href="https://wa.me/971558399642?text=I'm%20interested%20" target="_blank">*/}
                {/*            <IconButton color="success" size="large" sx={{bgcolor: '#fff'}}>*/}
                {/*                <WhatsAppIcon sx={{fontSize: '32px'}}></WhatsAppIcon>*/}
                {/*            </IconButton>*/}
                {/*        </a>*/}

                {/*        <a href="https://wa.me/971543414809?text=I'm%20interested%20" target="_blank">*/}
                {/*            <IconButton color="success" size="large" sx={{bgcolor: '#fff'}}>*/}
                {/*                <WhatsAppIcon sx={{fontSize: '32px'}}></WhatsAppIcon>*/}
                {/*            </IconButton>*/}
                {/*        </a>*/}
                {/*    </div>*/}
                {/*</div>*/}




                {/*Footer Goes here*/}
                <FooterV3 />

                {/*    Spinner Goes here*/}
                {/*{spinner && <ClockSpinner></ClockSpinner>}*/}
            </Box>
            <WhatsAppButton />
        </SiteAppRoot>
    );
}

export default HeaderLayout;
