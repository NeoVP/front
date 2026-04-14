import { CommonModule } from '@angular/common';
import { Component, Input, model } from '@angular/core';
import { DateTimePickerComponent, KENDO_DATETIMEPICKER } from '@progress/kendo-angular-dateinputs';
import { MyDateTimePickerConfig } from '../../../models/inputs.config.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-my-datetime-picker',
    standalone: true,
    imports: [CommonModule, KENDO_DATETIMEPICKER, DateTimePickerComponent, FormsModule],
    templateUrl: './my-datetime-picker.component.html',
})
export class MyDateTimePickerComponent {
    @Input() set config(config: MyDateTimePickerConfig) {
        this._config = this.initializeConfig(config);
    }

    value = model<Date | null>(null);

    private _config!: MyDateTimePickerConfig;
    get config(): MyDateTimePickerConfig {
        return this._config;
    }

    protected initializeConfig(config: MyDateTimePickerConfig): MyDateTimePickerConfig {
        return {
            ...this.defaultConfig(),
            ...config
        } as MyDateTimePickerConfig;
    }
    protected defaultConfig(): Partial<MyDateTimePickerConfig> {
        return {
            value: null,
            min: new Date(1900, 0, 1),
            max: new Date(9999, 11, 31),
            format: 'dd/MM/yyyy',
            disabled: false,
            placeholder: ''
        } as Partial<MyDateTimePickerConfig>;
    };

    protected onValueChange(value: Date | null): void {
        this.config.onValueChange?.(value);
    }

    protected onFocus(): void {
        this.config.onFocus?.();
    }

    protected onBlur(): void {
        this.config.onBlur?.();
    }
}