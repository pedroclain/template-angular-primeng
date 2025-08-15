import { Component, inject } from '@angular/core';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Table, TableColumn } from '../../shared/components/table';
import { Toast } from '../../shared/components/toast';
import { ToastService } from '../../shared/services/toast';
import { Dialog } from '../../shared/components/dialog';
import { Popup } from '../../shared/components/popup';
import { PopupService } from '../../shared/services/popup';

@Component({
  selector: 'app-home',
  imports: [Button, Input, Table, Toast, Dialog, Popup, ReactiveFormsModule],
  providers: [ToastService, PopupService],
  standalone: true,
  templateUrl: './home.html',
})
export class Home {
  toastService = inject(ToastService);
  popupService = inject(PopupService);

  visible = false;
  control = new FormControl('', [Validators.required]);
  rows = [
    {
      name: 'Pedro Xavier',
      email: 'email@email.com',
    },
    {
      name: 'Maria Silva',
      email: 'm@email.com',
    },
  ];
  columns: TableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
  ];

  clickSuccess() {
    this.toastService.showSuccess('Sucesso', this.control.value!);
  }

  clickFailure() {
    this.toastService.showFailure('Erro', 'Ocorreu um erro!');
  }

  toggleDialog() {
    this.visible = !this.visible;
  }

  confirm(event: Event) {
    this.popupService.confirm(event, 'Você confirma essa ação?', () => {
      this.toastService.showSuccess('Confirmado', 'Ação confirmada com sucesso!');
    });
  }
}
