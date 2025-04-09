import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {LogoWidget} from './logowidget';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {StyleClassModule} from 'primeng/styleclass';
import {ButtonModule} from 'primeng/button';

@Component({
    selector: 'topbar-widget',
    standalone: true,
    imports: [LogoWidget, CommonModule, StyleClassModule, ButtonModule],
    template: `
        <div #mask [class]="(menu?.classList?.contains('hidden') && menu?.classList?.contains('absolute') ? 'hidden ' : 'block md:hidden ') + ' absolute z-40 top-0 right-0 w-full h-screen'" style="background-color: var(--maskbg)" (click)="hideMenu()"></div>
        <div class="flex items-center justify-between relative lg:static py-12 mx-0 px-6 lg:py-12">
            <a class="cursor-pointer" (click)="router.navigate(['/'])">
                <logo-widget />
            </a>
            <a class="cursor-pointer block md:hidden dark:text-surface-100 text-primary" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-fadein" leaveToClass="hidden" leaveActiveClass="px-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-bars text-4xl"></i>
            </a>

            <ul
                #menu
                id="menu"
                style="top: 0px; right: 0%"
                class="list-none flex-grow-1 justify-end hidden md:flex absolute md:relative h-screen md:h-auto dark:md:bg-surface-950 bg-surface-0 md:!bg-transparent dark:bg-surface-900 m-0 z-50 w-full sm:w-6/12 md:w-full py-12 md:py-0"
            >
                <a
                    class="cursor-pointer block md:hidden dark:text-surface-100 text-primary absolute"
                    style="top: 3rem; right: 2rem"
                    pStyleClass="#menu"
                    enterFromClass="hidden"
                    enterActiveClass="animate-scalein"
                    leaveToClass="hidden"
                    leaveActiveClass="animate-fadeout"
                    [hideOnOutsideClick]="true"
                >
                    <i class="pi pi-times text-4xl"></i>
                </a>

                <li class="mt-8 md:mt-0">
                    <a
                        (click)="scrollToElement('home')"
                        pStyleClass="@grandparent"
                        enterFromClass="hidden"
                        enterActiveClass="animate-fadein"
                        leaveToClass="hidden"
                        class="flex m-0 md:ml-8 md:px-0 px-4 py-4 text-surface-900 dark:text-surface-0 font-medium leading-normal hover:text-primary cursor-pointer"
                    >
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a
                        (click)="scrollToElement('features')"
                        pStyleClass="@grandparent"
                        enterFromClass="hidden"
                        enterActiveClass="animate-fadein"
                        leaveToClass="hidden"
                        class="flex m-0 md:ml-8 md:px-0 px-4 py-4 text-surface-900 dark:text-surface-0 font-medium leading-normal hover:text-primary cursor-pointer"
                    >
                        <span>Features</span>
                    </a>
                </li>
                <li>
                    <a
                        (click)="scrollToElement('customizations')"
                        pStyleClass="@grandparent"
                        enterFromClass="hidden"
                        enterActiveClass="animate-fadein"
                        leaveToClass="hidden"
                        class="flex m-0 md:ml-8 md:px-0 px-4 py-4 text-surface-900 dark:text-surface-0 font-medium leading-normal hover:text-primary cursor-pointer"
                    >
                        <span>Customizations</span>
                    </a>
                </li>
                <li>
                    <a
                        (click)="scrollToElement('apps')"
                        pStyleClass="@grandparent"
                        enterFromClass="hidden"
                        enterActiveClass="animate-fadein"
                        leaveToClass="hidden"
                        class="flex m-0 md:ml-8 md:px-0 px-4 py-4 text-surface-900 dark:text-surface-0 font-medium leading-normal hover:text-primary cursor-pointer"
                    >
                        <span>Apps</span>
                    </a>
                </li>
                <li>
                    <a
                        (click)="scrollToElement('pricing')"
                        pStyleClass="@grandparent"
                        enterFromClass="hidden"
                        enterActiveClass="animate-fadein"
                        leaveToClass="hidden"
                        class="flex m-0 md:ml-8 md:px-0 px-4 py-4 text-surface-900 dark:text-surface-0 font-medium leading-normal hover:text-primary cursor-pointer"
                    >
                        <span>Pricing</span>
                    </a>
                </li>
                <li class="flex items-center">
                    <button pButton type="button" pStyleClass="@grandparent" enterFromClass="hidden" enterActiveClass="animate-fadein" leaveToClass="hidden" label="Buy Now" class="m-0 mt-4 md:mt-0 ml-4 md:ml-8"></button>
                </li>
            </ul>
        </div>
    `
})
export class TopbarWidget {
    @ViewChild('menu') menu!: ElementRef<HTMLUListElement>;

    @ViewChild('mask') mask!: ElementRef<HTMLElement>;

    router = inject(Router);

    scrollToElement(id: string) {
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        },150)
    }

    hideMenu() {
        this.menu.nativeElement.classList.add('hidden');
        this.mask.nativeElement.classList.add('hidden')
    }
}
