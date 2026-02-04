import React from 'react';
import {PageProps} from "@/types";
import {Block} from "@/models/block/Block";
import {Head, Link} from "@inertiajs/react";
import {Box, Stack} from "@mui/material";
import CustomButton from "@/Components/Button/CustomButton";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import CommonService from "@/Services/CommonService/CommonService";
import {Container} from "typedi";
import "reflect-metadata";
import BlockList from "@/Pages/Admin/Website/Blocks/Partials/BlockList";
import BlocksContainer from "@/Components/Lists/BlockList/BlocksContainer";

const BlockContainer = ({category, blocks}: PageProps<{category: string, blocks: Block []}>) => {
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
                    <Link href={`/admin/block/create/${category}`}>
                        <CustomButton task='add' text={getTitle()}></CustomButton>
                    </Link>

                    {/*<Link href={`/admin/website/block/reorder/${category}`}>*/}
                    {/*    <CustomButton task='reorder' text={getTitle()}></CustomButton>*/}
                    {/*</Link>*/}
                </Stack>
            </Box>
            {/*<BlockList category={category} blocks={blocks}></BlockList>*/}
            <BlocksContainer blocks={blocks} count={blocks.length}></BlocksContainer>
        </AdminLayout>
    );
}

export default BlockContainer;
