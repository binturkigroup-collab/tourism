import React, {useState} from 'react';
import styles from "./styles.module.scss";
import {PageProps} from "@/types";
import {Block} from "@/models/block/Block";
import {DataTable, HeadCell, Order} from "@/Interfaces/DataTable/TableProps";
import BlockTable from "@/Interfaces/DataTable/BlockTableProps";
import {Container} from "typedi";
import TableService from "@/Services/TableService/TableService";
import BlockService from "@/Services/BlockService/BlockService";
import CategoryTable from "@/Interfaces/DataTable/CategoryTableProps";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import EnhancedTableHead from "@/Components/TableComponents/EnhancedTableHead";
import EnhancedTableToolbar from "@/Components/TableComponents/EnhancedTableToolbar";
import ListAvatar from "@/Components/Icon/ListAvatar";
import {Link, router} from "@inertiajs/react";

import {
    Table,
    TableContainer,
    TableRow,
    TableBody,
    TableCell,
    Paper,
    TablePagination,
    Checkbox,
    IconButton, Box, Typography, Stack, Modal,
} from "@mui/material";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import CustomButton from "@/Components/Button/CustomButton";
import CommonService from "@/Services/CommonService/CommonService";

const headCells: readonly HeadCell<BlockTable>[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'Id',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'parent',
        numeric: true,
        disablePadding: false,
        label: 'Parent',
    },
    {
        id: 'isActive',
        numeric: true,
        disablePadding: false,
        label: 'Active',
    },
    {
        id: 'edit',
        numeric: true,
        disablePadding: false,
        label: '',
    },
    {
        id: 'delete',
        numeric: true,
        disablePadding: false,
        label: '',
    },
]

const BlockList: React.FC<{category: string, blocks: Block []}> = ({category, blocks}) => {
    const tableService = Container.get(TableService);
    const blockService = Container.get(BlockService);
    const commonService = Container.get(CommonService);

    const [selectedBlocks, setSelectedBlocks] = useState<Block []>(blocks);
    const [selectedBlock, setSelectedBlock] = useState<Block>(new Block({}))


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof CategoryTable>('name');
    const [selected, setSelected] = React.useState<readonly number[]>([]);

    const rows = React.useMemo(() =>
            blockService.getBlockRows(selectedBlocks),
        [selectedBlocks]
    );

    const visibleRows = React.useMemo(
        () =>
            tableService.stableSort((rows.map(row => {
                // const {history, ...props} = row;
                return row;
            })), tableService.getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown, MouseEvent>,
        property: keyof DataTable<BlockTable>,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => parseInt(n.id.toString()));
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});
    // =========================================================================================
    // Handle Modal for Delete:
    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = (id: number) => {
        setSelectedBlock(selectedBlocks.find(cat => cat.id === id) || new Block({}));
        setOpenModal(true);
    }
    // =========================================================================================
    // Handle delete category

    const deleteBlock = (id: number) => {
        const block = selectedBlocks.find(cat => cat.id === id) || new Block({})
        setOpenModal(false);
        blockService.deleteBlock(id)
            .then(response => {
                // setSelectedCategories(selectedCategories => selectedCategories.filter(cat => cat.id !== id));
                // setSnackbar(snackbarState =>
                //     ({ ...snackbarState, open: true, message: 'Category has been deleted!', severity: "success" })
                // );
                router.get('/admin/website/get-block/' + block.category);
            })
            .catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error Happened while deleting category!', severity: "error" })
                );
            })
    }
    // =========================================================================================
    // Handle Switch button:

    const switchState = (id: number, currentState: any) => {
        const block = selectedBlocks.find(cat => cat.id === id) || new Block({})
        const formData = new FormData();
        formData.append('isActive', String(!block.isActive));
        // blockService.blockActivation(formData, id).then(respone => {
        //     methods.setValue('isActive', !methods.getValues('isActive'));
        // })

        blockService.blockActivation(formData, id).then(response => {
            // methods.setValue('isActive', !methods.getValues('isActive'));
            // setSelectedCategories((categories) => {
            //     return categories.map(cat => {
            //         if (cat.id === response.data.id) return response.data;
            //         else return cat;
            //     });
            // });
            router.get('/admin/website/get-block/' + block.category);
            // setSelectedCategory(response.data);
            // setSnackbar(snackbarState =>
            //     ({ ...snackbarState, open: true, message: 'Category status has been successfully updated!', severity: "success" })
            // );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while updating category status!', severity: "error" })
            );
        })
    }
    // =========================================================================================

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <EnhancedTableToolbar numSelected={selected.length} title={commonService.toTitleCase(category)} />
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader size="small"  aria-label="collapsible table">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        headCells={headCells}
                    />
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            const isItemSelected = isSelected(parseInt(row.id.toString()));
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    // onClick={(event) => handleClick(event, parseInt(row.id.toString()))}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {/*<TableCell padding="checkbox">*/}
                                    {/*    <Checkbox*/}
                                    {/*        color="primary"*/}
                                    {/*        checked={isItemSelected}*/}
                                    {/*        inputProps={{*/}
                                    {/*            'aria-labelledby': labelId,*/}
                                    {/*        }}*/}
                                    {/*    />*/}
                                    {/*</TableCell>*/}
                                    <TableCell align="left">{index + 1}</TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                    >
                                        <ListAvatar primary={row.name} secondary={row.createdAt} imageFile={row.image.toString()}/>
                                    </TableCell>
                                    <TableCell align="right">{row.parent}</TableCell>
                                    <TableCell align="right">
                                        {/*{row.isActive ? 'Yes' : 'No'}*/}
                                        <IconButton onClick={() => switchState(parseInt(String(row.id)), row.isActvie)}>
                                            <Brightness1Icon color={row.isActive? "activate": "deactivate"}></Brightness1Icon>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Link href={`/admin/website/block/${row.id}`}>
                                            <CustomButton task='display' text=""></CustomButton>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        <CustomButton task='delete' text="" onClick={() => handleOpenModal(parseInt(String(row.id)))}></CustomButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow
                                // style={{
                                //     height: (dense ? 33 : 53) * emptyRows,
                                // }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.modalStyle} sx={{
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    border: `2px solid`
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm Deletion Message
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure that you want to delete {blockService.getBlockName(selectedBlock)}
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                        className="m-[8px]"
                    >
                        {/*<CustomButton task="update" text="Category"></CustomButton>*/}
                        <CustomButton task="delete" text="" onClick={() => deleteBlock(selectedBlock.id)}></CustomButton>
                    </Stack>
                </Box>
            </Modal>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </Paper>
    );
}

export default BlockList;
