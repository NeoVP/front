import { Injectable } from '@angular/core';
import { Product, products } from './data.products';
import { IGridService } from './abstract-grid.service';
import { GridCompositeFilter, GridDataResult, GridSortDescriptor } from '../models/grid.model';
import { FilterValues } from '../models/filter.model';
import { AbstractCrudService } from './crud.service';
import { AbstractCrudApi, ICrudApi } from './crud-api.service';
import { mergeFilters } from '../utils/filter.util';
import { Category } from './data.categories';

@Injectable({ providedIn: 'root' })
export class ProductApiService extends AbstractCrudApi<Product> {

    protected getApiPath(): string {
        return 'products';
    }
}

@Injectable({ providedIn: 'root' })
export class ProductService extends AbstractCrudService<Product> implements IGridService<Product>{
    
    constructor(private api: ProductApiService) { 
        super();
    }

    override getApi(): ICrudApi<Product> {
        return this.api;
    }

    getKeys(item: Product) : any[] { 
        return [item.productID];
    }
    
    public async getGridData(
        skip: number = 0,
        pageSize: number = 20,
        sort?: GridSortDescriptor[],
        filter?: GridCompositeFilter,
        additionalFilters?: FilterValues
    ): Promise<GridDataResult<Product>> {
        const mergedFilter = mergeFilters(additionalFilters, filter);
        const response = await this.getAll(mergedFilter, sort, skip, pageSize);
        return {
            data: response.values.map(m => {
                const producto = new Product();
                Object.assign(producto, m);
                return producto;
            }),
            total: response.count
        };
    }

    async createAll(items: Product[]): Promise<Product[]> {
        const result: Product[] = [];
        for(var item of items){
            result.unshift(await this.create(item));
        }
        return result;
    }

    async updateAll(items: Product[]): Promise<Product[]> {
        const result: Product[] = [];
        for(var item of items){
            result.unshift(await this.update(item.productID, item));
        }
        return result;
    }

    async deleteAll(ids: any[]): Promise<void> {
        for(var id of ids){
            await this.delete(id);
        }
    }
}

@Injectable({ providedIn: 'root' })
export class CategoryApiService extends AbstractCrudApi<Category> {

    protected getApiPath(): string {
        return 'categories';
    }
}

@Injectable({ providedIn: 'root' })
export class CategoryService extends AbstractCrudService<Category> implements IGridService<Category>{
    
    constructor(private api: CategoryApiService) { 
        super(); 
    }

    override getApi(): ICrudApi<Category> {
        return this.api;
    }

    getKeys(item: Category) : any[] { 
        return [item.categoryID];
    }
    
    public async getGridData(
        skip: number = 0,
        pageSize: number = 20,
        sort?: GridSortDescriptor[],
        filter?: GridCompositeFilter,
        additionalFilters?: FilterValues
    ): Promise<GridDataResult<Category>> {
        const mergedFilter = mergeFilters(additionalFilters, filter);
        const response = await this.getAll(mergedFilter, sort, skip, pageSize);
        return {
            data: response.values,
            total: response.count
        };
    }
        
    createAll(items: Category[]): Promise<Category[]> {
        throw new Error('Method not implemented.');
    }
    updateAll(items: Category[]): Promise<Category[]> {
        throw new Error('Method not implemented.');
    }
    deleteAll(ids: any[]): Promise<void> {
        throw new Error('Method not implemented.');
    }
}