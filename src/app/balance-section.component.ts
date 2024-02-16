import { Component, inject } from '@angular/core';
import { ShyftApiService } from './shyft-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { WalletStore } from '@heavy-duty/wallet-adapter';

@Component({
  selector: 'angular-app-balance-section',
  template: `
    <section
      class="px-24 py-32 bg-white bg-opacity-5 flex flex-col items-center"
    >
      <h1 class="text-3xl mb-10">Balance</h1>
      @if (account()) {
        <div class="flex flex-col items-center gap-2">
          <img [src]="account()?.info?.image" class="flex w-10 h-10" />
          <div class="flex items-center">
            <p class="text-xl">{{ account()?.info?.name }} :</p>
            <p class="text-xl ml-5">{{ account()?.balance }}</p>
          </div>
        </div>
      }
    </section>
  `,
  standalone: true,
})
export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
  );
}
