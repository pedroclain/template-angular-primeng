import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  template: `
    <p-table
      [paginator]="true"
      [rows]="pageSize"
      [first]="first"
      lazy="true"
      [showCurrentPageReport]="true"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      (onPage)="pageChange($event)"
      [rowsPerPageOptions]="[10, 20, 50]"
      [columns]="columns()"
      [value]="rows()"
      [tableStyle]="{ 'min-width': '50rem' }"
      [totalRecords]="totalRecords()"
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
  totalRecords = input<number>(0);

  first = 0;
  pageSize = 10;

  onPageChange = output<PageChangeEvent>();

  pageChange(event: TablePageEvent) {
    this.first = event.first;
    this.onPageChange.emit({ page: event.first, pageSize: event.rows });
  }
}
export interface TableColumn {
  field: string;
  header: string;
}
export interface PageChangeEvent {
  page: number;
  pageSize: number;
}
