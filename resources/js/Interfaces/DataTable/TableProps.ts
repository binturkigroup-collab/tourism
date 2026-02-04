import React from "react";

export type Order = 'asc' | 'desc';

export interface HeadCell<T> {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}

export interface EnhancedTableProps<T extends DataTable<T>> {
    numSelected: number;
    onRequestSort?: (event: React.MouseEvent<unknown, MouseEvent>, property: keyof T) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order?: Order;
    orderBy?: keyof T;
    rowCount: number;
    headCells: readonly HeadCell<T>[];
}

export interface EnhancedTableToolbarProps {
    numSelected: number;
    title?: string;
}

export interface DataTable<T = Record<string, any>> extends Record<string, any>{}
