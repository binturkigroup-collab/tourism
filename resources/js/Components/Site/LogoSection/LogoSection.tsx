import React from 'react';
import LogoImg from "@/StyledComponents/LogoImg";
import {Link} from "@inertiajs/react";
import logo from "@/images/logo-1.png";
import styles from "./styles.module.scss";
import FileService from "@/Services/FileService/FileService";

const LogoSection = () => {
    return (
        <Link href={route('home')}>
            <img className={styles.logoImg} src={FileService.LOGO} alt="LOGO"/>
            {/*<LogoImg src={logo}/>*/}
        </Link>
    );
};

export default LogoSection;
