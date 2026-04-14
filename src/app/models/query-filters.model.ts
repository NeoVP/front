import { toODataString } from "@progress/kendo-data-query";
import { GridCompositeFilter, GridSortDescriptor } from "./grid.model";

export interface QueryFilters {
    filter?: string;
    sort?: string;
    page: number;
    pageSize: number;
}

/**
* Construye el objeto QueryFilters a partir de los parámetros de paginación,
* orden y filtro usando toODataString() de XXXX.
*
* Las subclases pueden sobreescribir este método para añadir
* parámetros extra o cambiar los nombres de los campos.
*/
export function buildQueryFilters(
    filter: GridCompositeFilter = { logic: 'and', filters: [] },
    sort: GridSortDescriptor[] = [],
    page: number = 1,
    pageSize: number = 20
): QueryFilters {
    const oData = toODataString({ skip: page, take: pageSize, sort, filter })
        .replace('$filter=', 'filter=')
        .replace('$orderby=', 'sort=')
        .replace('$top=', 'pageSize=')
        .replace('$skip=', 'page=')
        .replace(/'/g, '"');

    const cleanQuery = transformToDynamicLinq(decodeURIComponent(oData));



    const parsed = Object.fromEntries(
        cleanQuery.split('&')
            .filter(p => !!p)
            .map(p => p.split('='))
            .map(([key, ...rest]) => [key, rest.join('=')])
    );

    return <QueryFilters>{
        page: Number(parsed['page'] ?? 1),
        pageSize: Number(parsed['pageSize'] ?? 20),
        sort: parsed['sort'] || undefined,
        filter: parsed['filter'] || undefined,
    };
}

function transformToDynamicLinq(odataFilter: string): string {
    // Expresión regular que busca: contains(campo, 'valor') o "valor"
    const regex = /contains\(([^,]+),\s*(['"][^'"]+['"])\)/gi;

    return odataFilter
        .replace(regex, '$1.Contains($2)') // Cambia contains(A, B) -> A.Contains(B)
}