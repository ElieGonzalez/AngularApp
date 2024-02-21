import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { injectPublicKey } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { FeacturesSectionComponent } from './feactures-section.component';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    HdWalletMultiButtonComponent,
    FeacturesSectionComponent,
  ],
  selector: 'angular-app-root',
  template: `
    <div class="flex flex-col min-h-screen">
      <header class="pb-4 pt-16 relative text-white">
        <h1 class="text-5xl text-center mb-4">Hi, I'm your Wallet.</h1>

        <div class="flex justify-center absolute top-4 right-4">
          <hd-wallet-multi-button></hd-wallet-multi-button>
        </div>

        @if (balance()) {
          <div
            class="flex justify-center items-center gap-2 absolute top-4 left-4"
          >
            <img src="assets/solana-logo.png" class="w-8 h-8" />
            <p class="font-bold">{{ balance()?.balance }}</p>
          </div>
        }
      </header>

      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>

      <footer class=" text-white p-4">
        <angular-app-feactures-section></angular-app-feactures-section>
      </footer>
    </div>
  `,
})
export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly balance = computedAsync(() =>
    this._shyftApiService.getBalance(this._publicKey()?.toBase58()),
  );
}
