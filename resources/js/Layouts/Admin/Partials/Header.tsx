import React, {useEffect, useState} from "react";
import Account from "@/Components/Account/Account";
import styles from "./styles.module.scss";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {setMode} from "@/Redux/Reducers/ThemeSlice/ThemeSlice";
import {
    Stack,
    IconButton,
    Box,
} from "@mui/material";
import Icon from "@/Components/Icon/Icon";
const Header: React.FC<{handleExpand: () => void}> = ({handleExpand}) => {
    const dispatch = useAppDispatch();
    const dark = useAppSelector(state => state.theme.dark);

    const handleTheme = () => {
        dark ? dispatch(setMode(false)) : dispatch(setMode(true));
    }

    const handleIconClass = () => (
        dark ? styles.iconDark : styles.iconLight
    )

    return (
        <Stack
            direction="row"
            className="h-100 items-center p-[10px]"
        >
            <Box className="grow justify-self-start">
                <IconButton onClick={() => handleExpand()} >
                    <MenuIcon className={handleIconClass()}/>
                </IconButton>
            </Box>
            <Box className="flex flex-nowrap ">
                {
                    dark ?
                        <IconButton onClick={handleTheme} >
                            <Icon name="light-mode"></Icon>
                        </IconButton>
                        :
                        <IconButton onClick={handleTheme} >
                            <Icon name="dark-mode"></Icon>
                        </IconButton>
                }

                <IconButton>
                    <Icon name="notification-mui"></Icon>
                </IconButton>
                <IconButton>
                    <Icon name="mail-mui"></Icon>
                </IconButton>
                <IconButton>
                    <Icon name="language"></Icon>
                </IconButton>
                <Box className="ms-[40px]">
                    <Account />
                </Box>

            </Box>
        </Stack>
    );
}

export default Header;
