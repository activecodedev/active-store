import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuitem } from '@/layout/components/app.menuitem';

interface MenuItem {
  label?: string;
  icon?: string;
  routerLink?: string[];
  url?: string[];
  target?: '_blank' | '_self' | '_parent' | '_top';
  routerLinkActiveOptions?: { [key: string]: any };
  items?: MenuItem[];
  separator?: boolean;
  visible?: boolean;
  disabled?: boolean;
  command?: (event?: any) => void;
  class?: string;
  style?: string;
  styleClass?: string;
  id?: string;
  urlTarget?: '_blank' | '_self' | '_parent' | '_top';
}

@Component({
  selector: '[app-menu]',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: ` <ul class="layout-menu" #menuContainer>
    <ng-container *ngFor="let item of model; let i = index">
      <li
        app-menuitem
        *ngIf="!item.separator"
        [item]="item"
        [index]="i"
        [root]="true"
      ></li>
      <li *ngIf="item.separator" class="menu-separator"></li>
    </ng-container>
  </ul>`,
  host: {
    class: 'layout-menu-container',
  },
})
export class AppMenu {
  el: ElementRef = inject(ElementRef);

  @ViewChild('menuContainer') menuContainer!: ElementRef;

  model: MenuItem[] = [
    {
      label: 'Strona główna',
      icon: 'pi pi-home',
      routerLink: ['/'],
    },
  ];
}
