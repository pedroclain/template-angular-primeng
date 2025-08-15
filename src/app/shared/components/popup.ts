import { Component } from '@angular/core';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [ConfirmPopupModule],
  template: `<p-confirmpopup /> `,
})
export class Popup {}
