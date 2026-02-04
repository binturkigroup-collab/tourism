import React from 'react';
import {Menu} from "@/models/menu/Menu";
import {PageProps} from "@/types";
import {Container} from "typedi";
import CommonService from "@/Services/CommonService/CommonService";
import MenuCategories from "@/Enums/MenuCategories";
import MainLinkAdd from "@/Pages/Admin/Website/Links/Main/MainLinkAdd";
import SocialLinkAdd from "@/Pages/Admin/Website/Links/Social/SocialLinkAdd";
import FooterAdd from "@/Pages/Admin/Website/Links/Footer/FooterAdd";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import {Head} from "@inertiajs/react";
import MainLinkUpdate from "@/Pages/Admin/Website/Links/Main/MainLinkUpdate";
import FooterUpdate from "@/Pages/Admin/Website/Links/Footer/FooterUpdate";
import SocialLinkUpdate from "@/Pages/Admin/Website/Links/Social/SocialLinkUpdate";
import ContactLinkUpdate from "@/Pages/Admin/Website/Links/Contact/ContactLinkUpdate";

const MenuUpdate = ({category, menu, menus}: PageProps<{category: string, menu: Menu, menus: Menu[]}>) => {
    const commonService = Container.get(CommonService);
    let UpdateComponent;

    switch (commonService.toTitleCase(category)) {
        case MenuCategories.MAIN_MENU: {
            UpdateComponent = () => <MainLinkUpdate category={category} menu={menu} menus={menus}></MainLinkUpdate>;
            break;
        }

        case MenuCategories.SOCIAL_MENU: {
            UpdateComponent = () => <SocialLinkUpdate category={category} menu={menu} menus={menus}></SocialLinkUpdate>;
            break;
        }

        case MenuCategories.FOOTER_MENU: {
            UpdateComponent = () => <FooterUpdate category={category} menu={menu} menus={menus}></FooterUpdate>;
            break;
        }

        case MenuCategories.CONTACT_MENU: {
            UpdateComponent = () => <ContactLinkUpdate category={category} menus={menus} menu={menu}></ContactLinkUpdate>
            break;
        }

        default: {
            UpdateComponent = () => <MainLinkUpdate category={category} menu={menu} menus={menus}></MainLinkUpdate>;
        }
    }

    const getTitle = () => {
        return commonService.toTitleCase(category);
    }
    return (
        <AdminLayout>
            <Head title={'Add ' + getTitle()}></Head>
            <UpdateComponent></UpdateComponent>
        </AdminLayout>
    );
};

export default MenuUpdate;
