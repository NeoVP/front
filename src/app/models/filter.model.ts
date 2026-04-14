import { WritableSignal } from "@angular/core";
import {
    MyComboBoxConfig,
    MyDateTimePickerConfig,
    MyDropDownConfig,
    MyInputBooleanConfig,
    MyInputTextConfig,
    MyMultiSelectConfig,
    MyNumericTextBoxConfig
} from "./inputs.config.model";

export type FilterControlType =
    | 'combo'
    | 'multi'
    | 'dropdown'
    | 'text'
    | 'numeric'
    | 'date'
    | 'boolean';

export interface FilterItem<T> {
    value: any;
    text: string;
    data?: T;
}

// ── FilterDescriptor ──────────────────────────────────────────────

interface FilterDescriptorBase<T = any> {
    field: string;
    label: string;
    value: WritableSignal<T | null>;
}

export interface NumericFilterDescriptor extends FilterDescriptorBase<number> {
    type: 'numeric'; props: MyNumericTextBoxConfig;
}
export interface DateFilterDescriptor extends FilterDescriptorBase<Date> {
    type: 'date'; props: MyDateTimePickerConfig;
}
export interface TextFilterDescriptor extends FilterDescriptorBase<string> {
    type: 'text'; props: MyInputTextConfig;
}
export interface BooleanFilterDescriptor extends FilterDescriptorBase<boolean> {
    type: 'boolean'; props: MyInputBooleanConfig;
}
export interface ComboFilterDescriptor<T> extends FilterDescriptorBase<T> {
    type: 'combo'; props: MyComboBoxConfig<T>;
}
export interface DropdownFilterDescriptor<T> extends FilterDescriptorBase<T> {
    type: 'dropdown'; props: MyDropDownConfig<T>;
}
export interface MultiSelectFilterDescriptor<T> extends FilterDescriptorBase<T> {
    type: 'multi'; props: MyMultiSelectConfig<T>;
}

export type FilterDescriptor<T = any> =
    | NumericFilterDescriptor
    | DateFilterDescriptor
    | TextFilterDescriptor
    | BooleanFilterDescriptor
    | ComboFilterDescriptor<T>
    | DropdownFilterDescriptor<T>
    | MultiSelectFilterDescriptor<T>;

/**
 * Objeto plano que devuelve SeccionFiltrosComponent.getValues().
 * { field: value }
 * Ejemplos:
 *   { ProductName: 'chai',  CategoryID: [1, 3],  Discontinued: true }
 * El valor de combo/dropdown es el .value del FilterItem seleccionado.
 * El valor de multi es un array de .value de los FilterItem seleccionados.
 */
export type FilterValues = Record<string, any>;
