import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);

  @Input() appCountUp = 0;
  @Input() countUpSuffix = '';
  @Input() countUpDuration = 1400;
  @Input() countUpDelay = 0;

  private observer: IntersectionObserver | null = null;
  private rafId: number | null = null;
  private started = false;
  private delayTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.el.nativeElement.textContent = `0${this.countUpSuffix}`;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.started) {
            this.started = true;
            this.delayTimer = setTimeout(() => this.animate(), this.countUpDelay);
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  private easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  private animate(): void {
    const end = this.appCountUp;
    const start = performance.now();
    const dur = this.countUpDuration;
    const suffix = this.countUpSuffix;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / dur, 1);
      const value = Math.round(this.easeOutExpo(progress) * end);
      this.el.nativeElement.textContent = `${value}${suffix}`;
      if (progress < 1) {
        this.rafId = requestAnimationFrame(tick);
      }
    };
    this.rafId = requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.delayTimer != null) clearTimeout(this.delayTimer);
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
  }
}