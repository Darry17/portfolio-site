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
      description: 'Built a full design system for a SaaS product — tokens, components, Figma kit, and a docs site. Three product teams use it now, and everything finally speaks the same language.',
    },
    {
      num: '02',
      name: 'Component Guidelines',
      type: 'Documentation',
      year: '2024',
      description: "Wrote the playbook for 60+ components: how to use them, how they're built, states, a11y, and how to hand off to devs. The kind of docs you actually want to read.",
    },
    {
      num: '03',
      name: 'Token Migration',
      type: 'Systems / Frontend',
      year: '2023',
      description: 'Moved a legacy product off hardcoded values and onto a multi-brand token system (W3C spec). Cut design debt by about 70% and made future theming a lot less painful.',
    },
    {
      num: '04',
      name: 'Dashboard Redesign',
      type: 'UI / Product Design',
      year: '2023',
      description: 'Redesigned an analytics dashboard from the ground up — clearer structure, better charts, and components that work across breakpoints. Users actually find what they need now.',
    },
    {
      num: '05',
      name: 'Contribution Workflow',
      type: 'Process / Governance',
      year: '2022',
      description: 'Set up a way for product designers to propose, review, and ship components into the shared system without chaos. Turns out process can be friendly.',
    },
  ];
}
