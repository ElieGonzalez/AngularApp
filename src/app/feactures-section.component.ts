import { Component } from '@angular/core';

@Component({
  selector: 'angular-app-feactures-section',
  template: `
    <section class="p-10">
      <ul class="flex justify-center items-center gap-4 text-2xl">
        <li>Fast</li>
        <li>Efective</li>
        <li>Safe</li>
      </ul>
    </section>
  `,
  standalone: true,
})
export class FeacturesSectionComponent {}
