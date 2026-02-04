import React from 'react';
import {Menu} from "@/models/menu/Menu";
import {Container} from "typedi";
import "reflect-metadata";
import MenuService from "@/Services/MenuService/MenuService";
import {
    Grid,
    Paper,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    Checkbox,
    Button,
    Typography, Stack,
    IconButton,
} from "@mui/material";
import {Head, Link} from "@inertiajs/react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import CommonService from "@/Services/CommonService/CommonService";
import CustomButton from "@/Components/Button/CustomButton";
import CustomIcon from "@/Components/Icon/Icon";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import useSnackbarHook from "@/Hooks/SnackbarHook";

function not(a: readonly Menu[], b: readonly Menu[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly Menu[], b: readonly Menu[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}


const MenuReorder: React.FC<{category: string, menu: Menu []}> = ({category, menu}) => {
    console.log('links: ', menu)
    const menuService = Container.get(MenuService);
    const commonService = Container.get(CommonService);

    const getTitle = () => {
        return commonService.toTitleCase(category);
    }

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});
    // =========================================================================================

    const [checked, setChecked] = React.useState<readonly Menu[]>([]);
    const [left, setLeft] = React.useState<readonly Menu[]>(menu);
    const [right, setRight] = React.useState<readonly Menu[]>([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: Menu) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const customList = (items: readonly Menu []) => (
        <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((menu, index) => {
                    const labelId = `transfer-list-item-${menuService.getMenuName(menu)}-label`;

                    return (
                        <ListItemButton
                            key={menuService.getMenuName(menu)}
                            role="listitem"
                            onClick={handleToggle(menu)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(menu) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={menuService.getMenuName(menu)} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Paper>
    );

    const reorder = () => {
        if (left.length > 0) {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Reorder all the list', severity: "error" })
            );
            return;
        }

        const orderList = right.map((item, index) => {
            return {id: item.id, order: index + 1};
        });

        const formData = new FormData();
        formData.append('list', JSON.stringify(orderList));
        menuService.reorder(formData).then((response) => {
            setLeft(right);
            setRight([] as Menu []);
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'A list has been ordered', severity: "success" })
            );
        }).catch(() => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while reordering list', severity: "error" })
            );
        })
    }

    return (
        <AdminLayout>
            <Head title={'Reorder ' + getTitle()}></Head>
            <Box className="py-[16px]">
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Link href={`/admin/website/get-menu/${category}`}>
                        <CustomButton task='back' text="to list"></CustomButton>
                    </Link>
                </Stack>
            </Box>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid>
                    <Typography>Old List</Typography>
                    {customList(left)}
                </Grid>
                <Grid>
                    <Grid container direction="column" alignItems="center">
                        <IconButton
                            sx={{ my: 0.5 }}
                            size="small"
                            onClick={handleAllRight}
                            disabled={left.length === 0}
                            aria-label="move all right"
                        >
                            <CustomIcon name="double-right"></CustomIcon>
                        </IconButton>
                        <IconButton
                            sx={{ my: 0.5 }}
                            size="small"
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            <CustomIcon name="right"></CustomIcon>
                        </IconButton>
                        <IconButton
                            sx={{ my: 0.5 }}
                            size="small"
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            <CustomIcon name="left"></CustomIcon>
                        </IconButton>
                        <IconButton
                            sx={{ my: 0.5 }}
                            size="small"
                            onClick={handleAllLeft}
                            disabled={right.length === 0}
                            aria-label="move all left"
                        >
                            <CustomIcon name="double-left"></CustomIcon>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid>
                    <Typography>New List</Typography>
                    {customList(right)}
                </Grid>
            </Grid>

            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                className="py-[16px]"
            >
                <CustomButton
                    task="reorder" text={commonService.toTitleCase(category)}
                    onClick={reorder}
                ></CustomButton>
            </Stack>

            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </AdminLayout>

    );
};

export default MenuReorder;
