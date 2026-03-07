// src/app/hero/hero.component.ts
import { Component } from '@angular/core';
import { CountUpDirective } from '../shared/directives/count-up.directive';

interface HeroStatConfig {
  end: number;
  suffix: string;
  durationMs?: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CountUpDirective],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  stats: HeroStatConfig[] = [
    { end: 5,   suffix: '+', durationMs: 1200 },
    { end: 3,   suffix: '',  durationMs: 1000 },
    { end: 100, suffix: '+', durationMs: 1400 },
  ];
}