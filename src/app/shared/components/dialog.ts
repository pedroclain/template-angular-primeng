import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  template: ` <p-dialog
    [header]="title()"
    [modal]="true"
    [visible]="visible()"
    (visibleChange)="visibleChange.emit($event)"
    [style]="{ width: '25rem' }"
  >
    <ng-content></ng-content>
  </p-dialog>`,
})
export class Dialog {
  title = input<string>();

  visible = input(false);
  visibleChange = output<boolean>();
}
