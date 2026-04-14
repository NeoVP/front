import { Component, inject, signal, ViewChild } from '@angular/core';
import { MyGridComponent } from '../../components/my-grid/my.grid.component';
import { SeccionFiltrosComponent } from '../../components/seccion-filtros/seccion-filtros.component';
import { BooleanFilterDescriptor, ComboFilterDescriptor, FilterDescriptor, FilterItem, FilterValues, MultiSelectFilterDescriptor, NumericFilterDescriptor } from '../../models/filter.model';
import { GridColumnDescriptor } from '../../models/grid.model';
import { MyInputBooleanConfig, MyNumericTextBoxConfig } from '../../models/inputs.config.model';
import { Product } from '../../services/data.products';
import { CategoryService, ProductService } from '../../services/product.service';
import { Validators } from '@angular/forms';
import { Category } from '../../services/data.categories';

// ─────────────────────────────────────────────
// CASO 1: Pantalla simple, sin slots
// ─────────────────────────────────────────────
@Component({
    selector: 'app-products-simple',
    standalone: true,
    imports: [MyGridComponent, SeccionFiltrosComponent],
    templateUrl: './producto-list.component.html',
})
export class ProductoListadoComponent {
    @ViewChild('grid')
    protected grid!: MyGridComponent<Product>;

    @ViewChild('filtrosListado')
    protected filtrosListado!: SeccionFiltrosComponent;

    protected productService = inject(ProductService);
    protected categoryService = inject(CategoryService);

    public readonly title = 'Listado de Productos';
    
    public ProductDto = Product;


    filterDefs: FilterDescriptor[] = [
        <ComboFilterDescriptor<Product>>{
            value: signal(null),
            field: 'productName',
            label: 'Producto',
            type: 'combo',
            props: {
                field: 'productName',
                valueField: 'productName',
                textField: 'productName',
                getData: async (value?: string) => {
                    const additionalData = this.filtrosListado.currentValues();
                    const items = await this.productService.getGridData(
                        undefined,
                        undefined,
                        undefined,
                        undefined, 
                        additionalData
                    );
                    return items.data;
                },
                onValueChange: async (value: Product | null) => {
                    this.filtrosListado.setFieldValues('productID', []);
                    await this.filtrosListado.refreshFilter('productID');
                    if (value) {
                        this.filtrosListado.setFieldValues('productID', [value]);
                    }
                }
            }
        },
        <MultiSelectFilterDescriptor<Product>>{
            value: signal(null),
            field: 'productID',
            label: 'ProductoIds',
            type: 'multi',
            props: {
                field: 'productID',
                valueField: 'productID',
                textField: 'productID',
                getData: async (value?: string) => {
                    const additionalData = this.filtrosListado.currentValues();
                    const items = await this.productService.getGridData(
                        undefined,
                        undefined,
                        undefined,
                        undefined, 
                        additionalData
                    );
                    return items.data;
                },
                onValueChange: async (value: Product[] | null) => {
                    await this.filtrosListado.setFieldValues('productName', null);
                    await this.filtrosListado.refreshFilter('productName');
                    if (value && value.length > 0) {
                        this.filtrosListado.setFieldValues('productName', value[0]);
                    }
                },
            }
        },
        <NumericFilterDescriptor>{
            value: signal(null),
            field: 'unitPrice',
            label: 'Precio máx.',
            type: 'numeric',
            props: {
                format: 'n2',
                min: 0,
                step: 1
            } as MyNumericTextBoxConfig
        },
        <BooleanFilterDescriptor>{
            value: signal(null),
            field: 'discontinued',
            label: 'Descontinuado',
            type: 'boolean',
            props: {
                disabled: false,
            } as MyInputBooleanConfig
        }
    ];

    columns = [
        {
            field: 'productID',
            title: 'ID',
            type: 'numeric',
            filterable: true,
            sortable: true,
            editable: false
        },
        {
            field: 'productName',
            title: 'Nombre',
            type: 'text',
            filterable: true,
            sortable: true
        },
        {
            field: 'category.categoryName',
            title: 'Categoría',
            type: 'object',
            filterable: true,
            sortable: true,
            customEditor: {
                field: 'category',
                valueField: 'categoryID',
                textField: 'categoryName',
                disabled: true,
                getData: async (value?: string) => {
                    const items = await this.categoryService.getGridData(
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    );
                    return items.data;
                }
            }
        },
        {
            field: 'unitPrice',
            title: 'Precio',
            type: 'numeric',
            format: '{0:c}',
            filterable: true,
            sortable: true
        },
        {
            field: 'unitsInStock',
            title: 'Stock',
            type: 'numeric',
            format: '{0:n2}',
            filterable: true,
            sortable: true
        },
        {
            field: 'discontinued',
            title: 'Descontinuado',
            type: 'boolean',
            filterable: true,
            sortable: true
        },
    ] as GridColumnDescriptor[];

    controlsConfig = (item: Product) => ({
      productID: item.productID,
      productName: [item.productName, Validators.required],
      category: [{value: item.category, disabled: true}, Validators.required],
      unitPrice: {value: item.unitPrice, disabled: true},
      unitsInStock: [
        item.unitsInStock,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]{1,3}"),
        ]),
      ],
      discontinued: item.discontinued,
    })

    protected onSearch(values: FilterValues): void {
        this.grid.applyFilters(values);
    }

}