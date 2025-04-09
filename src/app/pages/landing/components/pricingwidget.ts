import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    standalone: true,
    selector: 'pricing-widget',
    imports: [ButtonModule, RippleModule],
    template: `
        <div id="pricing" class="landing-section px-6 md:px-20 py-20 mt-20">
            <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20 bg-no-repeat bg-cover bg-gradient-to-b from-primary-50 to-surface-0 dark:from-primary-950 dark:to-surface-900" style="border-radius: 24px">
                <div class="flex flex-wrap items-center">
                    <div class="w-full lg:w-6/12 lg:pr-20">
                        <div class="text-surface-900 dark:text-surface-0 font-normal text-6xl sm:text-7xl xl:text-8xl mb-6">Pricing</div>
                        <h4 class="text-surface-900 dark:text-surface-0 font-normal mb-6 lg:mb-0 leading-normal" style="letter-spacing: 0.6px">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velitnumquam eligendi quos.</h4>
                    </div>
                    <div class="w-full md:w-6/12 lg:w-3/12">
                        <ul class="list-none p-0 m-0">
                            <li class="flex items-center mb-6">
                                <i class="pi pi-check text-primary-500 mr-4"></i>
                                <span class="text-xl">Arcu vitae elementum</span>
                            </li>
                            <li class="flex items-center mb-6">
                                <i class="pi pi-check text-primary-500 mr-4"></i>
                                <span class="text-xl">Dui faucibus in ornare</span>
                            </li>
                            <li class="flex items-center mb-6">
                                <i class="pi pi-check text-primary-500 mr-4"></i>
                                <span class="text-xl">Morbi tincidunt augue</span>
                            </li>
                        </ul>
                    </div>
                    <div class="w-full md:w-6/12 lg:w-3/12 md:pl-8">
                        <ul class="list-none p-0 m-0">
                            <li class="flex items-center mb-6">
                                <i class="pi pi-check text-primary-500 mr-4"></i>
                                <span class="text-xl">Duis ultricies lacus sed</span>
                            </li>
                            <li class="flex items-center mb-6">
                                <i class="pi pi-check text-primary-500 mr-4"></i>
                                <span class="text-xl">Imperdiet proin</span>
                            </li>
                            <li class="flex items-center mb-6">
                                <i class="pi pi-check text-primary-500 mr-4"></i>
                                <span class="text-xl">Nisi scelerisque</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flex flex-wrap mt-8 -mx-4">
                    <div class="w-full lg:w-4/12 p-4">
                        <div class="p-6 h-full bg-surface-0 dark:bg-surface-900" style="border-radius: 24px">
                            <div class="font-medium text-xl mb-8 text-surface-900 dark:text-surface-0">Free Forever</div>
                            <div class="font-bold text-5xl mb-8 text-surface-900 dark:text-surface-0">Free</div>
                            <button pButton label="Create Account" icon="pi pi-arrow-right" iconPos="right" size="large" class="lg:w-full font-medium p-2" outlined></button>
                            <p class="text-sm leading-normal mb-0 mt-8 leading-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                    <div class="w-full lg:w-4/12 p-4">
                        <div class="p-6 h-full bg-surface-0 dark:bg-surface-900" style="border-radius: 24px">
                            <div class="font-medium text-xl mb-8 text-surface-900 dark:text-surface-0">Monthly</div>
                            <div class="flex items-center mb-8">
                                <span class="text-surface-900 dark:text-surface-0 font-bold text-5xl">$29</span>
                                <span class="font-medium text-surface-500 dark:text-surface-300 ml-2">per month</span>
                            </div>
                            <button pButton label="Proceed Monthly" icon="pi pi-arrow-right" iconPos="right" size="large" class="lg:w-full font-medium p-2"></button>
                            <p class="text-sm leading-normal mb-0 mt-8">Nec ultrices dui sapien eget. Amet nulla facilisi morbi tempus.</p>
                        </div>
                    </div>
                    <div class="w-full lg:w-4/12 p-4">
                        <div class="p-6 h-full flex flex-col bg-surface-0 dark:bg-surface-900" style="border-radius: 24px">
                            <div class="flex flex-row justify-between mb-8 items-center">
                                <div class="text-surface-900 dark:text-surface-0 text-xl font-medium">Yearly</div>
                                <span class="500 text-green-500 font-semibold px-2 py-1 rounded" style="background-color: rgba(76, 175, 80, 0.1)">🎉 Save 20%</span>
                            </div>
                            <div class="flex items-center mb-8">
                                <span class="text-surface-900 dark:text-surface-0 font-bold text-5xl">$275</span>
                                <span class="font-medium text-surface-500 dark:text-surface-300 ml-2">per year</span>
                            </div>
                            <button pButton label="Proceed Yearly" icon="pi pi-arrow-right" iconPos="right" size="large" class="lg:w-full font-medium p-2"></button>
                            <p class="text-sm leading-normal mb-0 mt-8">Placerat in egestas erat imperdiet sed euismod nisi porta.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class PricingWidget {}
