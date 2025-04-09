import { Component } from '@angular/core';
import { MessageWidget } from './messagewidget';
import { StatsEcommerceWidget } from './ecommerce/statsecommercewidget';
import { WaitingActionWidget } from './ecommerce/waitingactionwidget';
import { SalesByCategoryWidget } from './ecommerce/salesbycategorywidget';
import { ClientsWidget } from './ecommerce/clientswidget';
import { AdManagementWidget } from './ecommerce/admanagementwidget';
import { OrdersWidget } from './ecommerce/orderswidget';

@Component({
  standalone: true,
  selector: 'dashboard-ecommerce',
  imports: [
    MessageWidget,
    StatsEcommerceWidget,
    OrdersWidget,
    WaitingActionWidget,
    SalesByCategoryWidget,
    ClientsWidget,
    AdManagementWidget,
  ],
  template: `<div class="grid grid-cols-12 gap-8 px-6">
    <div class="text-3xl font-bold underline">Hello world!</div>
    <div class="col-span-12">
      <message-widget />
    </div>
    <div class="col-span-12">
      <stats-ecommerce-widget />
    </div>
    <div class="col-span-12 xl:col-span-8">
      <orders-widget />
    </div>
    <div class="col-span-12 xl:col-span-4 grid grid-cols-12 gap-8">
      <waiting-action-widget />
      <sales-by-category-widget />
    </div>
    <div class="col-span-12 xl:col-span-3">
      <clients-widget />
    </div>
    <div class="col-span-12 xl:col-span-9">
      <ad-management-widget />
    </div>
  </div>`,
})
export class EcommerceDashboard {}
