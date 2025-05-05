import {
  Component,
  ElementRef,
  Inject,
  inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '@/layout/service/layout.service';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { AppSidebar } from './app.sidebar';
import { Popover, PopoverModule } from 'primeng/popover';

@Component({
  selector: '[app-topbar]',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    FormsModule,
    AppSidebar,
    InputText,
    ButtonModule,
    IconField,
    InputIcon,
    PopoverModule,
  ],
  template: `
    <div class="topbar-start">
      <button
        pButton
        #menubutton
        type="button"
        class="topbar-menubutton p-trigger duration-300"
        (click)="onMenuButtonClick()"
      >
        <i class="pi pi-bars"></i>
      </button>
    </div>
    <div class="layout-topbar-menu-section">
      <div app-sidebar></div>
    </div>
    <div class="topbar-end">
      <ul class="topbar-menu">
        <li>
          <p-iconfield>
            <p-inputicon class="pi pi-search" />
            <input
              pInputText
              type="text"
              placeholder="Szukaj"
              class="w-48 sm:w-full"
            />
          </p-iconfield>
        </li>
        <li>
          <p-button
            icon="pi pi-user"
            [rounded]="true"
            severity="info"
            [outlined]="true"
            (click)="op.toggle($event)"
          />
          <p-popover #op>
            <div class="flex flex-col gap-4">
              <ul class="list-none p-0 m-0 flex flex-col">
                <li
                  class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
                >
                  Ustawienia
                </li>
                <li
                  class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
                >
                  Zamówienia
                </li>
                <li
                  class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
                >
                  Wyloguj
                </li>
              </ul>
            </div>
          </p-popover>
        </li>
      </ul>
    </div>
  `,
  host: {
    class: 'layout-topbar',
  },
})
export class AppTopbar {
  isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  layoutService = inject(LayoutService);

  el = inject(ElementRef);

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild(AppSidebar) appSidebar!: AppSidebar;

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onConfigButtonClick() {
    this.layoutService.toggleConfigSidebar();
  }

  onRightMenuButtonClick() {
    this.layoutService.showRightMenu();
  }

  onTopbarItemClick() {
    if (this.isBrowser) {
      document.body.click();
    }
  }
}
