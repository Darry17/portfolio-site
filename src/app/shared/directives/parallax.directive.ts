import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);

  /** Speed multiplier: positive = slower than scroll (recedes), negative = faster (approaches) */
  @Input() appParallaxSpeed = 0.25;
  @Input() appParallaxAxis: 'y' | 'x' = 'y';

  private rafId: number | null = null;
  private observer: IntersectionObserver | null = null;
  private isVisible = false;
  private lastScrollY = 0;
  private ticking = false;

  ngOnInit(): void {
    this.el.nativeElement.style.willChange = 'transform';

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (this.isVisible = e.isIntersecting));
      },
      { rootMargin: '200px 0px 200px 0px' }
    );
    this.observer.observe(this.el.nativeElement);

    const onScroll = () => {
      this.lastScrollY = window.scrollY;
      if (!this.ticking) {
        this.rafId = requestAnimationFrame(() => {
          if (this.isVisible) this.applyParallax();
          this.ticking = false;
        });
        this.ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    this.applyParallax();

    // Store cleanup ref
    (this as any)._cleanup = () => window.removeEventListener('scroll', onScroll);
  }

  private applyParallax(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    const offset = center * this.appParallaxSpeed;

    if (this.appParallaxAxis === 'y') {
      this.el.nativeElement.style.transform = `translateY(${offset}px)`;
    } else {
      this.el.nativeElement.style.transform = `translateX(${offset}px)`;
    }
  }

  ngOnDestroy(): void {
    (this as any)._cleanup?.();
    this.observer?.disconnect();
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
  }
}