import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ChartModule } from 'primeng/chart';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '@/layout/service/layout.service';

@Component({
    selector: 'money-flow-widget',
    standalone: true,
    imports: [FormsModule, SelectModule, ChartModule],
    template: `<div class="card">
        <div class="card-header gap-4">
            <div class="card-title">
                <div class="font-semibold mb-2">Money Flow</div>
                <p class="subtitle">
                    Your <b>{{ selectedDate.name }}</b> Income & Expenses data.
                </p>
            </div>
            <p-select [options]="dateRanges" [(ngModel)]="selectedDate" placeholder="Monthly" optionLabel="name" [showClear]="false" styleClass="w-9rem" (onChange)="onDateChangeBarChart()"></p-select>
        </div>
        <p-chart type="bar" height="540" [data]="chartData" [options]="chartOptions"></p-chart>
    </div>`
})
export class MoneyFlowWidget implements OnInit, OnDestroy {
    //chart data
    chartData: any; //main chart Data
    chartOptions: any; //main chart options

    // dropdown date ranges
    dateRanges: any[] = []; // for main chart
    selectedDate: any;

    //config subscription
    subscription: Subscription;

    constructor(private layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(50)).subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        //dropdown date ranges
        this.dateRanges = [
            { name: 'Daily', code: 'DAY' },
            { name: 'Weekly', code: 'WEEK' },
            { name: 'Monthly', code: 'MONTH' }
        ];

        this.selectedDate = this.dateRanges[2];

        this.initChart();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Income',
                    data: [8000, 8100, 5600, 5500, 4000, 6500, 5900, 8000, 8100, 5600, 5500, 4000],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--p-green-300'),
                    tension: 0.4,
                    borderWidth: 2,
                    backgroundColor: '#4caf5061',
                    borderRadius: 6
                },
                {
                    label: 'Expenses',
                    data: [1200, 5100, 6200, 3300, 2100, 6200, 4500, 1200, 5100, 6200, 3300, 2100],
                    borderColor: documentStyle.getPropertyValue('--p-red-300'),
                    backgroundColor: '#ff3d3238',
                    tension: 0.4,
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        };

        this.chartOptions = {
            animation: {
                duration: 0
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        boxHeight: 15,
                        pointStyleWidth: 17,
                        padding: 14
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

    onDateChangeBarChart() {
        const documentStyle = getComputedStyle(document.documentElement);

        const monthlyData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Income',
                    data: [8000, 8100, 5600, 5500, 4000, 6500, 5900, 8000, 8100, 5600, 5500, 4000],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--p-green-300'),
                    tension: 0.4,
                    borderWidth: 2,
                    backgroundColor: '#4caf5061',
                    borderRadius: 6
                },
                {
                    label: 'Expenses',
                    data: [1200, 5100, 6200, 3300, 2100, 6200, 4500, 1200, 5100, 6200, 3300, 2100],
                    borderColor: documentStyle.getPropertyValue('--p-red-300'),
                    backgroundColor: '#ff3d3238',
                    tension: 0.4,
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        };

        const dailyData = {
            labels: [
                'Day 1',
                'Day 2',
                'Day 3',
                'Day 4',
                'Day 5',
                'Day 6',
                'Day 7',
                'Day 8',
                'Day 9',
                'Day 10',
                'Day 11',
                'Day 12',
                'Day 13',
                'Day 14',
                'Day 15',
                'Day 16',
                'Day 17',
                'Day 18',
                'Day 19',
                'Day 20',
                'Day 21',
                'Day 22',
                'Day 23',
                'Day 24',
                'Day 25',
                'Day 26',
                'Day 27',
                'Day 28',
                'Day 29',
                'Day 30'
            ],
            datasets: [
                {
                    label: 'Income',
                    data: [100, 200, 150, 50, 75, 150, 200, 250, 300, 400, 350, 500, 550, 700, 600, 650, 550, 450, 350, 300, 250, 200, 150, 100, 50, 75, 150, 200, 250],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--p-green-300'),
                    tension: 0.4,
                    borderWidth: 2,
                    backgroundColor: '#4caf5061',
                    borderRadius: 6
                },
                {
                    label: 'Expenses',
                    data: [75, 150, 100, 200, 250, 300, 350, 400, 450, 550, 600, 650, 550, 700, 600, 550, 350, 400, 300, 250, 200, 150, 100, 50, 75, 150, 200, 250, 300],
                    borderColor: documentStyle.getPropertyValue('--p-red-300'),
                    backgroundColor: '#ff3d3238',
                    tension: 0.4,
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        };

        const weeklyData = {
            labels: [
                'Week 1',
                'Week 2',
                'Week 3',
                'Week 4',
                'Week 5',
                'Week 6',
                'Week 7',
                'Week 8',
                'Week 9',
                'Week 10',
                'Week 11',
                'Week 12',
                'Week 13',
                'Week 14',
                'Week 15',
                'Week 16',
                'Week 17',
                'Week 18',
                'Week 19',
                'Week 20',
                'Week 21',
                'Week 22',
                'Week 23',
                'Week 24'
            ],
            datasets: [
                {
                    label: 'Income',
                    data: [2500, 2000, 1500, 1000, 500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 6000, 5000, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 500],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--p-green-300'),
                    tension: 0.4,
                    borderWidth: 2,
                    backgroundColor: '#4caf5061',
                    borderRadius: 6
                },
                {
                    label: 'Expenses',
                    data: [1500, 1000, 500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 6000, 5000, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 500, 2000, 2500],
                    borderColor: documentStyle.getPropertyValue('--p-red-300'),
                    backgroundColor: '#ff3d3238',
                    tension: 0.4,
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        };

        let newBarData = { ...this.chartData };
        switch (this.selectedDate.name) {
            case 'Monthly':
                newBarData = monthlyData;
                break;
            case 'Weekly':
                newBarData = weeklyData;
                break;
            case 'Daily':
                newBarData = dailyData;
                break;
            default:
                break;
        }

        this.chartData = newBarData;
    }
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
