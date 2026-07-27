import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InViewDirective } from '../../directives/in-view.directive';
import { SVG_ICONS } from '../../utils/icons';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, InViewDirective],
  template: `
    <section id="experience" class="experience">
      <div class="glow-left"></div>
      <div class="max-w">

        <div class="reveal" data-reveal="fade-up" appInView style="margin-bottom:64px;">
          <div class="section-pretitle"><div class="line"></div><span>02 · EXPÉRIENCE</span></div>
          <h2 class="section-title">Parcours</h2>
        </div>

        <div class="timeline">
          <div class="tl-line reveal-line-y in-view" appInView></div>
          <div class="tl-dot reveal" data-reveal="scale" appInView [style.--d]="'0.3s'"></div>

          <div class="card-perspective">
            <div class="reveal job-card" data-reveal="tilt-lg" appInView [style.--d]="'0.15s'">
              <div class="job-top">
                <div>
                  <span class="job-date">Février 2026 – Présent</span>
                  <span class="job-badge">En poste</span>
                </div>
              </div>
              <h3 class="job-title">Directeur Général</h3>
              <p class="job-company">Entreprise DiGiVERSE · Cotonou, Bénin</p>
              <ul class="job-list">
                @for (b of bullets; track b; let i = $index) {
                  <li class="reveal" data-reveal="slide-x" appInView [style.--d]="(0.3 + i * 0.1) + 's'">
                    <span class="bullet" [innerHTML]="SVG_ICONS.chevronRight"></span>{{ b }}
                  </li>
                }
              </ul>
              <div class="job-line reveal-line-x in-view" appInView [style.--d]="'0.5s'"></div>
            </div>
          </div>

          <div class="card-perspective community">
            <div class="reveal community-card" data-reveal="tilt-lg" appInView [style.--d]="'0.2s'">
              <h3 class="community-title">Engagement communautaire</h3>
              <ul class="community-list">
                @for (item of community; track item) {
                  <li><span class="bullet2" [innerHTML]="SVG_ICONS.chevronRight"></span>{{ item }}</li>
                }
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .experience { position: relative; padding: 112px 0; overflow: hidden; }
    @media (min-width: 768px) { .experience { padding: 144px 0; } }
    .glow-left {
      position: absolute; left: 0; top: 50%; transform: translate(-40%, -50%);
      width: 320px; height: 320px; pointer-events: none;
      background: radial-gradient(circle, rgba(0,200,255,0.04) 0%, transparent 70%);
    }

    .timeline { position: relative; padding-left: 32px; }
    @media (min-width: 768px) { .timeline { padding-left: 64px; } }
    .tl-line {
      position: absolute; left: 0; top: 0; bottom: 0; width: 1px;
      background: linear-gradient(to bottom, var(--primary), rgba(123,47,255,0.3), transparent);
    }
    .tl-dot {
      position: absolute; left: 0; top: 8px; width: 12px; height: 12px; border-radius: 50%;
      transform: translateX(-50%); background: var(--primary); box-shadow: 0 0 16px var(--primary);
    }

    .card-perspective { perspective: 1000px; }
    .card-perspective.community { margin-top: 40px; }

    .job-card {
      border: 1px solid var(--border); background: var(--card); padding: 32px; max-width: 48rem;
      position: relative;
    }
    @media (min-width: 768px) { .job-card { padding: 40px; } }
    .job-top { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
    .job-date { font-size: 12px; letter-spacing: 0.1em; color: var(--muted-foreground); font-family: var(--font-mono); }
    .job-badge { margin-left: 12px; padding: 2px 8px; font-size: 12px; border: 1px solid var(--accent); color: var(--accent); font-family: var(--font-mono); }
    .job-title { font-family: var(--font-display); font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; color: var(--foreground); line-height: 1.1; margin-bottom: 4px; }
    .job-company { color: var(--primary); font-family: var(--font-mono); font-size: 14px; margin-bottom: 32px; }
    .job-list { display: flex; flex-direction: column; gap: 12px; }
    .job-list li { display: flex; gap: 12px; font-size: 14px; line-height: 1.6; color: var(--muted-foreground); }
    .bullet { color: var(--primary); flex-shrink: 0; margin-top: 4px; width: 10px; height: 10px; }
    .bullet svg { width: 100%; height: 100%; }
    .job-line { margin-top: 32px; height: 1px; width: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary), transparent); }

    .community-card {
      border: 1px solid rgba(123,47,255,0.2); background: rgba(123,47,255,0.04); padding: 24px 32px; max-width: 48rem;
    }
    .community-title { margin-bottom: 16px; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--secondary); font-family: var(--font-mono); }
    .community-list { display: flex; flex-direction: column; gap: 8px; }
    .community-list li { display: flex; gap: 12px; font-size: 14px; color: var(--muted-foreground); }
    .bullet2 { color: var(--secondary); flex-shrink: 0; width: 10px; height: 10px; margin-top: 4px; }
    .bullet2 svg { width: 100%; height: 100%; }
  `],
})
export class ExperienceComponent {
  protected readonly SVG_ICONS = SVG_ICONS;
  bullets = [
    "Développement web — sites vitrines, sites dynamiques, panels d'administration",
    "Développement d'application mobile avec Android Studio",
    'Direction créative et production graphique',
    'Conception et animation de formations numériques',
    'Utilisation des frameworks Frontend (Angular, Next.js) et Backend (Spring Boot, Node.js)',
  ];

  community = [
    'Membre du forum 10 000 codeurs au Bénin',
    "Participation au Festival du Citoyen organisé par l'UNICEF",
  ];
}
