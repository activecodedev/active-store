import {
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { AppMenu } from './app.menu';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutService } from '@/layout/service/layout.service';

@Component({
  selector: '[app-sidebar]',
  standalone: true,
  imports: [CommonModule, AppMenu, RouterModule],
  template: ` <div class="sidebar-header">
      <a [routerLink]="['/']" class="app-logo cursor-pointer">
        <img src="/layout/logos/racoon-white.svg" class="app-logo-normal" />

        <img src="/layout/logos/racoon-white.svg" class="app-logo-single h-8" />
      </a>
      <button
        class="layout-sidebar-anchor z-20 w-4 h-4"
        type="button"
        (click)="onAnchorToggle()"
      ></button>
    </div>
    <div app-menu></div>`,
  host: {
    class: 'layout-sidebar',
  },
})
export class AppSidebar {
  el = inject(ElementRef);

  layoutService = inject(LayoutService);

  @ViewChild(AppMenu) appMenu!: AppMenu;

  timeout: any;

  onAnchorToggle() {
    this.layoutService.layoutState.update((val) => ({
      ...val,
      anchored: !val.anchored,
    }));
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.layoutService.layoutState().anchored) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.layoutService.layoutState.update((val) => ({
        ...val,
        sidebarActive: true,
      }));
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.layoutService.layoutState().anchored) {
      if (!this.timeout) {
        this.timeout = setTimeout(() => {
          this.layoutService.layoutState.update((val) => ({
            ...val,
            sidebarActive: false,
          }));
        }, 300);
      }
    }
  }
}
