import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  @Input() appRevealDelay = 0;
  @Input() appRevealDirection: 'up' | 'down' | 'left' | 'right' | 'fade' = 'up';

  ngOnInit(): void {
    const el = this.el.nativeElement;

    el.style.opacity = '0';
    el.style.transition = `opacity 0.85s cubic-bezier(0.33, 1, 0.68, 1), transform 0.85s cubic-bezier(0.33, 1, 0.68, 1)`;

    if (this.appRevealDelay) {
      el.style.transitionDelay = `${this.appRevealDelay}ms`;
    }

    switch (this.appRevealDirection) {
      case 'up':    el.style.transform = 'translateY(40px)'; break;
      case 'down':  el.style.transform = 'translateY(-40px)'; break;
      case 'left':  el.style.transform = 'translateX(40px)'; break;
      case 'right': el.style.transform = 'translateX(-40px)'; break;
      case 'fade':  el.style.transform = 'none'; break;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const target = entry.target as HTMLElement;
            target.style.opacity = '1';
            target.style.transform = 'none';
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}