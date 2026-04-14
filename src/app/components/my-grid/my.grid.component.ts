import { CommonModule } from '@angular/common';
import { Component, computed, Directive, effect, Input, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ControlConfig, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddEvent, CancelEvent, CellClickEvent, CellCloseEvent, CreateFormGroupArgs, DataBindingDirective, EditEvent, EditService, FieldDataType, GridComponent, GridDataResult, KENDO_GRID, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { FilterValues } from '../../models/filter.model';
import { GridColumnDescriptor, GridCompositeFilter, GridSortDescriptor, MyFieldDataType } from '../../models/grid.model';
import { IGridService } from '../../services/abstract-grid.service';
import { BaseEntity } from '../../models/base.model';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { Keys } from '@progress/kendo-angular-common';
import { NumericLabelDirective } from "@progress/kendo-angular-inputs";
import { MyComboBoxComponent } from '../dropdowns/combobox/my-combobox.component';

@Directive({
    selector: "[myDataBinding]",
    standalone: true,
})
export class MyDataBindingDirective<T>
    extends DataBindingDirective
    implements OnInit, OnDestroy {
    @Input({ required: true })
    service!: IGridService<T>;

    private additionalFilters?: FilterValues;
    private lastFetchedData: T[] = [];

    constructor(grid: GridComponent) {
        super(grid);
    }

    public getLastFetchedData(){
        return this.lastFetchedData;
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        this.applyFilter();
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public override async rebind(): Promise<void> {
        this.grid.loading = true;

        // Convierte estado Kendo → tipos propios antes de llamar al servicio
        const sort = this.state.sort as GridSortDescriptor[];
        const filter = this.state.filter as GridCompositeFilter;

        try {
            const data = await this.service.getGridData(
                this.state.skip,
                this.state.take,
                sort,
                filter,
                this.additionalFilters
            );

            // Tenemos que obtener nuevas referencias
            this.lastFetchedData = [...this.cloneData(data.data)];
            this.grid.data = data;
            this.grid.loading = false;
            this.notifyDataChange();
        } catch (error) {
            console.error('Error fetching grid data:', error);
            alert('Error fetching data. Please try again later.');
            this.grid.loading = false;
        }
    }

    public applyFilter(values?: FilterValues): void {
        this.additionalFilters = values;
        this.rebind();
    }

    private cloneData(data: T[]) {
        return data?.map((item) => Object.assign({}, item)) ?? [];
    }
}

@Component({
    selector: 'app-my-grid',
    standalone: true,
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        KENDO_GRID, KENDO_BUTTONS, 
        MyDataBindingDirective,
        MyComboBoxComponent
    ],
    templateUrl: './my.grid.component.html',
    styleUrl: './my.grid.component.css'
})
export class MyGridComponent<T> implements OnInit {
    @Input({ required: true })
    service!: IGridService<T>;

    //@Input()
    //public editService?: MyEditService<T>;

    @Input({ required: true })
    columns!: GridColumnDescriptor[];

    @Input()
    public editable: boolean = false;

    @Input()
    public modelConstructor?: new () => T;

    @Input()
    public controlsConfig?: (item: T) => { [key in keyof T]?: any };

    @Input()
    public pageSize: number = 10;

    @Input()
    public skip: number = 0;

    @Input()
    public sortDescriptor: GridSortDescriptor[] = [];

    @Input()
    public filterDescriptor: GridCompositeFilter = { logic: 'and', filters: [] };

    @ViewChild(MyDataBindingDirective)
    private dataBindingDirective!: MyDataBindingDirective<T>;

    @ViewChild('grid')
    private grid!: GridComponent;

    public formGroup?: FormGroup;


    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        if (this.editable) {

        }
    }

    public createFormGroup(item: T): FormGroup {
        if (this.controlsConfig) {
            this.formGroup = this.formBuilder.group(this.controlsConfig(item));
        }
        else {
            this.formGroup = this.formBuilder.group(this.generateDefaultConfig(item));
        }

        return this.formGroup;
    }


    public getData() {
        return this.grid.data;
    }

    public setData(data: T[] | GridDataResult | null) {
        return this.grid.data = data;
    }


    /**Aplica nuevos filtros en el grid */
    public applyFilters(values?: FilterValues): void {
        this.dataBindingDirective.applyFilter(values);
    }


    public refresh(): void {
        this.dataBindingDirective.rebind();
    }

    // ── Edición incell ────────────────────────────────────────────

    private createdItems = signal<T[]>([]);
    private updatedItems = signal<T[]>([]);
    private deletedItems = signal<T[]>([]);
    public hasChanges = computed(() => {
        return this.deletedItems().length > 0 ||
            this.updatedItems().length > 0 ||
            this.createdItems().length > 0;
    });

    protected editando = false;
    private cellArgs?: CellClickEvent;

    public isNew(item: T): boolean {
        return this.service.getKeys(item).some(key => {
            return key === null || key === undefined || key === 0 || key === '';
        });
    }

    public cellClickHandler(args: CellClickEvent): void {
        this.cellArgs = args;
    }

    public onDblClick(): void {
        if (this.cellArgs && !this.cellArgs.isEdited && !this.editando) {
            this.cellArgs.sender.editCell(
                this.cellArgs.rowIndex,
                this.cellArgs.columnIndex,
                this.createFormGroup(this.cellArgs.dataItem)
            );
            this.editando = true;
        }
    }

    public cellCloseHandler(args: CellCloseEvent): void {
        const { formGroup, dataItem } = args;

        if (!formGroup.valid) {
            // prevent closing the edited cell if there are invalid values.
            args.preventDefault();
            return;
        } else if (formGroup.dirty) {
            if (args.originalEvent && args.originalEvent.keyCode === Keys.Escape) {
                this.editando = false;
                return;
            }
            this.assignValues(dataItem, formGroup.value);
            
            if (!this.isNew(args.dataItem)) {
                const index = this.itemIndex(args.dataItem, this.updatedItems());
                if (index !== -1) {
                    this.updatedItems.update(items => [
                        ...items.slice(0, index),
                        args.dataItem,
                        ...items.slice(index + 1)
                    ]);
                } else {
                    this.updatedItems.update(items => [...items, args.dataItem]);
                }
            } else {
                const index = this.createdItems().indexOf(args.dataItem);
                this.createdItems.update(items => [
                    ...items.slice(0, index),
                    args.dataItem,
                    ...items.slice(index + 1)
                ]);
            }
        }
        this.editando = false;
    }

    public addHandler(args: AddEvent): void {
        if (!this.editando){
            args.sender.addRow(this.createFormGroup(new this.modelConstructor!()));
            this.editando = true;
        }
    }

    public cancelHandler(args: CancelEvent): void {
        args.sender.closeRow(args.rowIndex);
        this.editando = false;
    }

    public saveHandler(args: SaveEvent): void {
        if (args.formGroup.valid) {
            this.createdItems.update(items => [...items, args.dataItem]);
            this.unshiftItem(args.dataItem);
            args.sender.closeRow(args.rowIndex);
            this.editando = false;
        }
    }

    public removeHandler(args: RemoveEvent): void {
        const gridData = this.getData()
        let index = this.itemIndex(args.dataItem, (gridData as any).data ?? gridData);
        this.spliceItem(index);

        index = this.itemIndex(args.dataItem, this.createdItems());
        if (index >= 0) {
            this.createdItems.update(items => [
                ...items.slice(0, index),
                ...items.slice(index + 1)
            ]);
        } else {
            this.deletedItems.update(items => [...items, args.dataItem]);;
        }

        index = this.itemIndex(args.dataItem, this.updatedItems());
        if (index >= 0) {
            this.updatedItems.update(items => [
                ...items.slice(0, index),
                ...items.slice(index + 1)
            ]);
        }

        args.sender.cancelCell();
    }

    public async saveChanges(grid: GridComponent): Promise<void> {
        grid.closeCell();
        grid.cancelCell();

        if (!this.hasChanges()) {
            return;
        }

        this.grid.loading = true;

        try {
            if (this.deletedItems().length) {
                await this.service.deleteAll(this.deletedItems().map(x => this.service.getKeys(x)[0]));
            }

            if (this.updatedItems().length) {
                await this.service.updateAll(this.updatedItems());
            }

            if (this.createdItems().length) {
                await this.service.createAll(this.createdItems());
            }

            this.reset();
            this.refresh();
        }
        catch (error) {
            console.error('Error saving grid data:', error);
            alert('Error saving grid data. Please try again later.');
            this.grid.loading = false;
        }
    }

    public cancelChanges(grid: GridComponent): void {
        grid.cancelCell();
        const originalData = this.dataBindingDirective.getLastFetchedData();
        console.log(originalData)
        
        this.reset();

        if (!this.getData()) {
            return;
        }

        const data = this.getData();
        if (this.isGridDataResult(data)) {
            this.setData({ data: originalData, total: data.total });
        }
        else {
            this.setData(originalData);
        }
    }

    private assignValues(target: any, source: any): void {
        Object.assign(target, source);
    }
    
    private reset() {
        this.deletedItems.set([]);
        this.updatedItems.set([]);
        this.createdItems.set([]);
    }

    private itemIndex(item: T, source: any[] | GridDataResult): number {

        const data: T[] = Array.isArray(source)
            ? source
            : (source as GridDataResult)?.data ?? [];
        const keysItem = this.service.getKeys(item);
        for (let idx = 0; idx < data.length; idx++) {
            const keys1 = this.service.getKeys(data[idx]);
            const iguales = keysItem.length === keys1.length &&
                keysItem.every((val, index) => val === keys1[index]);
            if (iguales) {
                return idx;
            }
        }

        return -1;
    };

    private cloneData(data: T[]) {
        return data?.map((item) => Object.assign({}, item)) ?? [];
    }

    private isGridDataResult(data: any): data is GridDataResult {
        return data && typeof data === 'object' && 'data' in data && 'total' in data;
    }

    private unshiftItem(item: T): void {
        const gridData = this.getData();
        if (!gridData) return;

        if (this.isGridDataResult(gridData)) {
            gridData.data.unshift(item);
            gridData.total++;
            this.setData(gridData);
        } else {
            gridData.unshift(item);
            this.setData(gridData);
        }
    }

    private spliceItem(index: number): void {
        const gridData = this.getData();
        if (!gridData) return;

        if (this.isGridDataResult(gridData)) {
            gridData.data.splice(index, 1);
            gridData.total--;
            this.setData(gridData);
        } else {
            gridData.splice(index, 1);
            this.setData(gridData);
        }
    }

    // Mappers internos (privados, no expuestos)
    protected toKendoSort(sort?: GridSortDescriptor[]): SortDescriptor[] {
        return (sort ?? []) as SortDescriptor[];
    }

    protected toKendoFilter(filter?: GridCompositeFilter): CompositeFilterDescriptor {
        return (filter ?? { logic: 'and', filters: [] }) as CompositeFilterDescriptor;
    }

    protected toKendoFieldType(type: MyFieldDataType): FieldDataType {
        const map: Record<MyFieldDataType, FieldDataType> = {
            text: 'text',
            numeric: 'numeric',
            date: 'date',
            boolean: 'boolean'
        };
        return map[type];
    }

    private generateDefaultConfig(item: any): { [key: string]: any } {
        const config: { [key: string]: any } = {};
        Object.keys(item).forEach(key => {
            config[key] = [item[key]]; // Crea un control simple para cada propiedad
        });
        return config;
    }
}