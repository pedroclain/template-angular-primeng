import { Component, inject } from '@angular/core';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageChangeEvent, Table, TableColumn } from '../../shared/components/table';
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
  columns: TableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
  ];
  allRows = [
    { name: 'Pedro Xavier', email: 'pedro.xavier@email.com' },
    { name: 'Maria Souza', email: 'maria.souza@email.com' },
    { name: 'João Pereira', email: 'joao.pereira@email.com' },
    { name: 'Ana Lima', email: 'ana.lima@email.com' },
    { name: 'Carlos Santos', email: 'carlos.santos@email.com' },
  ];

  rows = this.allRows;

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
      this.toastService.showSuccess(
        'Confirmado',
        'Ação confirmada com sucesso!'
      );
    });
  }

  pageChange(event: PageChangeEvent) {
    this.rows = this.allRows.slice(event.page, event.page + event.pageSize);
  }
}
