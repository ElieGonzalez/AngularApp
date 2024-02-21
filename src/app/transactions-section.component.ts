import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { injectPublicKey } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'angular-app-transactions-section',
  imports: [MatTableModule, MatCard],
  standalone: true,
  template: `
    <mat-card
      class="max-w-full sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-8 overflow-auto"
    >
      <h2 class="text-center text-3xl mb-4 break-all">
        Historial de Transacciones
      </h2>

      @if (!transactions()) {
        <p class="text-center">Conecta tu wallet para ver las transacciones.</p>
      } @else if (transactions()?.length === 0) {
        <p class="text-center">No hay transacciones disponibles.</p>
      } @else {
        <div class="overflow-auto">
          <table mat-table [dataSource]="transactions() ?? []">
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let element" class="truncate break-all">
                {{ element.type }}
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let element" class="truncate break-all">
                {{ element.status }}
              </td>
            </ng-container>

            <ng-container matColumnDef="timestamp">
              <th mat-header-cell *matHeaderCellDef>Timestamp</th>
              <td mat-cell *matCellDef="let element" class="truncate break-all">
                {{ formatDate(element.timestamp) }}
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </div>
      }
    </mat-card>
  `,
})
export class TransactionsSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly displayedColumns = ['type', 'status', 'timestamp'];
  readonly transactions = computedAsync(() =>
    this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
  );

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
