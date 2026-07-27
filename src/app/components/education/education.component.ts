import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InViewDirective } from '../../directives/in-view.directive';
import { SVG_ICONS } from '../../utils/icons';

interface EduItem {
  period: string;
  degree: string;
  school: string;
  location: string;
  accent: string;
  icon: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, InViewDirective],
  template: `
    <section id="education" class="education">
      <div class="glow-br"></div>
      <div class="max-w">

        <div class="reveal" data-reveal="fade-up" appInView style="margin-bottom:64px;">
          <div class="section-pretitle"><div class="line"></div><span>04 · FORMATION</span></div>
          <h2 class="section-title">Académique</h2>
        </div>

        <div class="cards">
          @for (item of items; track item.degree; let i = $index) {
            <div class="card-perspective">
              <div class="reveal edu-card" data-reveal="tilt" appInView [style.--d]="(i * 0.15) + 's'">
                <div class="corner" [style.background]="'radial-gradient(circle at top right, ' + item.accent + ', transparent)'"></div>
                <span class="icon" [innerHTML]="item.icon"></span>
                <span class="period" [style.color]="item.accent">{{ item.period }}</span>
                <h3 class="degree">{{ item.degree }}</h3>
                <div>
                  <p class="school">{{ item.school }}</p>
                  <p class="location"><span class="loc-ic" [innerHTML]="SVG_ICONS.mapPin"></span> {{ item.location }}</p>
                </div>
                <div class="bottom-line reveal-w in-view" appInView [style.background]="'linear-gradient(90deg, ' + item.accent + ', transparent)'" [style.--d]="(0.4 + i * 0.15) + 's'"></div>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .education { position: relative; padding: 112px 0; overflow: hidden; }
    @media (min-width: 768px) { .education { padding: 144px 0; } }
    .glow-br {
      position: absolute; right: 0; bottom: 0; width: 384px; height: 384px; pointer-events: none;
      background: radial-gradient(circle, rgba(0,255,170,0.03) 0%, transparent 70%);
      transform: translate(30%, 30%);
    }
    .cards { display: grid; grid-template-columns: 1fr; gap: 24px; }
    @media (min-width: 768px) { .cards { grid-template-columns: repeat(3, 1fr); } }
    .card-perspective { perspective: 1000px; }
    .edu-card {
      border: 1px solid var(--border); background: var(--card); padding: 32px; height: 100%;
      display: flex; flex-direction: column; position: relative; overflow: hidden;
      transition: transform 0.3s ease;
    }
    .edu-card:hover { transform: translateY(-4px); }
    .corner { position: absolute; top: 0; right: 0; width: 80px; height: 80px; opacity: 0.1; transition: opacity 0.3s ease; }
    .edu-card:hover .corner { opacity: 0.2; }
    .icon { width: 36px; height: 36px; color: var(--foreground); margin-bottom: 20px; display: block; }
    .icon svg { width: 100%; height: 100%; }
    .loc-ic { display: inline-block; width: 10px; height: 10px; vertical-align: middle; margin-right: 2px; }
    .period { font-size: 12px; margin-bottom: 12px; display: block; font-family: var(--font-mono); }
    .degree { flex: 1; margin-bottom: 16px; line-height: 1.3; font-family: var(--font-display); font-size: clamp(1.1rem, 1.8vw, 1.3rem); font-weight: 600; color: var(--foreground); }
    .school { font-size: 14px; margin-bottom: 2px; color: var(--muted-foreground); }
    .location { font-size: 12px; color: var(--muted-foreground); font-family: var(--font-mono); }
    .bottom-line { position: absolute; bottom: 0; left: 0; height: 1px; }
  `],
})
export class EducationComponent {
  protected readonly SVG_ICONS = SVG_ICONS;
  items: EduItem[] = [
    {
      period: '2023 – 2026',
      degree: 'Licence en Système Informatiques et Logiciels',
      school: 'Institut Universitaire Les Cours Sonou Comé',
      location: 'Bénin',
      accent: 'var(--primary)',
      icon: SVG_ICONS.code,
    },
    {
      period: '2023 – 2026',
      degree: 'Licence en Anglais Didactique',
      school: "Université d'Abomey-Calavi (Flash-Adjarra)",
      location: 'Bénin',
      accent: 'var(--secondary)',
      icon: SVG_ICONS.book,
    },
    {
      period: 'Mars – Avril 2026',
      degree: 'Lecture et Écriture de la langue Saxwe',
      school: 'Saxwɛgbe Na Yi Ŋukɔn',
      location: 'Bénin',
      accent: 'var(--accent)',
      icon: SVG_ICONS.edit,
    },
  ];
}
