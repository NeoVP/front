import { CommonModule } from '@angular/common';
import { Component, ExistingProvider, forwardRef, Host, Input, Optional, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { KENDO_COMBOBOX } from '@progress/kendo-angular-dropdowns';
import { MyComboBoxConfig } from '../../../models/inputs.config.model';
import { SelectBaseComponent } from '../select-base.component';
import { SeccionFiltrosProvider } from '../../seccion-filtros/seccion-filtros.provider';

const DROPDOWN_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MyComboBoxComponent),
    multi: true
};

@Component({
    selector: 'app-my-combobox',
    standalone: true,
    imports: [CommonModule, KENDO_COMBOBOX, FormsModule, ReactiveFormsModule],
    providers: [DROPDOWN_VALUE_ACCESSOR],
    templateUrl: './my-combobox.component.html',
})
export class MyComboBoxComponent<T> extends SelectBaseComponent<T, MyComboBoxConfig<T>> {
    @Input() formControl?: FormControl;

    // Funciones "placeholder" que Angular sobreescribirá
    private onChange = (_: any) => {};
    private onTouched = () => {};

    // 1. Angular llama a esto cuando el valor cambia DESDE FUERA (el Grid o el TS)
    writeValue(obj: any): void {
        this.value.set(obj); // Actualizamos nuestro Signal interno
    }

    // 2. Registramos la función que avisará al exterior cuando el usuario toque el combo
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    // 3. Método para manejar el cambio interno del Kendo Combo
    protected handleValueChange(val: any): void {
        this.value.set(val);      // 1. Actualizamos el Signal (UI interna)
        this.onChange(val);       // 2. Notificamos al FormControl (Grid/Formulario)
        this.onTouched();         // 3. Marcamos como "tocado" para validaciones
        this.onValueChange(val);  // 4. Ejecutamos tu lógica base (config.onValueChange)
    }
    
    protected override defaultConfig(): Partial<MyComboBoxConfig<T>> {
        return {
            ...super.defaultConfig(),
            allowCustom: false
        } as Partial<MyComboBoxConfig<T>>;
    }

    protected override initializeConfig(value: MyComboBoxConfig<T>): MyComboBoxConfig<T> {
        return {
            ...this.defaultConfig(),
            ...value
        } as MyComboBoxConfig<T>;
    }

}