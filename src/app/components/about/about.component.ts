import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InViewDirective } from '../../directives/in-view.directive';
import { SVG_ICONS } from '../../utils/icons';

interface Skill { name: string; level: number; }
interface Language { lang: string; level: string; pct: number; color: string; }
interface CreativeSkill { name: string; icon: string; }

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, InViewDirective],
  template: `
    <section id="about" class="about">
      <div class="glow-tr"></div>
      <div class="max-w">

        <div class="reveal" data-reveal="fade-up" appInView style="margin-bottom: 64px;">
          <div class="section-pretitle"><div class="line"></div><span>01 · PROFIL</span></div>
          <h2 class="section-title">Profil</h2>
        </div>

        <div class="grid">

          <!-- LEFT COLUMN -->
          <div>
            <div class="bio-perspective">
              <div class="reveal bio-card" data-reveal="tilt" appInView>
                <div class="mini-grid"></div>
                <div class="bio-inner">
                  <p class="bio-p">
                    Analyste programmeur spécialisé dans la conception et le développement
                    d'applications web et logicielles. Passionné par les nouvelles technologies,
                    je maîtrise les différentes étapes du cycle de développement.
                  </p>
                  <p class="bio-p" style="margin-top:16px;">
                    Rigoureux, créatif et orienté résultats, je mets mes compétences techniques
                    et analytiques au service de projets innovants, tout en garantissant qualité,
                    sécurité et maintenance.
                  </p>
                  <div class="bio-meta">
                    @for (item of metaItems; track item.label) {
                      <div>
                        <span class="meta-label">{{ item.label }}</span>
                        <span class="meta-value">{{ item.value }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>

            <div class="reveal" data-reveal="fade-up" appInView style="margin-bottom: 40px;">
              <h3 class="subhead">Qualités</h3>
              <div class="tag-row">
                @for (s of softSkills; track s; let i = $index) {
                  <span class="tag reveal" data-reveal="scale" appInView [style.--d]="(i * 0.07) + 's'">{{ s }}</span>
                }
              </div>
            </div>

            <!-- NEW: Creative & Marketing skills -->
            <div class="reveal" data-reveal="fade-up" appInView style="margin-bottom: 40px;">
              <h3 class="subhead accent2">Compétences créatives &amp; marketing</h3>
              <div class="creative-grid">
                @for (c of creativeSkills; track c.name; let i = $index) {
                  <div class="creative-item reveal" data-reveal="fade-up-sm" appInView [style.--d]="(i * 0.06) + 's'">
                    <span class="creative-icon" [innerHTML]="c.icon"></span>
                    <span class="creative-name">{{ c.name }}</span>
                  </div>
                }
              </div>
            </div>

            <div class="reveal" data-reveal="fade-up" appInView>
              <h3 class="subhead">Langues</h3>
              <div class="lang-grid">
                @for (l of languages; track l.lang; let i = $index) {
                  <div>
                    <div class="lang-row">
                      <span class="lang-name">{{ l.lang }}</span>
                      <span class="lang-level">{{ l.level }}</span>
                    </div>
                    <div class="lang-track">
                      <div class="lang-fill reveal-w in-view-parent" appInView
                           [style.background]="l.color" [style.boxShadow]="'0 0 6px ' + l.color"
                           [style.--w]="l.pct + '%'" [style.--d]="(0.1 + i * 0.08) + 's'"></div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN -->
          <div>
            <div class="reveal" data-reveal="fade-up" appInView>
              <div class="skills-head">
                <h3>⚡ Compétences techniques</h3>
                <span class="loading">● CHARGEMENT STATS</span>
              </div>
            </div>

            @for (skill of techSkills; track skill.name; let i = $index) {
              <div class="skillbar" appInView (appInViewEnter)="startCount(skill, i)">
                <div class="sb-head">
                  <span class="sb-name">{{ skill.name }}</span>
                  <div class="sb-right">
                    <span class="sb-pct" [style.color]="barColor(skill.level)">{{ counts[skill.name] || 0 }}%</span>
                    <span class="sb-lvl" [style.background]="barColor(skill.level)">LVL {{ Math.round(skill.level/10) }}</span>
                  </div>
                </div>
                <div class="sb-track">
                  <div class="sb-segments"></div>
                  <div class="sb-fill reveal-w" appInView
                       [style.background]="barColor(skill.level)"
                       [style.boxShadow]="'0 0 10px ' + barColor(skill.level) + 'AA, 0 0 20px ' + barColor(skill.level) + '44'"
                       [style.--w]="skill.level + '%'" [style.--d]="(i * 0.09) + 's'"></div>
                </div>
              </div>
            }

            <div class="reveal" data-reveal="fade-up" appInView style="margin-top: 40px;">
              <h3 class="subhead">Outils &amp; logiciels</h3>
              <div class="tag-row">
                @for (t of tools; track t; let i = $index) {
                  <span class="tool-tag reveal" data-reveal="fade-up-sm" appInView [style.--d]="(i * 0.04) + 's'">{{ t }}</span>
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .about { position: relative; padding: 72px 0; overflow: hidden; }
    @media (min-width: 768px) { .about { padding: 112px 0; } }
    @media (min-width: 1024px) { .about { padding: 144px 0; } }
    .glow-tr {
      position: absolute; top: 0; right: 0; width: 384px; height: 384px; pointer-events: none;
      background: radial-gradient(circle, var(--secondary) 0%, transparent 70%);
      transform: translate(30%, -30%);
      opacity: 0.1;
    }
    .grid { display: grid; grid-template-columns: 1fr; gap: 48px; }
    @media (min-width: 1024px) { .grid { grid-template-columns: 1fr 1fr; gap: 64px; } }
    @media (min-width: 1280px) { .grid { gap: 96px; } }

    .bio-perspective { perspective: 1200px; margin-bottom: 40px; }
    .bio-card {
      padding: 24px 20px; border: 1px solid var(--border); background: var(--card);
      position: relative; overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
    }
    @media (min-width: 640px) { .bio-card { padding: 32px; } }
    body.dark .bio-card { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); }
    .mini-grid {
      position: absolute; inset: 0; pointer-events: none;
      background-image: linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px);
      background-size: 32px 32px;
      opacity: 0.04;
    }
    .bio-inner { position: relative; }
    .bio-p { font-size: 14px; line-height: 1.75; color: var(--muted-foreground); }
    .bio-meta {
      margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border);
      display: grid; grid-template-columns: 1fr; gap: 14px;
    }
    @media (min-width: 500px) { .bio-meta { grid-template-columns: 1fr 1fr; gap: 16px; } }
    .meta-label { display: block; font-size: 11px; margin-bottom: 2px; color: var(--primary); font-family: var(--font-mono); letter-spacing: 0.1em; }
    .meta-value { font-size: 13.5px; color: var(--foreground); word-break: break-word; }

    .subhead { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; color: var(--primary); font-family: var(--font-mono); }
    .subhead.accent2 { color: var(--accent); }

    .tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .tag {
      font-family: var(--font-mono); font-size: 10px; color: var(--muted-foreground);
      border: 1px solid var(--border); padding: 4px 10px; letter-spacing: 0.05em;
    }
    .tool-tag {
      font-family: var(--font-mono); font-size: 10px; color: var(--muted-foreground);
      background: var(--muted); border: 1px solid var(--border); padding: 3px 9px;
    }

    .creative-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
    @media (min-width: 380px) { .creative-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 640px) { .creative-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (min-width: 1024px) and (max-width: 1200px) { .creative-grid { grid-template-columns: repeat(2, 1fr); } }
    .creative-item {
      display: flex; align-items: center; gap: 8px; padding: 10px 12px;
      border: 1px solid var(--border); background: var(--card);
      transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.02);
    }
    .creative-item:hover { border-color: var(--accent); background: rgba(0,255,170,0.08); transform: translateY(-2px); }
    .creative-icon { width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; color: var(--accent); flex-shrink: 0; }
    .creative-icon svg { width: 100%; height: 100%; }
    .creative-name { font-family: var(--font-mono); font-size: 10.5px; color: var(--foreground); letter-spacing: 0.02em; line-height: 1.3; }

    .lang-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
    @media (min-width: 500px) { .lang-grid { grid-template-columns: 1fr 1fr; gap: 20px 32px; } }
    .lang-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
    .lang-name { font-size: 14px; font-weight: 500; color: var(--foreground); }
    .lang-level { font-family: var(--font-mono); font-size: 9px; color: var(--muted-foreground); letter-spacing: 0.08em; }
    .lang-track { height: 3px; background: var(--border); position: relative; overflow: hidden; }
    .lang-fill { height: 100%; }

    .skills-head {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px solid var(--border);
    }
    .skills-head h3 { font-family: var(--font-mono); font-size: 11px; color: var(--primary); letter-spacing: 0.2em; text-transform: uppercase; }
    .loading { font-family: var(--font-mono); font-size: 9px; color: var(--accent); letter-spacing: 0.1em; animation: hud-blink 2s ease-in-out infinite; }

    .skillbar { margin-bottom: 20px; }
    .sb-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
    .sb-name { font-family: var(--font-mono); font-size: 10px; color: var(--muted-foreground); letter-spacing: 0.1em; text-transform: uppercase; }
    .sb-right { display: flex; align-items: center; gap: 7px; }
    .sb-pct { font-family: var(--font-mono); font-size: 11px; font-weight: 700; }
    .sb-lvl { font-family: var(--font-mono); font-size: 8px; color: var(--primary-foreground); padding: 1px 5px; letter-spacing: 0.06em; font-weight: 700; }
    .sb-track { height: 9px; background: var(--muted); border: 1px solid var(--border); position: relative; overflow: hidden; }
    .sb-segments {
      position: absolute; inset: 0; z-index: 2; pointer-events: none;
      background-image: repeating-linear-gradient(90deg, transparent 0px, transparent 9px, var(--background) 9px, var(--background) 10px);
      opacity: 0.4;
    }
    .sb-fill { position: absolute; top: 0; left: 0; height: 100%; }
  `],
})
export class AboutComponent {
  Math = Math;

  metaItems = [
    { label: 'LOCALISATION', value: 'Cotonou, Bénin' },
    { label: 'EMAIL', value: 'mikelsossou1@gmail.com' },
    { label: 'TÉLÉPHONE', value: '+229 01 999 317 15' },
    { label: 'STATUT', value: '● Disponible' },
  ];

  techSkills: Skill[] = [
    { name: 'HTML / CSS', level: 92 },
    { name: 'JavaScript', level: 85 },
    { name: 'Angular', level: 78 },
    { name: 'Next.js / React', level: 82 },
    { name: 'Node.js', level: 75 },
    { name: 'Spring Boot', level: 65 },
    { name: 'Android Studio', level: 72 },
    { name: 'Adobe Suite', level: 80 },
    { name: 'PostgreSQL / Supabase', level: 70 },
  ];

  softSkills = [
    "Esprit d'équipe",
    "Sens de l'organisation",
    'Adaptabilité',
    'Fiabilité',
    'Sens des responsabilités',
    'Travail sous pression',
  ];

  // New creative / marketing skills requested by the user
  creativeSkills: CreativeSkill[] = [
    { name: 'Design Graphique', icon: SVG_ICONS.design },
    { name: 'Community Manager', icon: SVG_ICONS.mobile },
    { name: 'Visibilité Google Maps', icon: SVG_ICONS.mapPin },
    { name: 'Gestion des réseaux sociaux', icon: SVG_ICONS.megaphone },
    { name: "Conception d'affiche", icon: SVG_ICONS.image },
    { name: 'Conception de logo', icon: SVG_ICONS.layers },
    { name: 'Conception de carte de visite', icon: SVG_ICONS.card },
    { name: 'Conception de porte-clé', icon: SVG_ICONS.key },
  ];

  languages: Language[] = [
    { lang: 'Français', level: 'Natif', pct: 100, color: 'var(--primary)' },
    { lang: 'Anglais', level: 'Courant', pct: 82, color: 'var(--secondary)' },
    { lang: 'Espagnol', level: 'Intermédiaire', pct: 55, color: 'var(--accent)' },
    { lang: 'Fon', level: 'Courant', pct: 80, color: 'var(--primary)' },
    { lang: 'Saxwe', level: 'Courant + écrit', pct: 75, color: 'var(--secondary)' },
    { lang: 'Mina', level: 'Intermédiaire', pct: 50, color: 'var(--accent)' },
  ];

  tools = [
    'VS Code', 'Android Studio', 'Adobe Photoshop',
    'Adobe Illustrator', 'Adobe Premiere Pro', 'Audacity',
    'CapCut', 'XAMPP / WAMP', 'DataCamp', 'IA & LLMs',
    'Data Visualisation', 'Windows', 'Linux Mint', 'Ubuntu',
    'Word / Excel',
  ];

  counts: Record<string, number> = {};

  barColor(level: number): string {
    return level >= 85 ? 'var(--accent)' : level >= 72 ? 'var(--primary)' : 'var(--secondary)';
  }

  startCount(skill: Skill, index: number) {
    if (this.counts[skill.name]) return;
    const duration = 1400;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      this.counts[skill.name] = Math.round(eased * skill.level);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}
