import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

/**
 * Thin reading-progress bar pinned to the top of the viewport.
 * Drop <app-scroll-progress /> at the top of app.component.html.
 */
@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="scroll-progress-bar" [style.transform]="'scaleX(' + progress() + ')'"></div>
  `,
  styles: [`
    .scroll-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--black);
      transform-origin: left;
      transform: scaleX(0);
      z-index: 9999;
      pointer-events: none;
      transition: transform 0.05s linear;
      opacity: 0.7;
    }
  `],
})
export class ScrollProgressComponent implements OnInit, OnDestroy {
  progress = signal(0);
  private onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(docHeight > 0 ? scrollTop / docHeight : 0);
  };

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }
}