import React from 'react';
import styles from "./styles.module.scss";
import logo from "@/images/logo-1.png";
import {Link} from "@inertiajs/react";
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import FileService from "@/Services/FileService/FileService";


const FooterLogo = () => {
    const {t} = useTranslation();
    return (
        <Box className="p-[16px] flex flex-col items-end" sx={{width: 'fit-content'}}>
            <Link href={route('home')}>
                <img className={styles.logoImg} src={FileService.LOGO} alt="LOGO"/>
                {/*<LogoImg src={logo}/>*/}
            </Link>
            <Typography variant="body2">&copy; {t('all-rights-reserved')}, {(new Date()).getFullYear()}</Typography>
        </Box>
    );
};

export default FooterLogo;
