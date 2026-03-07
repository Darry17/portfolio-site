// src/app/about/about.component.ts
import { Component } from '@angular/core';
import { RevealDirective } from '../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  tags = [
    'Systems-level thinking',
    'Token-based architecture',
    'Figma-to-code fidelity',
    'Technical documentation',
    'Cross-functional collaboration',
    'Accessibility (A11y) standards',
    'Version control & contribution workflows',
  ];
}