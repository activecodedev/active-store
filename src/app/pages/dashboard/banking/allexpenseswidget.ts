import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '@/layout/service/layout.service';

@Component({
    selector: 'all-expenses-widget',
    imports: [SelectModule, ChartModule, FormsModule],
    template: `<div class="card h-full">
        <div class="card-header flex flex-wrap xl:flex-nowrap gap-3">
            <div class="card-title">
                <div class="font-semibold mb-2">All Expenses</div>
                <p class="subtitle">
                    Your <b>{{ selectedDate.name }}</b> Expenses data.
                </p>
            </div>
            <p-select [options]="dateRanges" [(ngModel)]="selectedDate" optionLabel="name" [showClear]="false" (onChange)="onDateChangePieChart()" styleClass="w-full min-w-[6rem]"></p-select>
        </div>
        <p-chart type="doughnut" [data]="pieData" [options]="pieOptions" height="300px"></p-chart>
    </div>`,
    standalone: true
})
export class AllExpensesWidget implements OnInit, OnDestroy {
    //pie data for expenses
    pieData: any;

    pieOptions: any;

    dateRanges: any[] = []; // for pie chart

    selectedDate: any = { name: 'Last 30 Days', code: '30day' };

    //config subscription
    subscription: Subscription;

    constructor(private layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(50)).subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.dateRanges = [
            { name: 'Last 7 Days', code: '7day' },
            { name: 'Last 30 Days', code: '30day' },
            { name: 'Last 90 Days', code: '90day' }
        ];

        this.initChart();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        //pie data and options
        this.pieData = {
            labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
            datasets: [
                {
                    data: [300, 50, 100, 80],
                    backgroundColor: [documentStyle.getPropertyValue('--p-primary-300'), documentStyle.getPropertyValue('--p-orange-300'), documentStyle.getPropertyValue('--p-green-300'), documentStyle.getPropertyValue('--p-cyan-300')],
                    borderColor: surfaceBorder
                }
            ]
        };

        this.pieOptions = {
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 14,
                        boxHeight: 15,
                        pointStyleWidth: 17
                    },
                    position: 'bottom'
                }
            }
        };
    }

    onDateChangePieChart() {
        const documentStyle = getComputedStyle(document.documentElement);

        const last30Data = {
            labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
            datasets: [
                {
                    data: [300, 50, 100, 80],
                    backgroundColor: [documentStyle.getPropertyValue('--p-primary-300'), documentStyle.getPropertyValue('--p-orange-300'), documentStyle.getPropertyValue('--p-green-300'), documentStyle.getPropertyValue('--p-cyan-300')]
                }
            ]
        };

        const last7Data = {
            labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
            datasets: [
                {
                    data: [450, 50, 200, 120],
                    backgroundColor: [documentStyle.getPropertyValue('--p-primary-300'), documentStyle.getPropertyValue('--p-orange-300'), documentStyle.getPropertyValue('--p-green-300'), documentStyle.getPropertyValue('--p-cyan-300')]
                }
            ]
        };

        const last90Data = {
            labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
            datasets: [
                {
                    data: [30, 200, 150, 20],
                    backgroundColor: [documentStyle.getPropertyValue('--p-primary-300'), documentStyle.getPropertyValue('--p-orange-300'), documentStyle.getPropertyValue('--p-green-300'), documentStyle.getPropertyValue('--p-cyan-300')]
                }
            ]
        };

        let newPieData = { ...this.pieData };
        switch (this.selectedDate.code) {
            case '7day':
                newPieData = last7Data;
                break;
            case '30day':
                newPieData = last30Data;
                break;
            case '90day':
                newPieData = last90Data;
                break;
            default:
                break;
        }

        this.pieData = newPieData;
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
