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
    'Frontend Engineering',
    'Figma',
    'Accessibility',
    'Maintainability',
    'Leadership',
    'Systems Thinker'
  ];
}
