import { CommonModule } from '@angular/common';
import { Component, Input, model } from '@angular/core';
import { KENDO_NUMERICTEXTBOX } from '@progress/kendo-angular-inputs';
import { MyNumericTextBoxConfig } from '../../../models/inputs.config.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-my-numeric-textbox',
    standalone: true,
    imports: [CommonModule, KENDO_NUMERICTEXTBOX, FormsModule],
    templateUrl: './my-numeric-textbox.component.html',
})
export class MyNumericTextBoxComponent {
    @Input() set config(config: MyNumericTextBoxConfig) {
        this._config = this.initializeConfig(config);
    }

    value = model<number | null>(null);

    private _config!: MyNumericTextBoxConfig;
    get config(): MyNumericTextBoxConfig {
        return this._config;
    }

    protected initializeConfig(config: MyNumericTextBoxConfig): MyNumericTextBoxConfig {
        return {
            ...this.defaultConfig(),
            ...config
        } as MyNumericTextBoxConfig;
    }
    protected defaultConfig(): Partial<MyNumericTextBoxConfig> {
        return {
            min: Number.MIN_SAFE_INTEGER,
            max: Number.MAX_SAFE_INTEGER,
            step: 1,
            format: 'n2',
            decimals: 2,
            disabled: false,
            readonly: false,
            placeholder: ''
        } as Partial<MyNumericTextBoxConfig>;
    };

    protected onValueChange(value: number | null): void {
        this.config.onValueChange?.(value);
    }

    protected onFocus(): void {
        this.config.onFocus?.();
    }

    protected onBlur(): void {
        this.config.onBlur?.();
    }
}