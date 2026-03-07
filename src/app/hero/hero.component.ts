import {
  Component,
  signal,
  AfterViewInit,
  ElementRef,
  inject,
  OnDestroy,
} from '@angular/core';

interface HeroStatConfig {
  end: number;
  suffix: string;
  durationMs?: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private rafIds: (number | null)[] = [null, null, null];

  stats: HeroStatConfig[] = [
    { end: 5, suffix: '+', durationMs: 1200 },
    { end: 3, suffix: '', durationMs: 1000 },
    { end: 100, suffix: '+', durationMs: 1400 },
  ];

  displayedValues = [
    signal(0),
    signal(0),
    signal(0),
  ];

  private hasAnimated = false;
  private observer: IntersectionObserver | null = null;
  private counterDelayTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Delay before starting counter (after hero-sidebar fadeIn: 0.9s + 1s ≈ 2s) */
  private readonly COUNTER_START_DELAY_MS = 2000;

  ngAfterViewInit(): void {
    const section = this.el.nativeElement.querySelector('#hero');
    if (!section) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.counterDelayTimeout = setTimeout(() => {
              this.animateAllStats();
              this.counterDelayTimeout = null;
            }, this.COUNTER_START_DELAY_MS);
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px' }
    );
    this.observer.observe(section);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.counterDelayTimeout != null) clearTimeout(this.counterDelayTimeout);
    this.rafIds.forEach((id) => id != null && cancelAnimationFrame(id));
  }

  private easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  private animateAllStats(): void {
    this.stats.forEach((stat, i) => {
      this.animateStat(i, stat.end, stat.durationMs ?? 1200);
    });
  }

  private animateStat(index: number, end: number, durationMs: number): void {
    const start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = this.easeOutExpo(progress);
      const current = Math.round(start + (end - start) * eased);
      this.displayedValues[index].set(current);

      if (progress < 1) {
        this.rafIds[index] = requestAnimationFrame(tick);
      } else {
        this.rafIds[index] = null;
      }
    };

    this.rafIds[index] = requestAnimationFrame(tick);
  }
}
