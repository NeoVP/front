export interface SelectBaseConfig<V = any, I = any> {
    /**Key del componente */
    field: string;
    valuePrimitive?: boolean;
    filterable?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string;
    debounceMs?: number;
    textField?: string;
    valueField?: string;
    getData: (searchText?: string) => Promise<I[]> | I[];
    onValueChange?: (val: V | null) => void;
    onFilterChange?: (val: any) => void;
    onOpen?: () => void;
    onClose?: () => void;
}

export interface MyComboBoxConfig<T = any> extends SelectBaseConfig<T, T> {
    allowCustom?: boolean;
}

export interface MyDropDownConfig<T = any> extends SelectBaseConfig<T, T> {
}

export interface MyMultiSelectConfig<T = any> extends SelectBaseConfig<T[], T> {
    allowCustom?: boolean;
    autoClose?: boolean;
}

export interface MyDateTimePickerConfig {
    min?: Date;
    max?: Date;
    format?: string;
    disabled?: boolean;
    placeholder?: string;
    onValueChange?: (val: any) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export interface MyNumericTextBoxConfig{
    min?: number;
    max?: number;
    step?: number;
    format?: string;
    decimals?: number;
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string;
    onValueChange?: (val: any) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export interface MyInputTextConfig {
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string;
    maxLength?: number;
    onValueChange?: (val: any) => void;
}

export interface MyInputBooleanConfig {
    disabled?: boolean;
    readonly?: boolean;
    onValueChange?: (val: any) => void;
}