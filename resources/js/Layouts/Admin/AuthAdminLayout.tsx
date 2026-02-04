import React, {PropsWithChildren, ReactNode, useState} from "react";
import {User} from "@/types";
import {usePage} from "@inertiajs/react";
import {Box} from "@mui/material";
import styles from "@/Layouts/Admin/styles.module.scss";
import Sidebar from "@/Layouts/Admin/Partials/Sidebar";
import Header from "@/Layouts/Admin/Partials/Header";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {setLanguages} from "@/Redux/Reducers/LanguageSlice/LanguageSlice";
import Language from "@/models/language/Language";
import SettingsProps from "@/Interfaces/SettingProps";


const AuthAdminLayout = ({children }: PropsWithChildren<{header?: ReactNode }>) => {
    const [expand, setExpand] = useState<boolean>(false);
    const dark = useAppSelector(state => state.theme.dark);
    return (
        <Box className={`flex justify-start items-start ${dark ? 'dark' : 'light'}`}>

            <Box component="div" className={
                `fixed h-screen p-[16px] overflow-y-auto
                ${expand ? styles.showSidebar : styles.hideSidebar}
                `
            }>

            </Box>
            <Box component="div"
                 className={` grow ${expand ? 'ms-[256px]' : 'ms-0'} ${expand ? styles.addMargin : styles.removeMargin}`}>
                <Box component="div" className={`content p-[16px] bg-scroll`}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default AuthAdminLayout;
