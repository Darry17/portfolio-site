import {
  Component,
  HostListener,
  inject,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-cursor',
  standalone: true,
  template: `
    <div class="cursor" [style.left.px]="x()" [style.top.px]="y()"></div>
    <div class="cursor-ring" [style.left.px]="ringX()" [style.top.px]="ringY()"></div>
  `,
  styles: [],
})
export class CursorComponent implements OnInit, OnDestroy {
  x = signal(0);
  y = signal(0);
  ringX = signal(0);
  ringY = signal(0);

  private targetX = 0;
  private targetY = 0;
  private currentRingX = 0;
  private currentRingY = 0;
  private rafId: number | null = null;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
  }

  ngOnInit(): void {
    const animate = () => {
      this.x.set(this.targetX);
      this.y.set(this.targetY);
      this.currentRingX += (this.targetX - this.currentRingX) * 0.12;
      this.currentRingY += (this.targetY - this.currentRingY) * 0.12;
      this.ringX.set(this.currentRingX);
      this.ringY.set(this.currentRingY);
      this.rafId = requestAnimationFrame(animate);
    };
    animate();
  }

  ngOnDestroy(): void {
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
