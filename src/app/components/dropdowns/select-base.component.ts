import { Directive, EventEmitter, Host, Input, model, OnDestroy, OnInit, Optional, Output, signal, SkipSelf } from '@angular/core';
import { SelectBaseConfig } from '../../models/inputs.config.model';
import { SeccionFiltrosProvider } from '../seccion-filtros/seccion-filtros.provider';

const DEFAULT_DEBOUNCE_MS = 300;

/**
 * Clase base para combo, dropdown y multi.
 * Gestiona: lazy load al abrir, debounce al escribir, items como signal.
 * Kendo nunca sale a la superficie.
 */
@Directive()
export abstract class SelectBaseComponent<T, K extends SelectBaseConfig> implements OnInit, OnDestroy {

    // Un solo input para la configuración
    @Input() set config(config: K) {
        this._config = this.initializeConfig(config);
        this.configInit.emit(this._config);
    }
    

    @Output() configInit = new EventEmitter<SelectBaseConfig>();

    value = model<T | null>(null);
    
    private _config: K = this.initializeConfig(this.defaultConfig() as K);
    get config(): K {
        return this._config;
    }

    protected abstract initializeConfig(config: K): K;
    protected defaultConfig(): Partial<SelectBaseConfig> {
        return {
            value: null,
            valuePrimitive: false,
            filterable: true,
            disabled: false,
            readonly: false,
            placeholder: '',
            debounceMs: DEFAULT_DEBOUNCE_MS,
            textField: "text",
            valueField: "value"
        } as Partial<SelectBaseConfig>;
    };

    protected items = signal<T[]>([]);
    protected loading = signal<boolean>(false);

    // primera apertura del dropdown: carga los items. Luego se queda en true para no recargar al abrir.
    private opened = false;
    private debounce: ReturnType<typeof setTimeout> | null = null;

    constructor(
        // Inyección opcional: funciona tanto dentro de SeccionFiltros como standalone
        @Optional() @SkipSelf() private seccionFiltros: SeccionFiltrosProvider
    ) { }

    ngOnInit(): void {
        // Se registra en SeccionFiltros si existe como host
        this.seccionFiltros?.registerInput(this._config.field, this);
    }

    ngOnDestroy(): void {
        this.seccionFiltros?.unregisterInput(this._config.field);
    }

    // ── Eventos del control Kendo (llamados desde el template del hijo) ──

    protected async onOpen(): Promise<void> {
        this.config.onOpen?.();
        if (this.opened) return;
        this.opened = true;
        await this.fetchItems('');
    }

    protected onClose(): void {
        this.config.onClose?.();
    }

    protected onFilterChange(searchText: string): void {
        this.config.onFilterChange?.(searchText);
        if (this.debounce) clearTimeout(this.debounce);
        this.debounce = setTimeout(() => this.fetchItems(searchText), this._config.debounceMs);
    }

    protected onValueChange(value: any): void {
        this.config.onValueChange?.(value);
    }

    // ── API pública ───────────────────────────────────────────────

    /** Recarga los items pasando data extra a getData (filtros dependientes) */
    public async reload(): Promise<void> {
        await this.fetchItems('');
    }

    // ── Helpers privados ──────────────────────────────────────────

    private async fetchItems(searchText: string): Promise<void> {
        this.loading.set(true);
        try {
            const result = await this._config.getData(searchText);
            this.items.set(result);
        } finally {
            this.loading.set(false);
        }
    }
}