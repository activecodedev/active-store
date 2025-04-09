import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {RippleModule} from 'primeng/ripple';

@Component({
    selector: 'customizations-widget',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, DialogModule, RippleModule],
    template: `
        <div id="customizations" class="landing-section px-6 md:px-20 py-20 mt-20">
            <div class="section-top flex w-full flex-col gap-12 items-center justify-center mb-12">
                <span class="block font-normal text-6xl sm:text-7xl xl:text-8xl text-surface-900 dark:text-surface-0">Make it Your Own </span>
                <h4 class="lg:w-8/12 font-normal text-surface-900 dark:text-surface-0 m-0 mb-12 text-center leading-normal" style="letter-spacing: 0.6px">
                    Take control of your dashboard with FREYA. Make it your own with customizations to suit your business needs. Get creative and elevate your operations with FREYA's Config feature. <br /><b class="font-medium">Try it now!</b>
                </h4>
            </div>
            <div class="video relative" style="max-width: 62rem; margin: 0 auto">
                <img src="/images/landing/image-3.png" class="w-full rounded-3xl mb-6" alt="" />
                <button pButton pRipple icon="pi pi-play !text-8xl !ml-4" (click)="showModalDialog()" class="!absolute !top-1/2 !right-1/2 !text-3xl" rounded style="margin-right: -5rem; margin-top: -5rem; height: 10rem; width: 10rem"></button>
            </div>
            <p-dialog contentStyle="flex-grow: 1" header="Video Content" [(visible)]="displayModal" [modal]="true" [style]="{ width: '80vw', height: '45vw' }" [draggable]="false" [resizable]="false">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/4aGGsCn7oKA?si=diUsSPT2Ec0b2V4c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </p-dialog>
        </div>
    `
})
export class CustomizationsWidget {
    displayModal: boolean = false;

    showModalDialog() {
        this.displayModal = true;
    }
}
