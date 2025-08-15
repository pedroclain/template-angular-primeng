import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    PasswordModule,
    InputNumberModule,
  ],
  template: `
    @if (type() === "text") {
    <p-floatlabel variant="on">
      <input
        pInputText
        id="on_label"
        [(ngModel)]="value"
        (ngModelChange)="onChange($event)"
        (blur)="onTouched()"
        [invalid]="invalid()"
        [disabled]="disabled()"
        autocomplete="off"
        class="w-full"
      />
      <label for="on_label">{{ label() }}</label>
    </p-floatlabel>
    } @if (type() === "password") {
    <p-floatlabel variant="on">
      <p-password
        [(ngModel)]="value"
        id="on_label"
        (ngModelChange)="onChange($event)"
        (blur)="onTouched()"
        [invalid]="invalid()"
        [disabled]="disabled()"
        [feedback]="false"
        inputStyleClass="w-full"
        class="w-full"
      />
      <label for="on_label">{{ label() }}</label>
    </p-floatlabel>
    } @if (type() === 'decimal' || type() === 'integer' || type() === 'currency') {
    <p-floatlabel variant="on">
      <p-inputnumber
        [mode]="['decimal', 'currency'].includes(type()) ? type() : undefined"
        [minFractionDigits]="type() === 'decimal' ? 2 : undefined"
        [maxFractionDigits]="type() === 'decimal' ? 5 : undefined"
        [currency]="type() === 'currency' ? 'USD' : undefined"
        [showButtons]="true"
        [(ngModel)]="value"
        id="on_label"
        (ngModelChange)="onChange($event)"
        (blur)="onTouched()"
        [invalid]="invalid()"
        [disabled]="disabled()"
        class="w-full"
      />
      <label for="on_label">{{ label() }}</label>
    </p-floatlabel>

    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
})
export class Input implements ControlValueAccessor {
  label = input<string>();
  type = input<
    'text' | 'mask' | 'password' | 'decimal' | 'integer' | 'currency'
  >('text');
  disabled = input<boolean>(false);
  invalid = input<boolean>(false);

  value: string | number = '';

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
