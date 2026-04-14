import { CommonModule } from '@angular/common';
import { Component, Host, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { MyDropDownConfig } from '../../../models/inputs.config.model';
import { SelectBaseComponent } from '../select-base.component';
import { SeccionFiltrosProvider } from '../../seccion-filtros/seccion-filtros.provider';

@Component({
    selector: 'app-my-dropdown',
    standalone: true,
    imports: [CommonModule, KENDO_DROPDOWNLIST, FormsModule],
    templateUrl: './my-dropdown.component.html',
})
export class MyDropDownComponent<T> extends SelectBaseComponent<T, MyDropDownConfig> {
    protected override defaultConfig(): Partial<MyDropDownConfig<T>> {
        return {
            ...super.defaultConfig(),
        } as Partial<MyDropDownConfig<T>>;
    }

    protected override initializeConfig(value: MyDropDownConfig<T>): MyDropDownConfig<T> {
        return {
            ...this.defaultConfig(),
            ...value
        } as MyDropDownConfig<T>;
    }
}