import React from 'react';
import {Menu} from "@/models/menu/Menu";
import MainMenuAdd from "../Main/MainLinkAdd";

const FooterAdd: React.FC<{category: string, menus: Menu []}> = ({category, menus}) => {
    return (
        <MainMenuAdd category={category} menus={menus}></MainMenuAdd>
    );
};

export default FooterAdd;
