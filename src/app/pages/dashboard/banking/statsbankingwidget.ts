import { Component } from '@angular/core';

@Component({
    selector: 'stats-banking-widget',
    standalone: true,
    template: `
        <div class="flex-1">
            <div class="card !bg-surface-0 dark:!bg-surface-900 text-surface-700 dark:text-surface-100 flex justify-between pt-6 h-full">
                <div class="overview-info">
                    <div class="m-0 mb-1 font-semibold text-lg">Total Balance</div>
                    <div class="m-0 text-4xl font-semibold">$3879.76</div>
                </div>
                <i class="pi pi-dollar !text-3xl"></i>
            </div>
        </div>
        <div class="flex-1">
            <div class="card !bg-orange-300 text-white flex justify-between pt-6 h-full">
                <div class="overview-info">
                    <div class="m-0 mb-1 text-white font-semibold text-l">Total Spending</div>
                    <div class="m-0 text-white text-4xl font-semibold">$843.64</div>
                </div>
                <i class="pi pi-dollar !text-3xl"></i>
            </div>
        </div>
        <div class="flex-1">
            <div class="card !bg-blue-300 text-white flex justify-between pt-6 h-full">
                <div class="overview-info">
                    <div class="m-0 mb-1 text-white font-semibold text-l">Subscriptions</div>
                    <div class="m-0 text-white text-4xl font-semibold">$126.82</div>
                </div>
                <i class="pi pi-dollar !text-3xl"></i>
            </div>
        </div>
    `,
    host: {
        class: 'flex flex-wrap gap-8'
    }
})
export class StatsBankingWidget {}
