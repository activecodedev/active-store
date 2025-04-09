import {Component, inject, OnInit} from '@angular/core';
import {PopoverModule} from 'primeng/popover';
import {ButtonModule} from 'primeng/button';
import {ChartModule} from 'primeng/chart';
import {TooltipModule} from 'primeng/tooltip';
import {LayoutService} from '@/layout/service/layout.service';
import {debounceTime} from 'rxjs';

@Component({
    selector: 'welcome-widget',
    standalone: true,
    imports: [PopoverModule, ButtonModule, ChartModule, TooltipModule],
    template: `
        <div class="flex flex-col sm:flex-row items-center gap-6">
            <div class="flex flex-col sm:flex-row items-center gap-4 pb-2">
                <img src="/demo/images/avatar/amyelsner.png" class="w-12 h-12 flex-shrink-0" />
                <div class="flex flex-col items-center sm:items-start">
                    <span class="text-surface-800 dark:text-surface-50 text-2xl font-medium m-0 mb-1">Welcome Amy</span>
                    <p class="text-surface-600 dark:text-surface-200 m-0">Your last login was on 01/02/2023 at 10:24 am</p>
                </div>
            </div>
            <div class="flex flex-wrap gap-2 sm:ml-auto justify-center">
                <div class="exchnage-rates flex">
                    <div class="flex items-center p-2 cursor-pointer hover:bg-surface-0 dark:hover:bg-surface-900 rounded duration-200" (click)="op.toggle($event)">
                        <i class="pi pi-angle-up text-green-500 mr-1"></i>
                        <i class="pi pi-dollar"></i> <span>1.32</span>
                    </div>
                    <p-popover appendTo="body" #op [style]="{ width: '300px' }">
                        <h5 class="font-medium m-0 mb-1">USD to EUR</h5>
                        <p class="m-0 p-0 mb-4">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. <a class="ml-1">more detail <i class="pi pi-arrow-up" style="transform: rotate(45deg)"></i></a>
                        </p>

                        <p-chart type="bar" height="180" [data]="usdChartData" [options]="chartOptions"></p-chart>
                    </p-popover>
                    <div class="flex items-center p-2 cursor-pointer hover:bg-surface-0 dark:hover:bg-surface-900 rounded duration-200" (click)="op2.toggle($event)">
                        <i class="pi pi-angle-down mr-1" style="color: #ff6e49"></i>
                        <i class="pi pi-fw pi-bitcoin"></i> <span>60,000</span>
                    </div>
                    <p-popover appendTo="body" #op2 [style]="{ width: '300px' }">
                        <h5 class="font-medium m-0 mb-1">BTC to USD</h5>
                        <p class="m-0 p-0 mb-4">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. <a class="ml-1">more detail <i class="pi pi-arrow-up" style="transform: rotate(45deg)"></i></a>
                        </p>

                        <p-chart type="bar" height="180" [data]="btcChartData" [options]="chartOptions"></p-chart>
                    </p-popover>
                    <div class="flex items-center p-2 cursor-pointer hover:bg-surface-0 dark:hover:bg-surface-900 rounded duration-200" (click)="op3.toggle($event)">
                        <i class="pi pi-angle-up text-green-500 mr-1"></i>
                        <i class="pi pi-pound"></i> <span>1.60</span>
                    </div>
                    <p-popover appendTo="body" #op3 [style]="{ width: '300px' }">
                        <h5 class="font-medium m-0 mb-1">GBP to USD</h5>
                        <p class="m-0 p-0 mb-4">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. <a class="ml-1">more detail <i class="pi pi-arrow-up" style="transform: rotate(45deg)"></i></a>
                        </p>

                        <p-chart type="bar" height="180" [data]="poundChartData" [options]="chartOptions"></p-chart>
                    </p-popover>
                </div>
                <div class="flex gap-2">
                    <p-button pTooltip="Exchange" tooltipPosition="bottom" icon="pi pi-arrows-h" styleClass="flex-shrink-0" rounded outlined></p-button>
                    <p-button pTooltip="Withdraw" tooltipPosition="bottom" icon="pi pi-download" styleClass="flex-shrink-0" rounded outlined></p-button>
                    <p-button pTooltip="Send" tooltipPosition="bottom" icon="pi pi-send" styleClass="flex-shrink-0" rounded></p-button>
                </div>
            </div>
        </div>
    `
})
export class WelcomeWidget implements OnInit {
    layoutService = inject(LayoutService);

    usdChartData: any;

    btcChartData: any;

    poundChartData: any;

    chartOptions: any;

    subscription: any;

    constructor() {
        this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(50)).subscribe((config) => {
            this.initCharts();
        });
    }

    ngOnInit() {
        this.initCharts();
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        //currency charts on top right
        this.usdChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Euro to US Dollar',
                    backgroundColor: documentStyle.getPropertyValue('--primary-light-color'),
                    borderColor: documentStyle.getPropertyValue('--primary-light-color'),
                    data: [1.1, 1.12, 1.15, 1.18, 1.2, 1.25, 1.3],
                    barThickness: 10
                }
            ]
        };

        this.btcChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Bitcoin to US Dollar',
                    backgroundColor: documentStyle.getPropertyValue('--primary-light-color'),
                    borderColor: documentStyle.getPropertyValue('--primary-light-color'),
                    data: [35000, 40000, 45000, 55000, 60000, 65000, 60000],
                    barThickness: 10
                }
            ]
        };

        this.poundChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'GBP to US Dollar',
                    backgroundColor: documentStyle.getPropertyValue('--primary-light-color'),
                    borderColor: documentStyle.getPropertyValue('--primary-light-color'),
                    data: [1.3, 1.35, 1.4, 1.45, 1.5, 1.55, 1.6],
                    barThickness: 10
                }
            ]
        };

        //bar chart options
        this.chartOptions = {
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        boxHeight: 15,
                        pointStyleWidth: 17,
                        padding: 14
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context: any) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ':';
                            }

                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }
}
