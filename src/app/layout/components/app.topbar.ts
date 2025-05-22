import {
  Component,
  ElementRef,
  Inject,
  inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule, isPlatformBrowser } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '@/layout/service/layout.service';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { AppSidebar } from './app.sidebar';
import { PopoverModule } from 'primeng/popover';
import { AuthService } from '@/auth/auth.service';

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
    AsyncPipe,
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
                @if (!(this.authService.authStatus$ | async)?.isAuthenticated){
                <li
                  [routerLink]="['/auth/login']"
                  class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
                >
                  Logowanie
                </li>
                <li
                  [routerLink]="['/auth/register']"
                  class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
                >
                  Rejestracja
                </li>
                } @else {
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
                  (click)="onLogoutButtonClick()"
                  class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
                >
                  Wyloguj
                </li>
                }
              </ul>
            </div>
          </p-popover>
        </li>
        <li>
          <button
            pButton
            type="button"
            icon="pi pi-cog"
            class="flex-shrink-0 !rounded-xl !w-8 !h-8"
            (click)="onConfigButtonClick()"
          ></button>
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
  layoutService = inject(LayoutService);
  el = inject(ElementRef);
  authService = inject(AuthService);
  router = inject(Router);
  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild(AppSidebar) appSidebar!: AppSidebar;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

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
    document.body.click();
  }

  onLogoutButtonClick() {
    this.authService.logout(true);
    this.router.navigateByUrl('/');
  }
}
