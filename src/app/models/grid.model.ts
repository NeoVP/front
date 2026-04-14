import { MyComboBoxConfig } from "./inputs.config.model";

export type MyFieldDataType = "text" | "numeric" | "date" | "boolean";

export class GridColumnDescriptor {
    public field: string = '';
    public title: string = '';
    public type: MyFieldDataType = 'text';
    public editor: MyFieldDataType = 'text';
    public width: number = 0;
    public format: any;
    public filterable: boolean = false;
    public sortable: boolean = false;
    public editable: boolean = true;
    public customEditor?: MyComboBoxConfig;
}

// Tipos propios, sin importar nada de Kendo
export interface GridSortDescriptor {
    field: string;
    dir?: 'asc' | 'desc';
}

export interface GridFilterDescriptor {
    field: string;
    operator: string;
    value: any;
}

export interface GridCompositeFilter {
    logic: 'and' | 'or';
    filters: (GridFilterDescriptor | GridCompositeFilter)[];
}

export interface GridDataResult<T = any> {
    data: T[];
    total: number;
}