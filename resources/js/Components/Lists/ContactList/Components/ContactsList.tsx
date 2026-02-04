import React from 'react';

import {GridColumnDirTypecast} from "@syncfusion/ej2-react-grids/src/grid/columns-directive";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ContactService from "@/Services/Contact/ContactService";
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
import {useContactsContext} from "@/Components/Lists/ContactList/ContactsContext";
import Type from "@/Components/Lists/ContactList/Components/Type";

interface BlockElement extends Element{
    data: BlockGridProps,
}

const contactsGrid: (GridColumnModel | GridColumnDirTypecast) [] = [
    { type: 'checkbox', width: '50' },
    { field: 'agentName',
        headerText: 'Agent',
        width: '200',
        textAlign: 'Center',
        // template: Type,
    },
    {   field: 'name',
        headerText: 'Name',
        width: '150',
        allowFiltering: true,
        textAlign: 'Center' },
    { field: 'phone',
        headerText: 'Phone',
        width: '150',
        textAlign: 'Center' },
    { field: 'email',
        headerText: 'Email',
        width: '200',
        textAlign: 'Center',
    },
    { field: 'type',
        headerText: 'Customer Type',
        width: '200',
        textAlign: 'Center',
        template: Type,
    },
    { field: 'createdAt',
        headerText: 'Date of lead',
        width: '150',
        textAlign: 'Center',},
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
const ContactsList = () => {
    // const blockService = ServiceContainer.get(BlockService);
    const contactService = ServiceContainer.get(ContactService);
    const {contacts, onSearch} = useContactsContext();
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
        switch (args.requestType) {
            case 'paging':
                break;
            case 'searching':
                const search = (args as SearchEventArgs).searchString
                if (search !== undefined) {
                    // onSearch(search);
                }
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
                dataSource={contacts}
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
                    {contactsGrid.map((item, key) => (
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

export default ContactsList;
