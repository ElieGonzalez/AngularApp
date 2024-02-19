import { Component, inject } from '@angular/core';
import { ShyftApiService } from './shyft-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'angular-app-balance-section',
  template: `
    <section class="px-5 py-5 bg-white bg-opacity-5 flex flex-col items-center">
      <h1 class="text-3xl mb-10">Balance</h1>
      @if (account()) {
        <div class="flex flex-col items-center gap-2">
          <div *ngFor="let acc of account()!">
            <div class="flex items-center">
              <img [src]="acc.info.image" class="w-10 h-10 mr-3" />
              <p class="text-xl">{{ acc.info.name }}: {{ acc.balance }}</p>
            </div>
          </div>
        </div>
      }
    </section>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
  );
}
    