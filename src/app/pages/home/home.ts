import { Component } from '@angular/core';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Table, TableColumn } from '../../shared/components/table';

@Component({
  selector: 'app-home',
  imports: [Button, Input, Table, ReactiveFormsModule],
  templateUrl: './home.html',
})
export class Home {
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

  click() {
    console.log('Button clicked!');
  }
}
