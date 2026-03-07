import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';

/**
 * Adds a scroll-driven underline/highlight that expands as the element
 * enters the viewport — great for headlines and section numbers.
 *
 * Usage: <h2 appScrollHighlight>Title</h2>
 */
@Directive({
  selector: '[appScrollHighlight]',
  standalone: true,
})
export class ScrollHighlightDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    const el = this.el.nativeElement;
    el.style.position = 'relative';
    el.style.display = 'inline-block';

    // Inject the underline pseudo-element via a wrapper span trick
    const line = document.createElement('span');
    line.style.cssText = `
      position: absolute;
      bottom: -2px;
      left: 0;
      height: 1px;
      width: 0%;
      background: currentColor;
      opacity: 0.3;
      transition: width 1.1s cubic-bezier(0.33, 1, 0.68, 1) 0.3s;
      pointer-events: none;
    `;
    el.appendChild(line);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            line.style.width = '100%';
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}