import React from "react";
import {Container} from "typedi";
import CommonService from "@/Services/CommonService/CommonService";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import {Head} from "@inertiajs/react";
import MenuCategories from "@/Enums/MenuCategories";
import MainLinkAdd from "@/Pages/Admin/Website/Links/Main/MainLinkAdd";
import SocialLinkAdd from "@/Pages/Admin/Website/Links/Social/SocialLinkAdd";
import FooterAdd from "@/Pages/Admin/Website/Links/Footer/FooterAdd";
import {PageProps} from "@/types";
import {Menu} from "@/models/menu/Menu";
import ContactLinkAdd from "@/Pages/Admin/Website/Links/Contact/ContactLinkAdd";

const MenuAdd = ({category, menus}: PageProps<{category: string, menus: Menu []}>) => {
    const commonService = Container.get(CommonService);
    const categories = Object.values(MenuCategories);
    let AddComponent;

    switch (commonService.toTitleCase(category)) {
        case MenuCategories.MAIN_MENU: {
            AddComponent = () => <MainLinkAdd category={category} menus={menus}></MainLinkAdd>;
            break;
        }

        case MenuCategories.SOCIAL_MENU: {
            AddComponent = () => <SocialLinkAdd category={category} menus={menus}></SocialLinkAdd>;
            break;
        }

        case MenuCategories.FOOTER_MENU: {
            AddComponent = () => <FooterAdd category={category} menus={menus}></FooterAdd>;
            break;
        }

        case MenuCategories.CONTACT_MENU: {
            AddComponent = () => <ContactLinkAdd category={category} menus={menus}></ContactLinkAdd>
            break;
        }

        default: {
            AddComponent = () => <MainLinkAdd category={category} menus={menus}></MainLinkAdd>;
        }
    }

    const getTitle = () => {
        return commonService.toTitleCase(category);
    }
    return (
        <AdminLayout>
            <Head title={'Add ' + getTitle()}></Head>
            <AddComponent></AddComponent>
        </AdminLayout>
    );
}

export default MenuAdd;
