import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [MessageService, ConfirmationService],
  template: `
      <router-outlet />
  `,
})
export class App {
}
