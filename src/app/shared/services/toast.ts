import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  messageService = inject(MessageService);

  showSuccess(title: string, message: string) {
    this.messageService.add({ severity: 'success', summary: title, detail: message, life: 3000 });
  }

  showFailure(title: string, message: string) {
    this.messageService.add({ severity: 'error', summary: title, detail: message, life: 3000 });
  }
}
