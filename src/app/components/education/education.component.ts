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

interface CertItem {
  period: string;
  title: string;
  issuer: string;
  credentialUrl: string;
  accent: string;
  icon: string;
  skills: string[];
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
          <div class="section-pretitle"><div class="line"></div><span>04 · FORMATION &amp; CERTIFICATIONS</span></div>
          <h2 class="section-title">Parcours &amp; Accréditations</h2>
        </div>

        <!-- 1. PARCOURS ACADÉMIQUE -->
        <div class="sub-block">
          <div class="sub-block-head reveal" data-reveal="fade-up" appInView>
            <span class="sub-tag">// 01 · DIPLÔMES</span>
            <h3 class="sub-title">Parcours Académique</h3>
          </div>

          <div class="cards">
            @for (item of items; track item.degree; let i = $index) {
              <div class="card-perspective">
                <div class="reveal edu-card" data-reveal="tilt" appInView [style.--d]="(i * 0.15) + 's'">
                  <div class="corner" [style.background]="'radial-gradient(circle at top right, ' + item.accent + ', transparent)'"></div>
                  <span class="icon" [innerHTML]="item.icon"></span>
                  <span class="period" [style.color]="item.accent">{{ item.period }}</span>
                  <h4 class="degree">{{ item.degree }}</h4>
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

        <!-- 2. CERTIFICATIONS OFFICIELLES -->
        <div class="sub-block" style="margin-top: 72px;">
          <div class="sub-block-head reveal" data-reveal="fade-up" appInView>
            <span class="sub-tag accent-tag">// 02 · ACCRÉDITATIONS DATA &amp; IA</span>
            <h3 class="sub-title">Certifications Officielles</h3>
          </div>

          <div class="cert-cards">
            @for (cert of certifications; track cert.title; let i = $index) {
              <div class="card-perspective">
                <div class="reveal cert-card" data-reveal="tilt" appInView [style.--d]="(i * 0.15) + 's'">
                  <div class="corner" [style.background]="'radial-gradient(circle at top right, ' + cert.accent + '33, transparent)'"></div>

                  <div class="cert-top">
                    <span class="cert-badge">
                      <span class="badge-ic" [innerHTML]="SVG_ICONS.award"></span>
                      {{ cert.issuer }}
                    </span>
                    <span class="cert-period" [style.color]="cert.accent">{{ cert.period }}</span>
                  </div>

                  <div class="cert-main">
                    <span class="cert-icon" [style.color]="cert.accent" [innerHTML]="cert.icon"></span>
                    <h4 class="cert-name">{{ cert.title }}</h4>

                    <div class="cert-tags">
                      @for (s of cert.skills; track s) {
                        <span class="tag-pill">{{ s }}</span>
                      }
                    </div>
                  </div>

                  <div class="cert-action">
                    <a [href]="cert.credentialUrl" target="_blank" rel="noopener noreferrer" class="verify-btn" [style.--glow-color]="cert.accent">
                      <span>Vérifier le certificat</span>
                      <span class="btn-ic" [innerHTML]="SVG_ICONS.externalLink"></span>
                    </a>
                  </div>

                  <div class="bottom-line reveal-w in-view" appInView [style.background]="'linear-gradient(90deg, ' + cert.accent + ', transparent)'" [style.--d]="(0.4 + i * 0.15) + 's'"></div>
                </div>
              </div>
            }
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .education { position: relative; padding: 72px 0; overflow: hidden; }
    @media (min-width: 768px) { .education { padding: 112px 0; } }
    @media (min-width: 1024px) { .education { padding: 144px 0; } }
    .glow-br {
      position: absolute; right: 0; bottom: 0; width: 384px; height: 384px; pointer-events: none;
      background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
      transform: translate(30%, 30%);
      opacity: 0.05;
    }

    .sub-block { position: relative; }
    .sub-block-head { margin-bottom: 24px; }
    .sub-tag {
      display: block; font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.2em; color: var(--primary); text-transform: uppercase; margin-bottom: 6px;
    }
    .sub-tag.accent-tag { color: var(--accent); }
    .sub-title {
      font-family: var(--font-display); font-size: clamp(1.2rem, 2vw, 1.55rem);
      font-weight: 600; color: var(--foreground); letter-spacing: 0.04em;
    }

    .cards { display: grid; grid-template-columns: 1fr; gap: 20px; }
    @media (min-width: 640px) { .cards { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .cards { grid-template-columns: repeat(3, 1fr); gap: 24px; } }
    .card-perspective { perspective: 1000px; }

    .edu-card {
      border: 1px solid var(--border); background: var(--card); padding: 24px 20px; height: 100%;
      display: flex; flex-direction: column; position: relative; overflow: hidden;
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    @media (min-width: 640px) { .edu-card { padding: 32px; } }
    .edu-card:hover {
      transform: translateY(-4px);
      border-color: var(--primary);
      box-shadow: 0 10px 25px var(--ring);
    }

    .corner { position: absolute; top: 0; right: 0; width: 80px; height: 80px; opacity: 0.15; transition: opacity 0.3s ease; }
    .edu-card:hover .corner, .cert-card:hover .corner { opacity: 0.35; }

    .icon { width: 36px; height: 36px; color: var(--foreground); margin-bottom: 20px; display: block; }
    .icon svg { width: 100%; height: 100%; }
    .loc-ic { display: inline-block; width: 10px; height: 10px; vertical-align: middle; margin-right: 2px; }
    .period { font-size: 12px; margin-bottom: 12px; display: block; font-family: var(--font-mono); }
    .degree { flex: 1; margin-bottom: 16px; line-height: 1.3; font-family: var(--font-display); font-size: clamp(1.1rem, 1.8vw, 1.3rem); font-weight: 600; color: var(--foreground); }
    .school { font-size: 14px; margin-bottom: 2px; color: var(--muted-foreground); }
    .location { font-size: 12px; color: var(--muted-foreground); font-family: var(--font-mono); }

    /* CERTIFICATION CARDS */
    .cert-cards { display: grid; grid-template-columns: 1fr; gap: 20px; }
    @media (min-width: 640px) { .cert-cards { grid-template-columns: repeat(2, 1fr); gap: 24px; } }

    .cert-card {
      border: 1px solid var(--border); background: var(--card);
      padding: 24px 20px; height: 100%; display: flex; flex-direction: column; position: relative; overflow: hidden;
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 4px 15px rgba(15, 23, 42, 0.02);
    }
    @media (min-width: 640px) { .cert-card { padding: 32px; } }
    .cert-card:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
      box-shadow: 0 12px 30px var(--ring);
    }

    .cert-top {
      display: flex; justify-content: space-between; align-items: center;
      gap: 12px; margin-bottom: 20px; flex-wrap: wrap;
    }
    .cert-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 10px; font-family: var(--font-mono); font-size: 11px; font-weight: 600;
      letter-spacing: 0.08em; background: rgba(0, 255, 170, 0.08);
      color: var(--accent); border: 1px solid rgba(0, 255, 170, 0.28);
    }
    .badge-ic { width: 14px; height: 14px; display: inline-flex; align-items: center; }
    .badge-ic svg { width: 100%; height: 100%; }
    .cert-period { font-size: 12px; font-family: var(--font-mono); letter-spacing: 0.05em; }

    .cert-main { flex: 1; margin-bottom: 24px; }
    .cert-icon { width: 38px; height: 38px; display: block; margin-bottom: 16px; }
    .cert-icon svg { width: 100%; height: 100%; }
    .cert-name {
      font-family: var(--font-display); font-size: clamp(1.2rem, 1.8vw, 1.45rem);
      font-weight: 600; color: var(--foreground); line-height: 1.35; margin-bottom: 16px;
    }
    .cert-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .tag-pill {
      font-family: var(--font-mono); font-size: 10px; padding: 4px 9px;
      color: var(--muted-foreground); background: var(--muted);
      border: 1px solid var(--border); letter-spacing: 0.04em;
    }

    .cert-action {
      padding-top: 20px; border-top: 1px solid var(--border);
    }
    .verify-btn {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: var(--font-mono); font-size: 12px; font-weight: 600;
      letter-spacing: 0.05em; color: var(--glow-color, var(--primary));
      transition: transform 0.2s ease, opacity 0.2s ease;
      cursor: pointer;
    }
    .verify-btn:hover {
      opacity: 0.9;
      transform: translateX(4px);
      text-shadow: 0 0 10px var(--glow-color, var(--primary));
    }
    .btn-ic { width: 13px; height: 13px; display: inline-flex; align-items: center; }
    .btn-ic svg { width: 100%; height: 100%; }

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

  certifications: CertItem[] = [
    {
      period: '03 Septembre 2026',
      title: 'Understanding Artificial Intelligence',
      issuer: 'DataCamp',
      credentialUrl: 'https://www.datacamp.com/statement-of-accomplishment/course/3f71e494b56a8dd1436623b899dac648a1c1a2eb',
      accent: 'var(--primary)',
      icon: SVG_ICONS.brain,
      skills: ['Intelligence Artificielle', 'Machine Learning', 'Data Literacy'],
    },
    {
      period: '18 Septembre 2026',
      title: 'Communicating Data Insights',
      issuer: 'DataCamp',
      credentialUrl: 'https://www.datacamp.com/statement-of-accomplishment/course/04c7fac181b4f1320c220dbafff86c70d7c9a6b4',
      accent: 'var(--accent)',
      icon: SVG_ICONS.chartBar,
      skills: ['Data Storytelling', 'Visualisation de données', 'Communication Décisionnelle'],
    },
  ];
}
