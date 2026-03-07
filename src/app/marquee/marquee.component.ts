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
    'Clean Components',
    'Design Tokens',
    'Docs That Help',
    'Frontend Fun',
    'Figma',
    'Accessibility',
    'Making It Last',
  ];
}
