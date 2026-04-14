import { CommonModule } from '@angular/common';
import { Component, Host, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KENDO_MULTISELECT } from '@progress/kendo-angular-dropdowns';
import { MyMultiSelectConfig } from '../../../models/inputs.config.model';
import { SelectBaseComponent } from '../select-base.component';
import { SeccionFiltrosProvider } from '../../seccion-filtros/seccion-filtros.provider';

@Component({
    selector: 'app-my-multiselect',
    standalone: true,
    imports: [CommonModule, KENDO_MULTISELECT, FormsModule ],
    templateUrl: './my-multiselect.component.html',
})
export class MyMultiSelectComponent<T> extends SelectBaseComponent<T[], MyMultiSelectConfig<T>> {
    protected override defaultConfig(): Partial<MyMultiSelectConfig<T>> {
        return {
            ...super.defaultConfig(),
            autoClose: false,
            allowCustom: false,
        } as Partial<MyMultiSelectConfig<T>>;
    }
    
    protected override initializeConfig(value: MyMultiSelectConfig<T>): MyMultiSelectConfig<T> {
        return {
            ...this.defaultConfig(),
            ...value
        } as MyMultiSelectConfig<T>;
    }
}