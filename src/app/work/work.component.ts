import { Component, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { RevealDirective } from '../shared/directives/reveal.directive';

export interface Project {
  num: string;
  name: string;
  type: string;
  year: string;
  description: string;
  link?: string;
}

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements AfterViewInit, OnDestroy {
  private elRef = inject(ElementRef);
  private get el(): HTMLElement { return this.elRef.nativeElement as HTMLElement; }
  private clipObserver: IntersectionObserver | null = null;

  projects: Project[] = [
    {
      num: '01',
      name: 'Core Design System',
      type: 'Design System',
      year: '2024',
      description: 'End-to-end design system for a SaaS product: token architecture, component library, Figma library, and documentation portal. Adopted by three product teams.',
    },
    {
      num: '02',
      name: 'Component Guidelines',
      type: 'Documentation',
      year: '2024',
      description: "Comprehensive guidelines for 60+ components: usage, anatomy, states, accessibility requirements, and developer handoff specifications.",
    },
    {
      num: '03',
      name: 'Token Migration',
      type: 'Systems / Frontend',
      year: '2023',
      description: 'Migrated a legacy product from hardcoded values to a multi-brand token system (W3C Design Token spec). Reduced design debt by approximately 70%.',
    },
    {
      num: '04',
      name: 'Dashboard Redesign',
      type: 'UI / Product Design',
      year: '2023',
      description: 'Full redesign of an analytics dashboard: information architecture, data visualization system, and responsive component patterns.',
    },
    {
      num: '05',
      name: 'Contribution Workflow',
      type: 'Process / Governance',
      year: '2022',
      description: 'Designed and documented a contribution model enabling product designers to propose, review, and ship components into the shared system with consistency.',
    },
  ];

  ngAfterViewInit(): void {
    this.clipObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            this.clipObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -32px 0px' }
    );

    const clips = Array.from(
      this.el.querySelectorAll('.project-name')
    ) as HTMLElement[];
    clips.forEach((clip: HTMLElement, i: number) => {
      const inner = clip.querySelector('.project-name-inner') as HTMLElement | null;
      if (inner) {
        inner.style.transitionDelay = `${i * 80}ms`;
      }
      this.clipObserver?.observe(clip);
    });
  }

  ngOnDestroy(): void {
    this.clipObserver?.disconnect();
  }
}