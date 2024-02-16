import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';
import { TransactionSectionComponent } from './transaction-section.component';

@Component({
  selector: 'angular-app-balance-page',
  template: `
    <div class="flex-container">
      <div class="balance-section   ">
        <angular-app-balance-section></angular-app-balance-section>
      </div>
      <div class="transaction-section ">
        <angular-app-transaction-section></angular-app-transaction-section>
      </div>
    </div>
  `,
  standalone: true,
  imports: [BalanceSectionComponent, TransactionSectionComponent],
})
export class BalancePageComponent {}
