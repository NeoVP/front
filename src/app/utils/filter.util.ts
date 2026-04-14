import { FilterValues } from "../models/filter.model";
import { GridCompositeFilter, GridFilterDescriptor } from "../models/grid.model";

/**
 * Fusiona un FilterValues (objeto plano de SeccionFiltros)
 * con un CompositeFilterDescriptor existente (filtro del grid).
 *
 * Los FilterValues se convierten a FilterDescriptor con operador 'eq' por defecto,
 * excepto arrays que usan 'in' y strings que usan 'contains'.
 *
 * Ejemplo:
 *   filterValues:  { ProductName: 'chai', CategoryID: [1, 3] }
 *   gridFilter:    { logic: 'and', filters: [{ field: 'UnitPrice', operator: 'lte', value: 20 }] }
 *
 *   resultado:     {
 *       logic: 'and',
 *       filters: [
 *           { field: 'UnitPrice',   operator: 'lte',      value: 20 },
 *           { field: 'ProductName', operator: 'contains', value: 'chai' },
 *           { field: 'CategoryID',  operator: 'in',       value: [1, 3] },
 *       ]
 *   }
 */
export function mergeFilters(
    filterValues?: FilterValues,
    gridFilter?:   GridCompositeFilter
): GridCompositeFilter {

    const baseFilters: (GridFilterDescriptor | GridCompositeFilter)[] =
        gridFilter?.filters ?? [];

    const valueFilters: (GridFilterDescriptor | GridCompositeFilter)[] = filterValues
        ? Object.entries(filterValues)
              .filter(([, value]) => value !== null && value !== undefined && value.length !== 0)
              .map(([field, value]) => toFilter(field, value))
        : [];

    return {
        logic:   gridFilter?.logic ?? 'and',
        filters: [...baseFilters, ...valueFilters],
    };
}

/**
 * Convierte un campo y valor a FilterDescriptor o CompositeFilterDescriptor.
 *
 * - Array   → CompositeFilterDescriptor con logic 'or' y operador 'eq' por item
 * - string  → FilterDescriptor con operador 'contains'
 * - resto   → FilterDescriptor con operador 'eq'
 */
function toFilter(field: string, value: any): GridFilterDescriptor | GridCompositeFilter {
    if (Array.isArray(value)) {
        return {
            logic: 'or',
            filters: value.map(v => ({
                field,
                operator: 'eq',
                value:    v,
            } as GridFilterDescriptor))
        } as GridCompositeFilter;
    }
 
    return {
        field,
        operator: typeof value === 'string' ? 'contains' : 'eq',
        value,
    } as GridFilterDescriptor;
}