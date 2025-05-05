import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from './layout/service/layout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  private layoutService = inject(LayoutService);
  layoutConfig = this.layoutService.layoutConfig();

  constructor() {
    if (this.layoutConfig) {
      this.layoutConfig.darkTheme = true;
      this.layoutConfig.menuMode = 'horizontal';
      this.layoutConfig.primary = 'sky';
      this.layoutConfig.menuTheme = 'dark';
    }
  }
}
