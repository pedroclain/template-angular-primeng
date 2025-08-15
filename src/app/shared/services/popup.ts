import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonSeverity } from 'primeng/button';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  confirmationService = inject(ConfirmationService);

  confirm(event: Event, question: string, onConfirm: () => void, confirmColor: ButtonSeverity = 'primary') {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: question,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirmar',
        severity: confirmColor,
      },
      accept: onConfirm,
    });
  }

}
