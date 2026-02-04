import React from 'react';
import {Menu} from "@/models/menu/Menu";
import MainLinkUpdate from "@/Pages/Admin/Website/Links/Main/MainLinkUpdate";

const FooterUpdate: React.FC<{category: string, menus: Menu [], menu: Menu}> = (
    {category, menus, menu}
) => {
    return (
        <MainLinkUpdate category={category} menus={menus} menu={menu}></MainLinkUpdate>
    );
};

export default FooterUpdate;
