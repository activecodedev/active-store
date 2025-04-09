import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { HeroWidget } from './components/herowidget';
import { FeaturesWidget } from './components/featureswidget';
import { PricingWidget } from './components/pricingwidget';
import { FooterWidget } from './components/footerwidget';
import { AppConfigurator } from '@/layout/components/app.configurator';
import { ScrollTop } from 'primeng/scrolltop';
import { CustomizationsWidget } from '@/pages/landing/components/customizationswidget';
import { AppsWidget } from '@/pages/landing/components/appswidget';
import { TopbarWidget } from '@/pages/landing/components/topbarwidget';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, RippleModule, StyleClassModule, ButtonModule, DividerModule, HeroWidget, FeaturesWidget, PricingWidget, FooterWidget, AppConfigurator, ScrollTop, TopbarWidget, CustomizationsWidget, AppsWidget, TopbarWidget],
    template: ` <div [class]="(menu?.classList?.contains('hidden') && menu?.classList?.contains('absolute') ? 'h-auto ' : 'overflow-hidden h-screen  md:h-auto ') + 'landing-wrapper'">
            <topbar-widget />
            <hero-widget />
            <features-widget />
            <customizations-widget />
            <apps-widget />
            <pricing-widget />
            <footer-widget />
        </div>
        <p-scroll-top />
        <app-configurator [simple]="true" />`
})
export class Landing {
    get menu() {
        return document.getElementById('menu');
    }
}
