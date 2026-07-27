import { Component } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { EducationComponent } from './components/education/education.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    EducationComponent,
    ContactComponent,
  ],
  template: `
    <div class="app-shell">
      <app-nav></app-nav>
      <app-hero></app-hero>
      <app-about></app-about>
      <app-experience></app-experience>
      <app-projects></app-projects>
      <app-education></app-education>
      <app-contact></app-contact>

      <footer class="site-footer">
        <p>© 2026 · MIKEL SHRÖDINGUER SOSSOU · Cotonou, Bénin</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-shell { background: var(--background); min-height: 100vh; }
    .site-footer {
      border-top: 1px solid var(--border);
      padding: 32px 0;
      text-align: center;
    }
    .site-footer p {
      font-size: 11px;
      letter-spacing: 0.2em;
      color: var(--muted-foreground);
      font-family: var(--font-mono);
    }
  `],
})
export class AppComponent {}
