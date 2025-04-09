import {Component, inject, model, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SelectModule} from 'primeng/select';
import {TabsModule} from 'primeng/tabs';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputNumberModule} from 'primeng/inputnumber';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

interface Subscription {
    image: string;
    accountNo: string;
    name: string;
    amount: number;
    due: string;
}

interface Account {
    photo: string;
    name: string;
    accountNo: string;
}

interface Card {
    logo: string;
    cardNo: string;
    validDate: string;
    name: string;
}

@Component({
    selector: 'quick-actions-widget',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectModule, ConfirmDialogModule, TabsModule, AutoCompleteModule, InputNumberModule, ButtonModule, InputTextModule],
    template: `<div class="card">
        <div class="card-header gap-4">
            <div class="card-title">
                <div class="font-semibold mb-2">Quick Actions</div>
                <p class="subtitle">Send money or pay your bills.</p>
            </div>
            <p-select [options]="cards()" [(ngModel)]="selectedCard" [placeholder]="selectedCard().cardNo" optionLabel="cardNo" [showClear]="false" styleClass="w-32" panelStyleClass="w-32">
                <ng-template let-card #item>
                    <span class="block">****{{ card.cardNo.split('-')[3] }}</span>
                </ng-template>
            </p-select>
        </div>
        <p-confirmDialog [style]="{ width: '360px' }" [baseZIndex]="10000" rejectButtonStyleClass="p-button-text"></p-confirmDialog>
        <p-tabs value="0">
            <p-tablist>
                <p-tab value="0">Send Money</p-tab>
                <p-tab value="1">Payments</p-tab>
            </p-tablist>
            <p-tabpanels>
                <p-tabpanel value="0">
                    <p-auto-complete styleClass="w-full p-0" [(ngModel)]="selectedAccount" placeholder="Enter Name" [suggestions]="filteredAccounts()" (completeMethod)="filterAccounts($event)" optionLabel="name" [dropdown]="true">
                        <ng-template let-account #item>
                            <div class="name-item flex items-center justify-between">
                                <div class="flex items-center">
                                    <img *ngIf="account.photo.length > 0; else noImage" class="w-8 h-8 rounded-full" [src]="account.photo" alt="account photo" />
                                    <ng-template #noImage>
                                        <span class="w-8 h-8 rounded-full flex justify-center items-center uppercase font-medium surface-100">
                                            {{ account.name[0] }}
                                        </span>
                                    </ng-template>
                                    <div class="ml-2">{{ account.name }}</div>
                                </div>
                                <div>{{ account.accountNo }}</div>
                            </div>
                        </ng-template>
                    </p-auto-complete>
                    <div class="flex flex-wrap md:flex-nowrap items-center my-4 gap-4">
                        <input class="w-full lg:w-8/12" type="text" pInputText [(ngModel)]="accountNo" placeholder="Enter Account No" />
                        <p-input-number [ngClass]="'w-full lg:w-4/12'" inputStyleClass="w-full"  [(ngModel)]="amount" inputId="currency-us" mode="currency" placeholder="$00.00" currency="USD" locale="en-US"></p-input-number>
                    </div>
                    <p-button icon="pi pi-send" type="button" label="Send" styleClass="w-full" outlined (onClick)="confirm1(selectedAccount()?.name ? selectedAccount()?.name : selectedAccount(), amount())"></p-button>
                </p-tabpanel>
                <p-tabpanel value="1">
                    <p-auto-complete
                        styleClass="w-full"
                        [(ngModel)]="selectedSubscription"
                        placeholder="Enter Subscription or Bill Company"
                        [suggestions]="filteredSubscriptions()"
                        (completeMethod)="filterSubscription($event)"
                        optionLabel="name"
                        [dropdown]="true"
                    >
                        <ng-template let-account #item>
                            <div class="name-item flex items-center justify-between">
                                <div class="flex items-center">
                                    <img *ngIf="account.image.length > 0; else noImage" class="w-8 h-8 rounded-full" [src]="account.image" alt="account photo" />
                                    <ng-template #noImage>
                                        <span class="w-8 h-8 rounded-full flex justify-center items-center uppercase font-medium bg-surface-100 dark:bg-surface-700">
                                            {{ account.name[0] }}
                                        </span>
                                    </ng-template>
                                    <div class="ml-2">{{ account.name }}</div>
                                </div>
                                <div class="flex items-center gap-1 ml-2">
                                    <span>$ {{ account.amount }}</span>
                                </div>
                            </div>
                        </ng-template>
                    </p-auto-complete>

                    <div class="flex items-center my-4 gap-4">
                        <input class="w-full lg:w-8/12" type="text" pInputText [(ngModel)]="userNo" placeholder="Enter User No" />
                        <p-input-number [ngClass]="'w-full lg:w-4/12'" inputStyleClass="w-full" [(ngModel)]="currency" inputId="currency-us" placeholder="$00.00" mode="currency" currency="USD" locale="en-US"></p-input-number>
                    </div>
                    <p-button
                        icon="pi pi-wallet"
                        type="button"
                        label="Pay"
                        styleClass="w-full"
                        outlined
                        (onClick)="confirm2(selectedSubscription()?.name ? selectedSubscription()?.name : selectedSubscription(), selectedSubscription() ? selectedSubscription()?.amount : amount())"
                    ></p-button>
                </p-tabpanel>
            </p-tabpanels>
        </p-tabs>
    </div> `,
    providers: [MessageService, ConfirmationService]
})
export class QuickActionsWidget {
    confirmationService = inject(ConfirmationService);

    messageService = inject(MessageService);

    cards = signal<Card[]>([
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
    ]);

    accounts = signal<Account[]>([
        {
            photo: '/demo/images/avatar/amyelsner.png',
            accountNo: '** 4848',
            name: 'Amy Elsner'
        },
        {
            photo: '/demo/images/avatar/annafali.png',
            accountNo: '** 4848',
            name: 'Anna Fali'
        },
        {
            photo: '/demo/images/avatar/bernardodominic.png',
            accountNo: '** 4848',
            name: 'Bernardo Dominic'
        },
        {
            photo: '/demo/images/avatar/ivanmagalhaes.png',
            accountNo: '** 4848',
            name: 'Ivan Magalhaes'
        },
        {
            photo: '/demo/images/avatar/stephenshaw.png',
            accountNo: '** 4848',
            name: 'Stephen Shaw'
        }
    ]);

    selectedCard = model<Card>(this.cards()[0]);

    selectedAccount = model<Account | undefined>(undefined);

    filteredAccounts = signal<Account[] | any[]>([]);

    accountNumber = signal<number | undefined>(undefined);

    amount = signal<any>(0);

    selectedSubscription = signal<Subscription | undefined>(undefined);

    userNo = model(this.selectedSubscription() ? this.selectedSubscription()?.accountNo : this.accountNumber());

    currency = model(this.selectedSubscription() ? this.selectedSubscription()?.amount : this.amount());

    accountNo = model(this.selectedSubscription() ? this.selectedSubscription()?.accountNo : this.accountNumber());

    subscriptions = signal<Subscription[]>([
        {
            image: '',
            accountNo: '548268',
            name: 'Electric Bill',
            amount: 15,
            due: 'close'
        },
        {
            image: '/demo/images/dashboard/brands/hbo-logo.png',
            accountNo: '845152848',
            name: 'TV Subscription',
            amount: 120,
            due: ''
        },
        {
            image: '/demo/images/dashboard/brands/netflix-logo.png',
            accountNo: '659815523',
            name: 'Netflix Subscription',
            amount: 48,
            due: 'close'
        },
        {
            image: '/demo/images/dashboard/brands/harvard-logo.png',
            accountNo: '*6585122',
            name: 'Education Payment',
            amount: 45,
            due: 'late'
        }
    ]);

    filteredSubscriptions = signal<Subscription[] | any[]>([undefined]);

    filterAccounts(event: any) {
        let filtered: Account[] = [];
        let query = event.query;

        for (let i = 0; i < this.accounts().length; i++) {
            let account = this.accounts()[i];
            if (account.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(account);
            }
        }

        this.filteredAccounts.set(filtered);
    }

    filterSubscription(event: any) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < this.subscriptions().length; i++) {
            let country = this.subscriptions()[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredSubscriptions.set(filtered);
    }

    //confirm dialogs for quick actions
    confirm1(name: any, amount: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to send $' + amount + ' to ' + name + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'You sent $' + amount + ' to ' + name
                });
            },
            reject: (type: any) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Rejected',
                            detail: 'Your transaction rejected'
                        });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Cancelled',
                            detail: 'Your transaction canceled'
                        });
                        break;
                }
            }
        });
    }

    confirm2(name: any, amount: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to pay $' + amount + ' for your ' + name + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'You paid $' + amount + ' for your ' + name
                });
            },
            reject: (type: any) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Rejected',
                            detail: 'Your transaction rejected'
                        });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Cancelled',
                            detail: 'Your transaction canceled'
                        });
                        break;
                }
            }
        });
    }
}
