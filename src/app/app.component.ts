import { Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { FeacturesSectionComponent } from './feactures-section.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HdWalletMultiButtonComponent,
    MatAnchor,
    FeacturesSectionComponent,
  ],
  selector: 'angular-app-root',
  template: `
    <header class="py-8 relative">
      <h1 class="text-5xl text-center mb-5">My Wallet</h1>

      <div class="flex justify-center mb-5">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      <nav>
        <ul class="flex justify-center items-center gap-4">
          <li>
            <a [routerLink]="['']" mat-raised-button>Home</a>
          </li>
          <li>
            <a [routerLink]="['balance']" mat-raised-button>Balance</a>
          </li>
          <li>
            <a [routerLink]="['settings']" mat-raised-button>Settings</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer class="fixed bottom-0 left-0 w-full text-white p-4">
      <angular-app-feactures-section></angular-app-feactures-section>
    </footer>
  `,
})
export class AppComponent {}
