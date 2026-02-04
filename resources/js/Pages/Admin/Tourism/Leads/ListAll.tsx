import React from 'react';
import Lead from "@/models/lead/Lead";
import {GridColumnDirTypecast} from "@syncfusion/ej2-react-grids/src/grid/columns-directive";
import "reflect-metadata";

import {
    ColumnDirective,
    ColumnsDirective, Edit, ExcelExport, Filter,
    FilterSettingsModel,
    GridComponent, Inject, Page,
    PageSettingsModel, PdfExport, Search, Selection, Sort, Toolbar, SelectionSettingsModel,
    GridColumnModel, RowDD, RowDropSettingsModel, RowDragEventArgs,
} from "@syncfusion/ej2-react-grids";
import CommonService from "@/Services/CommonService/CommonService";
import {GridActionEventArgs, SearchEventArgs} from "@syncfusion/ej2-grids/src/grid/base/interface";
import {Box} from "@mui/material";
import EditButton from "@/Components/Lists/LeadList/Components/EditButton";
import DeleteButton from "@/Components/Lists/LeadList/Components/DeleteButton";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import {Container} from "typedi";
import LeadService from "@/Services/LeadService/LeadService";
import {Head, router} from "@inertiajs/react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";

interface LeadElement extends Element{
    data: Lead,
}

const LeadList: React.FC<{leads: Lead []}> = ({leads}) => {
    const leadService = Container.get(LeadService);
    const [currentLeads, setCurrentLeads] = React.useState<Lead []>(leads);
    const deleteLead = (lead: Lead) => {
        console.log('delete here');
        leadService.delete(new FormData(), lead.id)
            .then(()=> {
                // router.visit(document.referrer || route('admin.blocks', [BlockCategories.PROJECT]));
                setCurrentLeads(currentLeads.filter(ld => ld.id !== lead.id));
                router.reload();
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Lead has been deleted!', severity: "success" })
                );
            })
            .catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error happened when deleting Lead!', severity: "error" })
                );
            });
    }

    const leadsGrid: (GridColumnModel | GridColumnDirTypecast) [] = [
        { type: 'checkbox', width: '50' },
        // {   field: 'name',
        //     headerText: 'Name',
        //     width: '250',
        //     template: ImageTemplate,
        //     allowFiltering: true,
        //     textAlign: 'Center' },
        { field: 'referenceName',
            headerText: 'Reference',
            width: '150',
            textAlign: 'Center' },
        { field: 'agentName',
            headerText: 'Agent',
            width: '130',
            textAlign: 'Center',
        },
        {
            field: 'name',
            headerText: 'Name',
            width: '130',
            textAlign: 'Center',
        },
        {
            field: 'phone',
            headerText: 'Phone',
            width: '130',
            textAlign: 'Center',
        },
        {
            field: 'email',
            headerText: 'Email',
            width: '130',
            textAlign: 'Center',
        },
        {
            field: 'message',
            headerText: 'Message',
            width: '130',
            textAlign: 'Center',
        },

        {
            headerText: 'Edit',
            width: '130',
            textAlign: 'Center',
            template: EditButton,
        },
        {
            headerText: 'Delete',
            width: '130',
            textAlign: 'Center',
            template: (props) => DeleteButton(props, deleteLead),
        },
    ];
    // const blockService = ServiceContainer.get(BlockService);
    // const {blocks, onSearch, reorder} = useBlocksContext();
    let grid: GridComponent | null;
    const selectionSettings: SelectionSettingsModel = {type: 'Multiple'};
    const FilterOptions: FilterSettingsModel = {
        type: 'Excel',
    };
    const pageOptions: PageSettingsModel = {
        pageSizes: CommonService.PageSizes,
        pageSize: CommonService.ListLimit,
        totalRecordsCount: 3,
        pageCount: 25,
    };

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    const actionComplete = (args: GridActionEventArgs) => {
        // console.log('args:', args);
        switch (args.requestType) {
            case 'paging':
                break;
            case 'searching':
                const search = (args as SearchEventArgs).searchString
                if (search !== undefined) {
                    // onSearch(search);
                }
                break;
            // case 'rowdraganddrop':
            //     let orderList: {id: number, order: number} [] = [];
            //     const rows = (args as RowDragEventArgs).rows as LeadElement [];
            //     rows?.map((row, index) => {
            //         orderList = [...orderList, {id: row.data.id, order: index}]
            //     })
            //     reorder(orderList);
            //     break;
            default:
                break;

        }
    }



    const rowDrop = (args: RowDragEventArgs): void => {
        if (args.rows !== undefined && args.fromIndex !== undefined && args.dropIndex !== undefined) {
            args.cancel = true;
            let value: number[] = [];
            for (let r = 0; r < args?.rows?.length; r++) {
                value.push(args?.fromIndex + r);
            }
            if (grid) grid.reorderRows(value, args.dropIndex);
        }
    }

    return (
        <AdminLayout>
            <Head title="Leads"></Head>
            <Box>
            <GridComponent
                ref={g => grid = g}
                id="blockComp"
                dataSource={currentLeads}
                allowPaging
                allowSorting
                allowFiltering
                allowExcelExport={true}
                allowPdfExport={true}
                toolbar={['Delete', 'Search']}
                editSettings={{allowDeleting: true,
                    // allowEditing: true,
                    showDeleteConfirmDialog:true}}
                filterSettings={FilterOptions}
                pageSettings={pageOptions}
                actionComplete={actionComplete}
                allowRowDragAndDrop={true}
                selectionSettings={selectionSettings}
                rowDrop={rowDrop}
                // toolbarClick={handleExport}
            >
                <ColumnsDirective>
                    {leadsGrid.map((item, key) => (
                        <ColumnDirective key={key} {...item}/>
                    ))}
                </ColumnsDirective>

                <Inject services={[Page, Toolbar, ExcelExport, PdfExport, Selection,
                    // Edit,
                    Sort, Search, Filter, RowDD]} />
            </GridComponent>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </Box>
        </AdminLayout>
    );
};

export default LeadList;
