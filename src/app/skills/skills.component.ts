import {
  Component,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RevealDirective } from '../shared/directives/reveal.directive';

export interface SkillItem {
  name: string;
  width: number;
}

export interface SkillCategory {
  label: string;
  skills: SkillItem[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements AfterViewInit {
  @ViewChildren('skillBar') skillBarRefs!: QueryList<ElementRef<HTMLElement>>;

  categories: SkillCategory[] = [
    {
      label: 'Design',
      skills: [
        { name: 'UI / Visual Design', width: 0.95 },
        { name: 'Design Systems', width: 0.98 },
        { name: 'Figma', width: 0.97 },
        { name: 'Prototyping', width: 0.88 },
        { name: 'UX Research', width: 0.8 },
        { name: 'Motion Design', width: 0.72 },
      ],
    },
    {
      label: 'Systems',
      skills: [
        { name: 'Token Architecture', width: 0.96 },
        { name: 'UX-first System Flows', width: 0.80},
      ],
    },
    {
      label: 'Frontend',
      skills: [
        { name: 'HTML / CSS', width: 0.93 },
        { name: 'JavaScript', width: 0.82 },
        { name: 'React', width: 0.78 },
        { name: 'CSS-in-JS / Tailwind', width: 0.85 },
        { name: 'Git / Version Control', width: 0.8 },
      ],
    },
  ];

  private barObserver: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    this.barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target as HTMLElement;
            const w = parseFloat(bar.getAttribute('data-width') ?? '0');
            bar.style.transform = `scaleX(${w})`;
            bar.classList.add('animated');
          }
        });
      },
      { threshold: 0.5 }
    );
    setTimeout(() => {
      this.skillBarRefs?.forEach((ref) => this.barObserver?.observe(ref.nativeElement));
    }, 0);
  }
}
