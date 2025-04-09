import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';

@Component({
    selector: 'my-cards-widget',
    standalone: true,
    imports: [CommonModule, FormsModule, DialogModule, InputTextModule, InputMaskModule, ButtonModule, CarouselModule],
    template: `<p-dialog header="Add New Card" [(visible)]="displayBasic" [modal]="true" styleClass="w-[90vw] lg:w-[50vw]">
            <ng-template #header>
                <div class="block w-8/12">
                    <h2 class="p-0 m-0 mb-4">Add your new card</h2>
                    <p class="p-0 m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolores quasi consequuntur eveniet iure perspiciatis.</p>
                </div>
            </ng-template>
            <div class="flex justify-between flex-wrap md:flex-nowrap items-center gap-16">
                <div class="card-form w-full">
                    <label for="name" class="block">Name on Card</label>
                    <input pInputText class="w-full mb-4" type="text" id="name" [(ngModel)]="cardName" />
                    <label for="cardno" class="block">Card Number</label>
                    <p-input-mask styleClass="w-full mb-4" id="cardno" [(ngModel)]="cardno" mask="9999-9999-9999-9999" [autoClear]="false"></p-input-mask>
                    <div class="flex gap-4">
                        <div class="mb-4 w-6/12 ">
                            <label for="carddate" class="block whitespace-nowrap">Expiry Date</label>
                            <p-input-mask styleClass="w-full" id="carddate" [(ngModel)]="cardDate" [autoClear]="false" mask="99/99"></p-input-mask>
                        </div>
                        <div class="mb-4 w-6/12">
                            <label for="cvv" class="block whitespace-nowrap">Security Code</label>
                            <p-input-mask styleClass="w-full" id="cvv" [(ngModel)]="cvv" [autoClear]="false" mask="999"></p-input-mask>
                        </div>
                    </div>
                </div>

                <div class="px-4 xl:px-8 py-8 w-full rounded-2xl shadow-md" [ngStyle]="{ background: 'linear-gradient(to left bottom, var(--p-primary-100), var(--p-primary-400))', 'min-height': '19rem' }">
                    <div class="mb-8">
                        <img src="/demo/images/logo-freya-single.svg" class="w-8" alt="freya logo" />
                    </div>
                    <div class="mb-4">
                        <h3 class="text-surface-0 dark:text-surface-900" style="letter-spacing: -0.5px; min-height: 2.09rem">{{ cardno }}</h3>
                        <div class="text-surface-0 dark:text-surface-900 flex items-center justify-end">
                            <span class="m-0 text-sm p-0 mr-2">Valid <br />thru</span>
                            <h4 class="m-0 text-surface-0 dark:text-surface-900" style="min-width: 4.1rem">{{ cardDate }}</h4>
                        </div>
                        <h4 class="text-surface-0 dark:text-surface-900" style="min-height: 1.7rem">
                            {{ cardName }}
                        </h4>
                    </div>
                </div>
            </div>
            <ng-template #footer>
                <p-button icon="pi pi-check" label="Save Card" text></p-button>
            </ng-template>
        </p-dialog>

        <div class="card !px-0">
            <div class="card-header gap-4" style="padding: 0 28px 16px">
                <div class="card-title">
                    <span class="font-semibold">My Cards ({{ cards.length }})</span>
                    <p class="subtitle">You can always add more</p>
                </div>
                <p-button icon="pi pi-plus" severity="secondary" text rounded (onClick)="showBasicDialog()"></p-button>
            </div>
            <p-carousel [value]="cards" [numVisible]="1" [numScroll]="1" [circular]="true">
                <ng-template let-card #item>
                    <div class="px-2 pb-2">
                        <div class="px-4 xl:px-8 py-8 w-full rounded-2xl shadow-md" [ngStyle]="{ background: 'linear-gradient(to left bottom, var(--p-primary-100), var(--p-primary-400))' }">
                            <div class="mb-8">
                                <img [src]="card.logo" class="w-2rem" alt="" />
                            </div>
                            <div class="mb-4">
                                <h3 class="text-surface-0 dark:text-surface-900 text-2xl font-semibold" style="letter-spacing: -0.5px">**** **** **** {{ card.cardNo.split('-')[3] }}</h3>
                                <div class="text-surface-0 dark:text-surface-900 flex items-center justify-end">
                                    <span class="m-0 text-sm p-0 mr-2 dark:text-surface-900 my-4">Valid <br />thru</span>
                                    <h4 class="m-0 text-surface-0 dark:text-surface-900 text-xl font-semibold">{{ card.validDate }}</h4>
                                </div>
                                <h4 class="text-surface-0 dark:text-surface-900 text-xl font-semibold">
                                    {{ card.name }}
                                </h4>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-carousel>
        </div>`
})
export class MyCardsWidget {
    displayBasic: boolean = false;

    cardName: any;

    cardno: any;

    cardDate: any;

    cvv: any;

    cards = [
        {
            logo: '/demo/images/logo-freya-single.svg',
            cardNo: '5454-5454-9999-8888',
            validDate: '05/28',
            name: 'John Doe'
        },
        {
            logo: '/demo/images/logo-freya-single.svg',
            cardNo: '5454-5454-9999-7777',
            validDate: '08/26',
            name: 'John Doe'
        }
    ];

    showBasicDialog() {
        this.displayBasic = true;
    }
}
