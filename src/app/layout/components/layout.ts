import { Component, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AppTopbar } from './topbar';
import { AppSidebar } from './sidebar';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from '../services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, AppTopbar, AppSidebar],
  styles: [
    `
      .layout-main-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content: space-between;
        padding: 6rem 2rem 0 2rem;
        transition: margin-left var(--layout-section-transition-duration);
      }

      .layout-main {
        flex: 1 1 auto;
        padding-bottom: 2rem;
      }

      img {
        max-width: none !important;
      }

      .layout-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem 0 1rem 0;
        gap: 0.5rem;
        border-top: 1px solid var(--surface-border);
      }
    `,
  ],
  template: `
    <div class="layout-wrapper" [ngClass]="containerClass">
      <app-topbar />
      <app-sidebar />
      <div class="layout-main-container">
        <div class="layout-main">
          <router-outlet></router-outlet>
        </div>
        <div class="layout-footer">
          <span class="text-surface-900 dark:text-surface-0">Template</span>
          <a
            href="https://www.linkedin.com/in/pedro-henrique-11202721a/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary font-bold hover:underline"
            >Pedro Clain</a
          >
        </div>
      </div>
      <div class="layout-mask animate-fadein"></div>
    </div>
  `,
})
export class AppLayout {
  overlayMenuOpenSubscription: Subscription;

  menuOutsideClickListener: any;

  @ViewChild(AppSidebar) sidebar!: AppSidebar;

  @ViewChild(AppTopbar) topBar!: AppTopbar;

  constructor(
    public layoutService: LayoutService,
    public renderer: Renderer2,
    public router: Router
  ) {
    this.overlayMenuOpenSubscription =
      this.layoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this.renderer.listen(
            'document',
            'click',
            (event) => {
              if (this.isOutsideClicked(event)) {
                this.hideMenu();
              }
            }
          );
        }

        if (this.layoutService.layoutState().staticMenuMobileActive) {
          this.blockBodyScroll();
        }
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideMenu();
      });
  }

  isOutsideClicked(event: MouseEvent) {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');
    const eventTarget = event.target as Node;

    return !(
      sidebarEl?.isSameNode(eventTarget) ||
      sidebarEl?.contains(eventTarget) ||
      topbarEl?.isSameNode(eventTarget) ||
      topbarEl?.contains(eventTarget)
    );
  }

  hideMenu() {
    this.layoutService.layoutState.update((prev) => ({
      ...prev,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
    }));
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  blockBodyScroll(): void {
    if (document) {
      if (document.body.classList) {
        document.body.classList.add('blocked-scroll');
      } else {
        document.body.className += ' blocked-scroll';
      }
    }
  }

  unblockBodyScroll(): void {
    if (document) {
      if (document.body.classList) {
        document.body.classList.remove('blocked-scroll');
      } else {
        document.body.className = document.body.className.replace(
          new RegExp(
            '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
            'gi'
          ),
          ' '
        );
      }
    }
  }

  get containerClass() {
    return {
      'layout-overlay':
        this.layoutService.layoutConfig().menuMode === 'overlay',
      'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
      'layout-static-inactive':
        this.layoutService.layoutState().staticMenuDesktopInactive &&
        this.layoutService.layoutConfig().menuMode === 'static',
      'layout-overlay-active':
        this.layoutService.layoutState().overlayMenuActive,
      'layout-mobile-active':
        this.layoutService.layoutState().staticMenuMobileActive,
    };
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
