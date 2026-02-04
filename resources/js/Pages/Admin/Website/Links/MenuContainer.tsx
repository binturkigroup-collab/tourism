import React from 'react';
import {PageProps} from "@/types";
import {Head, Link} from "@inertiajs/react";
import {Box, Stack} from "@mui/material";
import CustomButton from "@/Components/Button/CustomButton";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import CommonService from "@/Services/CommonService/CommonService";
import {Container} from "typedi";
import "reflect-metadata";
import {Menu} from "@/models/menu/Menu";
import MenuList from "./Partials/MenuList";
import LinksContainer from "@/Components/Lists/LinkList/LinksContainer";

const MenuContainer = ({category, menus}: PageProps<{category: string, menus: Menu []}>) => {
    const commonService = Container.get(CommonService);
    const getTitle = () => {
        return commonService.toTitleCase(category);
    }

    return (
        <AdminLayout>
            <Head title={getTitle()}></Head>
            <Box className="py-[16px]">
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Link href={`/admin/menu/create/${category}`}>
                        <CustomButton task='add' text={getTitle()}></CustomButton>
                    </Link>

                    {/*<Link href={`/admin/website/menu/reorder/${category}`}>*/}
                    {/*    <CustomButton task='reorder' text={getTitle()}></CustomButton>*/}
                    {/*</Link>*/}
                </Stack>
            </Box>
            <LinksContainer menus={menus} count={menus.length}></LinksContainer>
        </AdminLayout>
    );
}

export default MenuContainer;
