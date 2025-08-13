import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenu } from './menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, AppMenu, RouterModule],
  template: `<div class="layout-sidebar">
    <app-menu></app-menu>
  </div>`,
})
export class AppSidebar {
  constructor(public el: ElementRef) {}
}
