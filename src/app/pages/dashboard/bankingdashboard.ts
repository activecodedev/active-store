import { Component } from '@angular/core';
import { MessageWidget } from './messagewidget';
import { WelcomeWidget } from './banking/welcomewidget';
import { StatsBankingWidget } from './banking/statsbankingwidget';
import { MoneyFlowWidget } from './banking/moneyflowwidget';
import { MyCardsWidget } from './banking/mycardswidget';
import { QuickActionsWidget } from './banking/quickactionswidget';
import { TransactionsWidget } from './banking/transactionswidget';
import { AllExpensesWidget } from './banking/allexpenseswidget';
import { UpgradeWidget } from './banking/upgradewidget';

@Component({
    standalone: true,
    selector: 'dashboard-banking',
    imports: [MessageWidget, WelcomeWidget, StatsBankingWidget, MoneyFlowWidget, MyCardsWidget, QuickActionsWidget, TransactionsWidget, AllExpensesWidget, UpgradeWidget],
    template: ` <div class="grid grid-cols-12 gap-8 px-6">
        <div class="col-span-12">
            <message-widget />
        </div>
        <div class="col-span-12">
            <welcome-widget />
        </div>
        <div class="col-span-12 xl:col-span-8 flex flex-col gap-8">
            <stats-banking-widget />
            <money-flow-widget />
        </div>
        <div class="col-span-12 xl:col-span-4 flex flex-col gap-8">
            <my-cards-widget />
            <quick-actions-widget />
        </div>
        <div class="col-span-12 xl:col-span-6">
            <transactions-widget />
        </div>
        <div class="col-span-12 sm:col-span-6 xl:col-span-3">
            <all-expenses-widget />
        </div>
        <div class="col-span-12 sm:col-span-6 xl:col-span-3">
            <upgrade-widget />
        </div>
    </div>`
})
export class BankingDashboard {}
