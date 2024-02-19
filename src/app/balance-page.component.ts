import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';

@Component({
  selector: 'angular-app-balance-page',
  template: ` <angular-app-balance-section></angular-app-balance-section> `,
  standalone: true,
  imports: [BalanceSectionComponent],
})
export class BalancePageComponent {}
