import React from 'react';
import {useBlocksContext} from "../BlocksContext";
// import {GridColumnModel, RowDD} from "@syncfusion/ej2-grids";
import {GridColumnDirTypecast} from "@syncfusion/ej2-react-grids/src/grid/columns-directive";
import ImageTemplate from "./ImageTemplate";
import ActiveForm from "./ActiveForm";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import BlockService from "@/Services/BlockService/BlockService";
import {Container as ServiceContainer} from "typedi";
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
import {BlockGridProps} from "../../Interfaces";

interface BlockElement extends Element{
    data: BlockGridProps,
}

const blocksGrid: (GridColumnModel | GridColumnDirTypecast) [] = [
    { type: 'checkbox', width: '50' },
    {   field: 'name',
        headerText: 'Name',
        width: '250',
        template: ImageTemplate,
        allowFiltering: true,
        // filterTemplate: filterName,
        textAlign: 'Center' },
    { field: 'parent',
        headerText: 'Parent',
        width: '150',
        textAlign: 'Center' },
    { field: 'isActive',
        headerText: 'Status',
        width: '130',
        // format: 'yMd',
        textAlign: 'Center',
        template: ActiveForm,
        // template: customerGridStatus,
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
        template: DeleteButton,
    },
];

const BlockList = () => {
    const blockService = ServiceContainer.get(BlockService);
    const {blocks, onSearch, reorder} = useBlocksContext();
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
            case 'rowdraganddrop':
                let orderList: {id: number, order: number} [] = [];
                const rows = (args as RowDragEventArgs).rows as BlockElement [];
                rows?.map((row, index) => {
                    orderList = [...orderList, {id: row.data.id, order: index}]
                })
                reorder(orderList);
                break;
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
        <Box>
            <GridComponent
                ref={g => grid = g}
                id="blockComp"
                dataSource={blockService.mapBlocksGrid(blocks)}
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
                    {blocksGrid.map((item, key) => (
                        <ColumnDirective key={key} {...item}/>
                    ))}
                </ColumnsDirective>

                <Inject services={[Page, Toolbar, ExcelExport, PdfExport, Selection,
                    // Edit,
                    Sort, Search, Filter, RowDD]} />
            </GridComponent>
        </Box>
    );
};

export default BlockList;
