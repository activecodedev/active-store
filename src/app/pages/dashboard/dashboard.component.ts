import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule, PopoverModule, IconFieldModule, InputIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
