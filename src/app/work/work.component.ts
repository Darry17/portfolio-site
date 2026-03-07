import { Component } from '@angular/core';
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
export class WorkComponent {
  projects: Project[] = [
    {
      num: '01',
      name: 'Core Design System',
      type: 'Design System',
      year: '2024',
      description: 'End-to-end design system for a SaaS product — token architecture, component library, Figma library, and full documentation portal. Adopted by 3 product teams.',
    },
    {
      num: '02',
      name: 'Component Guidelines',
      type: 'Documentation',
      year: '2024',
      description: 'Authored comprehensive guidelines covering usage, anatomy, states, accessibility requirements, and developer handoff specs for 60+ components.',
    },
    {
      num: '03',
      name: 'Token Migration',
      type: 'Systems / Frontend',
      year: '2023',
      description: 'Migrated a legacy product from hardcoded values to a multi-brand token system using W3C Design Token spec. Reduced design debt by 70%.',
    },
    {
      num: '04',
      name: 'Dashboard Redesign',
      type: 'UI / Product Design',
      year: '2023',
      description: 'Full redesign of an analytics dashboard — information architecture, data visualization system, and responsive component patterns built from the ground up.',
    },
    {
      num: '05',
      name: 'Contribution Workflow',
      type: 'Process / Governance',
      year: '2022',
      description: 'Designed and documented a contribution model enabling product designers to propose, review, and ship components into the shared system with consistency.',
    },
  ];
}
