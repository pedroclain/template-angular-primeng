import { Component, input, output } from '@angular/core';
import { ButtonModule, ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  template: `<p-button [label]="label()" (onClick)="clickHandler()" [severity]="color()" />`,
})
export class Button {
  label = input<string>();
  color = input<ButtonSeverity>("primary");

  onClick = output<void>();

  clickHandler() {
    this.onClick.emit();
  }
}
