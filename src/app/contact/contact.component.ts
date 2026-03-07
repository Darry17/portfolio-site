import { Component } from '@angular/core';
import { RevealDirective } from '../shared/directives/reveal.directive';

export interface SocialLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  email = 'darry.a.diaz@gmail.com';
  socialLinks: SocialLink[] = [
    { label: 'LinkedIn', href: '#' },
    { label: 'Dribbble', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Read.cv', href: '#' },
  ];
}
