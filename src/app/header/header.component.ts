import { Component, HostListener, signal, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

const SCROLL_STOP_DELAY_MS = 200;
const TOP_THRESHOLD_PX = 20;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  activeSection = signal('');
  headerVisible = signal(true);

  private scrollStopTimer: ReturnType<typeof setTimeout> | null = null;

  ngAfterViewInit(): void {
    this.updateActiveSection();
  }

  ngOnDestroy(): void {
    if (this.scrollStopTimer != null) {
      clearTimeout(this.scrollStopTimer);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    this.updateActiveSection();

    if (scrollY <= TOP_THRESHOLD_PX) {
      this.headerVisible.set(true);
      if (this.scrollStopTimer != null) {
        clearTimeout(this.scrollStopTimer);
        this.scrollStopTimer = null;
      }
      return;
    }

    this.headerVisible.set(false);
    if (this.scrollStopTimer != null) {
      clearTimeout(this.scrollStopTimer);
    }
    this.scrollStopTimer = setTimeout(() => {
      this.headerVisible.set(true);
      this.scrollStopTimer = null;
    }, SCROLL_STOP_DELAY_MS);
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
