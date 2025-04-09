import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';

@Component({
    selector: 'upgrade-widget',
    standalone: true,
    imports: [ButtonModule],
    template: `
        <div class="card h-full flex items-center justify-start !p-8 !bg-gradient-to-b !from-primary-100 !to-primary-400">
            <div class="flex flex-col">
                <span class="m-0 mb-6 w-9/12 font-bold text-3xl text-surface-900">Upgrade to premium banking!</span>
                <span class="m-0 mb-12 w-10/12 font-semibold text-2xl text-surface-700">Lightning-fast transactions, no fees, and exclusive discounts from top brands!</span>
                <p-button icon="pi pi-wallet" type="button" label="Upgrade Now" size="large" styleClass="w-full"></p-button>
            </div>
        </div>
    `
})
export class UpgradeWidget {}
