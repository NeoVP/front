import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, forwardRef, Input, OnInit, Output, Signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KENDO_PANELBAR, PanelBarComponent } from '@progress/kendo-angular-layout';
import { FilterDescriptor, FilterValues } from '../../models/filter.model';
import { SelectBaseConfig } from '../../models/inputs.config.model';
import { MyComboBoxComponent } from '../dropdowns/combobox/my-combobox.component';
import { MyDropDownComponent } from '../dropdowns/dropdown/my-dropdown.component';
import { MyMultiSelectComponent } from '../dropdowns/multiselect/my-multiselect.component';
import { SelectBaseComponent } from '../dropdowns/select-base.component';
import { MyDateTimePickerComponent } from '../inputs/datetime-picker/my-datetime-picker.component';
import { MyNumericTextBoxComponent } from '../inputs/numeric-textbox/my-numeric-textbox.component';
import { SeccionFiltrosProvider } from './seccion-filtros.provider';

@Component({
    selector: 'app-seccion-filtros',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        KENDO_PANELBAR,
        MyNumericTextBoxComponent,
        MyDateTimePickerComponent,
        MyDropDownComponent,
        MyComboBoxComponent,
        MyMultiSelectComponent,
    ],
    providers: [{ provide: SeccionFiltrosProvider, useExisting: forwardRef(() => SeccionFiltrosComponent) }],
    templateUrl: './seccion-filtros.component.html',
    styleUrl: './seccion-filtros.component.css',
    encapsulation: ViewEncapsulation.None, // para que los estilos a kendo se apliquen sin necesidad de ::ng-deep
})
export class SeccionFiltrosComponent implements OnInit, SeccionFiltrosProvider {
    @Input({ required: true }) filtersData: FilterDescriptor[] = [];

    /**
    * El padre recibe el objeto { field: value } con los filtros activos.
    * Se emite al pulsar Buscar.
    *
    * Uso:
    *   <app-seccion-filtros [filters]="..." (search)="onSearch($event)" />
    *
    *   protected onSearch(values: FilterValues): void {
    *       this.grid.applyFilter(values);
    *   }
    */
    @Output()
    onSearch = new EventEmitter<FilterValues>();

    /**
     * Se emite al pulsar Limpiar, después de resetear los valores internos.
     * El padre puede usarlo para limpiar el grid u otras acciones.
     */
    @Output()
    onClear = new EventEmitter<void>();

    // Mapa field → instancia del componente select (combo/dropdown/multi)
    // Poblado automáticamente via registerInput() cuando cada hijo se inicializa
    private inputMap = new Map<string, SelectBaseComponent<any, SelectBaseConfig>>();

    @ViewChild(PanelBarComponent)
    private panelBar!: PanelBarComponent;

    async ngOnInit(): Promise<void> {

    }

    // ── Registro via DI (llamado por SelectBaseComponent) ─────────

    public registerInput(field: string, instance: SelectBaseComponent<any, SelectBaseConfig>): void {
        this.inputMap.set(field, instance);
    }

    public unregisterInput(field: string): void {
        this.inputMap.delete(field);
    }

    // ── Botones ───────────────────────────────────────────────────

    protected onSearchClick(): void {
        this.onSearch.emit(this.currentValues());
    }

    protected onClearClick(): void {
        this.clearFilters();
        this.onClear.emit();
    }

    // ── API pública ───────────────────────────────────────────────

    /**
     * Devuelve un objeto plano { field: value } con los valores actuales.
     * Solo incluye los campos que tienen valor.
     *
     * Ejemplos:
     *   { ProductName: 'chai' }
     *   { CategoryID: [1, 3], Discontinued: true }
     *
     * Para combo/dropdown: devuelve el .value del FilterItem (no el objeto entero).
     * Para multi: devuelve un array de .value.
     * Para el resto: devuelve el valor primitivo directamente.
     */
    public currentValues: Signal<FilterValues> = computed(() => {
        return this.filtersData.reduce((acc, f) => {
            if (!f.value()) {
                return acc;
            }
            if (f.type === 'text' || f.type === 'numeric' || f.type === 'boolean' || f.type === 'date') {
                acc[f.field] = f.value();
            }
            else if (f.props.valuePrimitive) {
                acc[f.field] = f.value();
            }
            else {
                acc[f.field] = Array.isArray(f.value())
                    ? f.value().map((v: any) => v[f.props.valueField || 'value'])
                    : f.value()[f.props.valueField || 'value'];
            }
            return acc;
        }, {} as FilterValues);
    });

    /** Vacia todos los filtros a su valor por defecto */
    public clearFilters(): void {
        this.filtersData.forEach(async f => {
            f.value.set(null);
        });
        this.filtersData.forEach(async f => {
            this.refreshFilter(f.field);
        });
    }

    /**
    * Devuelve el estado público de un filtro por su field.
    * El padre puede leer y mutar directamente value, items, disabled.
    *
    * Ejemplo:
    *   const f = this.seccionFiltros.getFilter('ProductName');
    *   f.value.set('chai');
    *   f.items.set([...]);
    */
    public getFilter(field: string): FilterDescriptor | undefined {
        return this.filtersData.find(s => s.field === field);
    }

    public async refreshFilter(field: string): Promise<void> {
        const dropdown = this.inputMap.get(field);
        if (!dropdown) return;
        await dropdown.reload();
    }

    public setFieldValues(field: string, value: any): void {

        this.filtersData.forEach(f => {

            if (f.field === field) {
                let valueToSet = value;

                if (f.type === 'combo' || f.type === 'dropdown' || f.type === 'multi') {
                    if (f.props.valuePrimitive && value && typeof value === 'object') {
                        if (value.hasOwnProperty(f.props.valueField)) {
                            valueToSet = value[f.props.valueField || 'value'];
                        }
                    }
                }

                f.value.set(valueToSet);
            }
        });

    }
}