import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section.component';

@Component({
  selector: 'angular-app-home-page',
  template: `
  <angular-app-hero-section></angular-app-hero-section>
  `,
  standalone: true,
  imports: [HeroSectionComponent]
})
export class HomePageComponent {}
