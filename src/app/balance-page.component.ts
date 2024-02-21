import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';
import { TransactionsSectionComponent } from './transactions-section.component';

@Component({
  selector: 'angular-app-balance-page',
  template: `
    <div class="flex flex-col sm:flex-row justify-center gap-4">
      <div class="balance-section mb-4 sm:mb-0">
        <angular-app-balance-section></angular-app-balance-section>
      </div>
      <div class="transaction-section">
        <angular-app-transactions-section></angular-app-transactions-section>
      </div>
    </div>
  `,
  standalone: true,
  imports: [BalanceSectionComponent, TransactionsSectionComponent],
})
export class BalancePageComponent {}
