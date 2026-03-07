import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-grid-overlay',
  standalone: true,
  template: `
    <div class="grid-overlay" [class.visible]="visible()" id="gridOverlay">
      @for (col of cols; track col) {
        <div class="grid-col"></div>
      }
    </div>
    <button type="button" class="grid-toggle" (click)="toggle()">Toggle Grid</button>
  `,
  styleUrls: ['./grid-overlay.component.scss'],
})
export class GridOverlayComponent {
  visible = signal(false);
  cols = Array(12).fill(0);

  toggle(): void {
    this.visible.update((v) => !v);
  }
}
