import { Component, computed, input, output } from '@angular/core';
import { ButtonModule, ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  template: `<p-button [icon]="_icon()" [label]="label()" (onClick)="onClick.emit($event)" [severity]="color()" />`,
})
export class Button {
  label = input<string>();
  color = input<ButtonSeverity>("primary");
  icon = input<string | undefined>();

  _icon = computed(() => this.icon() ? `pi pi-${this.icon()}` : undefined);

  onClick = output<Event>();
}
