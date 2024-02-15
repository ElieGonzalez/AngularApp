import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section.component';
import { FeacturesSectionComponent } from './feactures-section.component';

@Component({
  selector: 'angular-app-home-page',
  template: `
  <angular-app-hero-section></angular-app-hero-section>
  <angular-app-feactures-section></angular-app-feactures-section>
  `,
  standalone: true,
  imports: [HeroSectionComponent, FeacturesSectionComponent]
})
export class HomePageComponent {}
