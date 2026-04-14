import { FilterValues } from "../models/filter.model";
import { GridCompositeFilter, GridDataResult, GridSortDescriptor } from "../models/grid.model";

export interface IGridService<T> {
    getGridData(
        skip?: number,
        pageSize?: number,
        sort?: GridSortDescriptor[],
        filter?: GridCompositeFilter,
        additionalFilters?: FilterValues
    ): Promise<GridDataResult<T>>;

    createAll(items: T[]): Promise<T[]>;
    updateAll(items: T[]): Promise<T[]>;
    deleteAll(ids: any[]): Promise<void>;

    getKeys(item: T): any[];
}