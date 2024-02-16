import { Component, inject } from '@angular/core';
import { ShyftApiService } from './shyft-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'angular-app-transaction-section',
  template: `
    <section class="px-5 py-5 bg-white bg-opacity-5 flex flex-col items-center">
      <h1 class="text-2xl mb-10">Transaction history</h1>
      @if (transaction()) {
        <div class="flex flex-col items-center gap-2">
          <div *ngFor="let acc of transaction()!">
            <div class="flex items-center">
              <p class="text-xl">{{ formatDate(acc.timestamp) }}</p>
              <!--  <p class="text-xl">{{ acc.actions.info.sender }}</p>
              <p class="text-xl">{{ acc.actions.info.receiver }}</p>
              <p class="text-xl">{{ acc.actions.info.amount }}</p> -->
            </div>
          </div>
        </div>
      }
    </section>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class TransactionSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly transaction = computedAsync(() =>
    this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
  );

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
