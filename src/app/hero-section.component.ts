import { Component } from '@angular/core';

@Component({
  selector: 'angular-app-hero-section',
  template: `
    <section class="px-24 py-40 bg-white bg-opacity-5">
      <p class="text-center text-3xl">This is the Hero</p>
    </section>
  `,
  standalone: true,
})
export class HeroSectionComponent {}
