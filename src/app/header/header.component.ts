import { Component, HostListener, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  activeSection = signal('');

  ngAfterViewInit(): void {
    this.updateActiveSection();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    sections.forEach((s) => {
      const el = s as HTMLElement;
      if (el.id && scrollY >= el.offsetTop - 100) {
        current = el.id;
      }
    });
    this.activeSection.set(current);
  }

  isActive(href: string): boolean {
    const id = href.replace('#', '');
    return this.activeSection() === id;
  }
}
