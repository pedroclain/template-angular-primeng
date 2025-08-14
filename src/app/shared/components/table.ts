import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  template: `
    <p-table
      [columns]="columns()"
      [value]="rows()"
      [tableStyle]="{ 'min-width': '50rem' }"
    >
      <ng-template #header let-columns>
        <tr>
          @for (col of columns; track $index) {
          <th>{{ col.header }}</th>
          }
        </tr>
      </ng-template>

      <ng-template #body let-rowData let-columns="columns">
        <tr>
          @for (col of columns; track $index) {
          <td>{{ rowData[col.field] }}</td>
          }
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class Table {
  columns = input<TableColumn[]>([]);
  rows = input<any[]>([]);
}

export interface TableColumn {
  field: string;
  header: string;
}
