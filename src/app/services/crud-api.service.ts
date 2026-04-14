import { inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { QueryFilters } from "../models/query-filters.model";
import { API_BASE_URL } from "../api-config.token";
import { CollectionResponse } from "../models/server-responses.model";

export interface ICrudApi<T> {
    getAll(queryFilters: QueryFilters): Promise<CollectionResponse<T>>;
    getSingle(id: any): Promise<T>;
    create(item: T): Promise<T>;
    update(id: any, item: T): Promise<T>;
    delete(id: any): Promise<void>;
}

export abstract class AbstractCrudApi<T> implements ICrudApi<T> {

    protected readonly baseUrl = inject(API_BASE_URL);
    protected readonly http = inject(HttpClient);
 
    protected abstract getApiPath(): string;

    protected getApiUrl(): string {
        return `${this.baseUrl}/${this.getApiPath()}`;
    }
 
    // ── Lectura ───────────────────────────────────────────────────
 
    async getAll(queryFilters: QueryFilters): Promise<CollectionResponse<T>> {
        const params = this.buildParams(queryFilters);
        return firstValueFrom(
            this.http.get<CollectionResponse<T>>(this.getApiUrl(), { params })
        );
    }
 
    async getSingle(id: any): Promise<T> {
        return firstValueFrom(
            this.http.get<T>(`${this.getApiUrl()}/${id}`)
        );
    }
 
    // ── Escritura ─────────────────────────────────────────────────
 
    async create(item: T): Promise<T> {
        return firstValueFrom(
            this.http.post<T>(this.getApiUrl(), item)
        );
    }
 
    async update(id: any, item: T): Promise<T> {
        return firstValueFrom(
            this.http.put<T>(`${this.getApiUrl()}/${id}`, item)
        );
    }
 
    async delete(id: any): Promise<void> {
        return firstValueFrom(
            this.http.delete<void>(`${this.getApiUrl()}/${id}`)
        );
    }
 
    // ── Helpers privados ──────────────────────────────────────────

    private buildParams(data: any): HttpParams {
        const params = Object.entries(data)
            .filter(([, value]) => value !== undefined && value !== null)
            .reduce(
                (params, [key, value]) => params.set(key, String(value)),
                new HttpParams()
            );
 
        return params;
    }
}