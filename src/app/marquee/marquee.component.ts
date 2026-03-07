import { Component } from '@angular/core';

@Component({
  selector: 'app-marquee',
  standalone: true,
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.scss'],
})
export class MarqueeComponent {
  items = [
    'Design Systems',
    'Component Architecture',
    'Design Tokens',
    'Documentation',
    'Frontend Engineering',
    'Figma',
    'Accessibility',
    'Maintainability',
  ];
}
