import { GridCompositeFilter, GridDataResult, GridSortDescriptor } from "../models/grid.model";
import { buildQueryFilters } from "../models/query-filters.model";
import { CollectionResponse } from "../models/server-responses.model";
import { ICrudApi } from "./crud-api.service";

export interface ICrudService<T> {
    getAll(
        filter: GridCompositeFilter,
        sort: GridSortDescriptor[],
        page: number,
        pageSize: number
    ): Promise<CollectionResponse<T>>;
    getSingle(id: any): Promise<T>;
    create(item: T): Promise<T>;
    update(id: any, item: T): Promise<T>;
    delete(id: any): Promise<void>;
    
}

/**
 * Implementación base de lógica de negocio.
 * Delega en ICrudApi por defecto — las subclases sobreescriben
 * los métodos donde necesiten añadir validaciones o transformaciones.
 *
 * Uso:
 *   @Injectable()
 *   export class ProductService extends AbstractCrudService<Product> {
 *       constructor(api: ProductApiService) {
 *           super(api);
 *       }
 *
 *       // Sobreescribe solo lo que necesita lógica de negocio:
 *       override async create(item: Product): Promise<Product> {
 *           if (!item.ProductName?.trim()) throw new Error('Nombre obligatorio');
 *           return super.create(item);   // delega en el API
 *       }
 *   }
 */
export abstract class AbstractCrudService<T> implements ICrudService<T> {
 
    constructor() {
        
    }

    abstract getApi() : ICrudApi<T>;
 
    // ── Por defecto delega en el API ──────────────────────────────
    // Las subclases sobreescriben solo donde añaden lógica de negocio
 
    async getAll(
        filter: GridCompositeFilter = { logic: 'and', filters: [] },
        sort: GridSortDescriptor[] = [],
        page: number = 1,
        pageSize: number = 20
    ): Promise<CollectionResponse<T>> {
        const queryFilters = buildQueryFilters(filter, sort, page, pageSize);
        return this.getApi().getAll(queryFilters);
    }
 
    async getSingle(id: any): Promise<T> {
        return this.getApi().getSingle(id);
    }
 
    async create(item: T): Promise<T> {
        return this.getApi().create(item);
    }
 
    async update(id: any, item: T): Promise<T> {
        return this.getApi().update(id, item);
    }
 
    async delete(id: any): Promise<void> {
        return this.getApi().delete(id);
    }
}
 