import { Component } from '@angular/core';
import { CursorComponent } from './cursor/cursor.component';
import { HeaderComponent } from './header/header.component';
import { GridOverlayComponent } from './grid-overlay/grid-overlay.component';
import { HeroComponent } from './hero/hero.component';
import { MarqueeComponent } from './marquee/marquee.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { WorkComponent } from './work/work.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollProgressComponent } from './scroll-progress/scroll-progress.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CursorComponent,
    HeaderComponent,
    GridOverlayComponent,
    HeroComponent,
    MarqueeComponent,
    AboutComponent,
    SkillsComponent,
    WorkComponent,
    ContactComponent,
    FooterComponent,
    ScrollProgressComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
