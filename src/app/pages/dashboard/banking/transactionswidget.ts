import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {Table, TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'transactions-widget',
    standalone: true,
    imports: [CommonModule, FormsModule, MenuModule, IconFieldModule, InputIconModule, InputTextModule, TableModule, ButtonModule],
    template: `
        <div class="card h-full w-full">
            <div class="card-header gap-4 flex-wrap md:flex-nowrap">
                <div class="card-title">
                    <div class="font-semibold mb-2">Transactions</div>
                    <p class="subtitle">
                        Your <b>{{ selectedDate.name }}</b> Income & Expenses data.
                    </p>
                </div>
                <div class="inline-flex items-center w-full md:w-auto">
                    <p-icon-field class="flex-auto">
                        <p-inputicon class="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search" class="w-full" style="border-radius: 2rem" />
                    </p-icon-field>
                    <p-button icon="pi pi-upload" styleClass="mx-4 flex-shrink-0" rounded></p-button>
                </div>
            </div>
            <p-table #dt [value]="transactions" [paginator]="true" [rows]="3" responsiveLayout="scroll" [globalFilterFields]="['name', 'category', 'inventoryStatus']">
                <ng-template #header>
                    <tr>
                        <th style="min-width: 4rem"></th>
                        <th style="min-width: 12rem" class="white-space-nowrap">Name</th>
                        <th style="min-width: 10rem" class="white-space-nowrap">Action</th>
                        <th style="min-width: 12rem" class="white-space-nowrap">Account&User No</th>
                        <th style="min-width: 8rem" class="white-space-nowrap">Amount</th>
                        <th></th>
                    </tr>
                </ng-template>
                <ng-template #body let-transaction>
                    <tr>
                        <td>
                            <img *ngIf="transaction.image.length > 0; else noImage" class="w-8 h-8 rounded-full mt-2" [src]="transaction.image" alt="transactions" />
                            <ng-template #noImage>
                                <span class="w-8 h-8 rounded-full flex justify-content-center align-items-center uppercase font-medium surface-100 mt-2">
                                    {{ transaction.name[0] }}
                                </span>
                            </ng-template>
                        </td>

                        <td>{{ transaction.name }}</td>
                        <td>{{ transaction.action }}</td>
                        <td>{{ transaction.accountNo }}</td>
                        <td>
                            <span class="rounded-xl p-1 w-16 text-center block font-medium" [style]="transaction.amount > 0 ? 'background-color:#8fff493a;' : 'background-color:#ff6e493a;'">{{ transaction.amount }}</span>
                        </td>
                        <td>
                            <p-button icon="pi pi-ellipsis-v" rounded text (onClick)="menu.toggle($event)"></p-button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
            <p-menu #menu popup [model]="items"></p-menu>
        </div>
    `,
})
export class TransactionsWidget {
    dateRanges = [
        { name: 'Daily', code: 'DAY' },
        { name: 'Weekly', code: 'WEEK' },
        { name: 'Monthly', code: 'MONTH' }
    ];

    selectedDate = this.dateRanges[2];

    items: MenuItem[] = [
        {
            icon: 'pi pi-refresh',
            label: 'Re-send or Pay'
        },

        {
            icon: 'pi pi-external-link',
            label: 'Details'
        },
        {
            icon: 'pi pi-download',
            label: 'Download doc'
        }
    ];

    transactions = [
        {
            image: '/demo/images/avatar/amyelsner.png',
            accountNo: '** 4848',
            action: 'Bank Transfer',
            name: 'Amy Elsner',
            amount: 112.0
        },
        {
            image: '/demo/images/avatar/annafali.png',
            accountNo: '** 4848',
            action: 'Bank Transfer',
            name: 'Anna Fali',
            amount: -112.0
        },
        {
            image: '/demo/images/dashboard/brands/netflix-logo.png',
            accountNo: '** 4848',
            action: 'Subscription Payment',
            name: 'Netflix Subscription',
            amount: -48.0
        },
        {
            image: '/demo/images/avatar/ivanmagalhaes.png',
            accountNo: '** 4848',
            action: 'Bank Transfer',
            name: 'Ivan Magalhaes',
            amount: -112.0
        },
        {
            image: '/demo/images/avatar/stephenshaw.png',
            accountNo: '** 4848',
            action: 'Bank Transfer',
            name: 'Stephen Shaw',
            amount: 112.0
        }
    ];

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
