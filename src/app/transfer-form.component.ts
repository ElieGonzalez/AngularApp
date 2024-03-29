import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface TransferFormModel {
  memo: string | null;
  receiverAddress: string | null;
  amount: number | null;
}

export interface TransferFormPayload {
  memo: string;
  receiverAddress: string;
  amount: number;
}

@Component({
  selector: 'angular-app-transfer-form',
  template: `
    <form
      class="flex flex-col items-center w-full px-4"
      #form="ngForm"
      (ngSubmit)="onSubmit(form)"
    >
      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Concepto</mat-label>
        <input
          name="memo"
          matInput
          placeholder="Ejemplo: Pagar el recibo de luz."
          type="text"
          [(ngModel)]="model.memo"
          #memoControl="ngModel"
          required
          [disabled]="disabled()"
        />
        <mat-icon matSuffix>description</mat-icon>

        @if (form.submitted && memoControl.errors) {
          <mat-error>
            @if (memoControl.errors['required']) {
              El motivo es obligatorio.
            }
          </mat-error>
        } @else {
          <mat-hint>Debe ser el motivo de la transferencia.</mat-hint>
        }
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Destino</mat-label>
        <input
          name="receiverAddress"
          matInput
          placeholder="Public Key de la cuenta destino."
          type="text"
          [(ngModel)]="model.receiverAddress"
          #receiverAddressControl="ngModel"
          required
          [disabled]="disabled()"
        />
        <mat-icon matSuffix>key</mat-icon>

        @if (form.submitted && receiverAddressControl.errors) {
          <mat-error>
            @if (receiverAddressControl.errors['required']) {
              El destino es obligatorio.
            }
          </mat-error>
        } @else {
          <mat-hint>Debe ser el motivo de la transferencia.</mat-hint>
        }
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Monto</mat-label>
        <input
          name="amount"
          matInput
          placeholder="Ingresa el monto acá"
          type="number"
          min="0"
          [(ngModel)]="model.amount"
          #amountControl="ngModel"
          required
          [disabled]="disabled()"
        />
        <mat-icon matSuffix>attach_money</mat-icon>

        @if (form.submitted && amountControl.errors) {
          <mat-error>
            @if (amountControl.errors['required']) {
              El monto es obligatorio.
            } @else if (amountControl.errors['min']) {
              El monto debe ser mayor a cero.
            }
          </mat-error>
        } @else {
          <mat-hint>Debe ser un monto mayor a cero.</mat-hint>
        }
      </mat-form-field>

      <footer class="flex justify-center gap-4 w-full">
        <button
          type="submit"
          mat-raised-button
          color="primary"
          [disabled]="disabled()"
        >
          Enviar
        </button>
        <button
          type="button"
          mat-raised-button
          color="warn"
          (click)="onCancel()"
          [disabled]="disabled()"
        >
          Cancelar
        </button>
      </footer>
    </form>
  `,
  standalone: true,
  imports: [FormsModule, MatButton, MatFormFieldModule, MatInput, MatIcon],
})
export class TransferFormComponent {
  private readonly _matSnackBar = inject(MatSnackBar);

  readonly disabled = input<boolean>(false);
  @Output() readonly sendTransfer = new EventEmitter<TransferFormPayload>();
  @Output() readonly cancelTransfer = new EventEmitter();

  readonly model: TransferFormModel = {
    memo: null,
    receiverAddress: null,
    amount: null,
  };

  onSubmit(form: NgForm) {
    if (
      form.invalid ||
      this.model.memo === null ||
      this.model.receiverAddress === null ||
      this.model.amount === null
    ) {
      this._matSnackBar.open('⚠️ El formulario es inválido.', 'Cerrar', {
        duration: 4000,
        horizontalPosition: 'end',
      });
    } else {
      this.sendTransfer.emit({
        amount: this.model.amount,
        receiverAddress: this.model.receiverAddress,
        memo: this.model.memo,
      });
    }
  }

  onCancel() {
    this.cancelTransfer.emit();
  }
}
