import React from 'react';
import {Block} from "@/models/block/Block";
import {Container} from "typedi";
import "reflect-metadata";
import BlockService from "@/Services/BlockService/BlockService";
import {
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
import Grid from "@mui/material/Grid";
import {Head, Link} from "@inertiajs/react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import CommonService from "@/Services/CommonService/CommonService";
import CustomButton from "@/Components/Button/CustomButton";
import CustomIcon from "@/Components/Icon/Icon";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import useSnackbarHook from "@/Hooks/SnackbarHook";

function not(a: readonly Block[], b: readonly Block[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly Block[], b: readonly Block[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}


const BlockReorder: React.FC<{category: string, blocks: Block []}> = ({category, blocks}) => {
    const blockService = Container.get(BlockService);
    const commonService = Container.get(CommonService);

    const getTitle = () => {
        return commonService.toTitleCase(category);
    }

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});
    // =========================================================================================

    const [checked, setChecked] = React.useState<readonly Block[]>([]);
    const [left, setLeft] = React.useState<readonly Block[]>(blocks);
    const [right, setRight] = React.useState<readonly Block[]>([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: Block) => () => {
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

    const customList = (items: readonly Block []) => (
        <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((block, index) => {
                    const labelId = `transfer-list-item-${blockService.getBlockName(block)}-label`;

                    return (
                        <ListItemButton
                            key={blockService.getBlockName(block)}
                            role="listitem"
                            onClick={handleToggle(block)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(block) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={blockService.getBlockName(block)} />
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
        blockService.reorder(formData).then((response) => {
            setLeft(right);
            setRight([] as Block []);
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
                    <Link href={`/admin/website/get-block/${category}`}>
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

export default BlockReorder;
