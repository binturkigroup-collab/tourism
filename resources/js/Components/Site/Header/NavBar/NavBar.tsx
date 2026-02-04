import React, {useState} from "react";
import HeaderProps from "@/Interfaces/Site/HeaderProps";
import NavbarMenu from "@/Components/Site/Header/NavbarMenu/NavbarMenu";
import { usePage } from '@inertiajs/react'
import {Button} from "@mui/material";
import styles from './styles.module.scss';
import {
    AppBar,
    IconButton,
    Typography,
    Toolbar,
    Box,
    Container,
    Stack,
    ListItemButton,
    ListItemText
} from "@mui/material";
import SocialIcon from "@/Components/Site/SocialIcon/SocialIcon";
import LanguageMenu from "@/Components/Site/LanguageMenu/LanguageMenu";
import LogoImg from "@/StyledComponents/LogoImg";
import {Link} from "@inertiajs/react";
import Icon from "@/Components/Icon/Icon";
import {useAppSelector} from "@/Redux/Store/hook";
import SiteSearch from "@/Components/Search/SiteSearch";
import LogoSection from "@/Components/Site/LogoSection/LogoSection";
import AnchorTag from "@/Components/AnchorTag/AnchorTag";

//THIS COMPONENT FOR COMPUTER DEVICES ONLY.
const NavBar: React.FC = () => {
    const dark = useAppSelector(state => state.siteTheme.dark);
    const lang = usePage().props.lang;
    const {mainLinks, contactLinks, socialLinks} = usePage().props.links;
    const languages = usePage().props.settings.activeLanguages
    return (
        <AppBar component="nav" className={`${styles.navbarBgColor}`} sx={{padding: 0,}}>
            <Toolbar className={`${styles.padding0}`}>
                <LogoSection />

                <Container maxWidth="xl" component="nav" className={`${styles.padding0} flex items-center`} sx={{height: 80}}>
                    <Box component="div" className={"w-full"} sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >

                            {mainLinks.map((link, i) => (

                                <Box key={i}>
                                    {link.children.length <= 0 ?

                                        <AnchorTag link={link.url} linkType={link.type}>
                                            <ListItemButton className={ lang === 'ar' ? styles.arLinkStyle : styles.enLinkStyle}>
                                                <ListItemText sx={{fontWeight: 600}}>
                                                    <Typography sx={{
                                                        fontWeight: 400,
                                                        textTransform: 'uppercase',
                                                        fontSize: '16px'
                                                    }}>
                                                        {link.name}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItemButton>
                                        </AnchorTag>
                                        :
                                        <NavbarMenu menuLink={link}/>
                                    }
                                </Box>

                            ))}
                        </Stack>
                        <LanguageMenu languages={languages}></LanguageMenu>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
