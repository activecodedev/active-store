import { DataService } from '@/services/data.service';
import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PopoverModule } from 'primeng/popover';
import { Observable } from 'rxjs';

interface Item {
  name: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule, PopoverModule, IconFieldModule, InputIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  dataService = inject(DataService);

  ngOnInit() {
    // this.dataService.createRobot('robot');
    this.dataService.getMessage().subscribe((data) => {
      console.log('data', data);
    });
  }
}
