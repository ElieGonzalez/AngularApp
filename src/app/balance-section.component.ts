import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { injectPublicKey } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
import { CommonModule } from '@angular/common';
import { TransferModalComponent } from './transfer-modal.component';

@Component({
  selector: 'angular-app-balance-section',
  imports: [MatTableModule, MatCard, CommonModule, MatButton],
  standalone: true,
  template: `
    <mat-card
      class="w-full sm:w-80 md:w-96 lg:w-96 xl:w-96 px-4 py-8 overflow-auto"
    >
      <h2 class="text-center text-3xl mb-4 break-all">Balance</h2>

      @if (!account()) {
        <p class="text-center">Conecta tu wallet para ver tu balance.</p>
      } @else {
        <div *ngFor="let acc of account()!">
          <div class="flex justify-center items-center gap-2 mb-4">
            <img [src]="acc.info.image" class="w-16 h-16" />
            <p class="text-xl font-bold">
              {{ acc.info.name }}: {{ acc.balance }}
            </p>
          </div>
        </div>

        <footer class="flex justify-center items-center gap-2">
          <button (click)="handleOpen()" mat-raised-button color="primary">
            Transferir
          </button>
        </footer>
      }
    </mat-card>
  `,
})
export class BalanceSectionComponent {
  private readonly _matDialog = inject(MatDialog);
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly account = computedAsync(() =>
    this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
  );

  handleOpen() {
    this._matDialog.open(TransferModalComponent);
  }
}
