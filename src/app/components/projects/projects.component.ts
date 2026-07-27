import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InViewDirective } from '../../directives/in-view.directive';
import { SVG_ICONS } from '../../utils/icons';

interface Project {
  title: string;
  shortDesc: string;
  fullDesc: string;
  tech: string[];
  category: string;
  accent: string;
  icon: string;
  status: string;
  image: string;
  link: string | null;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, InViewDirective],
  template: `
    <section id="projects" class="projects">
      <div class="bg-glow"></div>
      <div class="max-w">

        <div class="reveal" data-reveal="fade-up" appInView style="margin-bottom:24px;">
          <div class="section-pretitle"><div class="line"></div><span>03 · PROJETS</span></div>
          <h2 class="section-title">Réalisations</h2>
        </div>

        <p class="hint reveal" data-reveal="fade-up-sm" appInView>↻ SURVOLER UNE CARTE POUR VOIR LES DÉTAILS</p>

        <div class="cards-grid">
          @for (p of projects; track p.title; let i = $index) {
            <div class="reveal card-perspective" [attr.data-reveal]="i % 2 === 0 ? 'tilt' : 'tilt-rev'" appInView [style.--d]="((i % 3) * 0.12) + 's'">
              <div class="flip-outer">
                <div class="flip-inner">

                  <!-- FRONT -->
                  <div class="face front">
                    <div class="corner-glow" [style.background]="'radial-gradient(circle at top right, ' + p.accent + '20, transparent 70%)'"></div>

                    <div class="thumb">
                      <img [src]="p.image" [alt]="p.title" loading="lazy" />
                      <div class="thumb-fade" [style.background]="'linear-gradient(to top, var(--card) 0%, transparent 60%)'"></div>
                    </div>

                    <div class="front-body">
                      <div class="top-row">
                        <span class="icon" [innerHTML]="p.icon"></span>
                        <div class="badges">
                          <span class="cat" [style.color]="p.accent" [style.borderColor]="p.accent + '50'" [style.background]="p.accent + '08'">{{ p.category }}</span>
                          <span class="status"><span class="dot-ic" [innerHTML]="SVG_ICONS.dot"></span> {{ p.status }}</span>
                        </div>
                      </div>

                      <h3 class="title">{{ p.title }}</h3>
                      <p class="desc">{{ p.shortDesc }}</p>

                      <div class="tech-row">
                        @for (t of p.tech; track t) { <span class="tech">{{ t }}</span> }
                      </div>
                    </div>

                    <div class="flip-hint" [style.color]="p.accent + '90'">SURVOLER <span class="refresh-ic" [innerHTML]="SVG_ICONS.refresh"></span></div>
                    <div class="bottom-accent" [style.background]="'linear-gradient(90deg, ' + p.accent + ', transparent)'"></div>
                  </div>

                  <!-- BACK -->
                  <div class="face back" [style.background]="'linear-gradient(135deg, ' + p.accent + '12 0%, rgba(10,10,24,0.98) 60%)'" [style.borderColor]="p.accent + '45'">
                    <div class="back-grid" [style.backgroundImage]="'linear-gradient(' + p.accent + '08 1px, transparent 1px), linear-gradient(90deg, ' + p.accent + '08 1px, transparent 1px)'"></div>

                    <div class="back-top">
                      <div class="back-head">
                        <span class="icon-sm" [innerHTML]="p.icon"></span>
                        <h3 class="back-title" [style.color]="p.accent">{{ p.title }}</h3>
                      </div>
                      <p class="full-desc">{{ p.fullDesc }}</p>
                    </div>

                    <div class="back-bottom">
                      <p class="stack-label" [style.color]="p.accent">STACK TECHNIQUE</p>
                      <div class="tech-row back-tech">
                        @for (t of p.tech; track t) {
                          <span [style.color]="p.accent" [style.background]="p.accent + '12'" [style.borderColor]="p.accent + '40'">{{ t }}</span>
                        }
                      </div>

                      @if (p.link) {
                        <a [href]="p.link" target="_blank" rel="noopener" class="link-btn" [style.borderColor]="p.accent" [style.color]="p.accent">
                          Voir le site en ligne <span class="ext-ic" [innerHTML]="SVG_ICONS.externalLink"></span>
                        </a>
                      } @else {
                        <div class="private-badge"><span class="lock-ic" [innerHTML]="SVG_ICONS.lock"></span> Projet privé — accès sur demande</div>
                      }

                      <div class="brand" [style.color]="p.accent + '60'" [style.borderColor]="p.accent + '20'">RÉALISÉ AVEC DiGiVERSE · COTONOU</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .projects { position: relative; padding: 112px 0; overflow: hidden; }
    @media (min-width: 768px) { .projects { padding: 144px 0; } }
    .bg-glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,200,255,0.025) 0%, transparent 70%); }
    .hint { margin-bottom: 48px; font-family: var(--font-mono); font-size: 11px; color: var(--muted-foreground); letter-spacing: 0.1em; }

    .cards-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
    @media (min-width: 768px) { .cards-grid { grid-template-columns: 1fr 1fr; } }
    @media (min-width: 1280px) { .cards-grid { grid-template-columns: 1fr 1fr 1fr; } }

    .card-perspective { perspective: 1100px; height: 420px; }
    .flip-outer { width: 100%; height: 100%; position: relative; }
    .flip-inner {
      position: relative; width: 100%; height: 100%; transform-style: preserve-3d;
      transition: transform 0.65s cubic-bezier(0.25,0.1,0.25,1); cursor: pointer;
    }
    .card-perspective:hover .flip-inner { transform: rotateY(180deg); }

    .face {
      position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden;
      border: 1px solid var(--border); display: flex; flex-direction: column; overflow: hidden;
    }
    .face.front { background: var(--card); }
    .corner-glow { position: absolute; top: 0; right: 0; width: 80px; height: 80px; pointer-events: none; }

    .thumb { position: relative; height: 140px; flex-shrink: 0; overflow: hidden; }
    .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
    .card-perspective:hover .thumb img { transform: scale(1.06); }
    .thumb-fade { position: absolute; inset: 0; }

    .front-body { padding: 20px 24px 8px; display: flex; flex-direction: column; flex: 1; }
    .top-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
    .icon { width: 32px; height: 32px; color: var(--foreground); }
    .icon svg { width: 100%; height: 100%; }
    .dot-ic { display: inline-block; width: 8px; height: 8px; vertical-align: middle; }
    .lock-ic { display: inline-block; width: 12px; height: 12px; vertical-align: middle; margin-right: 4px; }
    .badges { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
    .cat { font-family: var(--font-mono); font-size: 9px; border: 1px solid; padding: 2px 6px; letter-spacing: 0.1em; }
    .status { font-family: var(--font-mono); font-size: 8px; color: var(--accent); letter-spacing: 0.1em; animation: hud-blink 2s ease-in-out infinite; }

    .title { font-family: var(--font-display); font-size: clamp(1.05rem, 1.8vw, 1.3rem); font-weight: 600; color: var(--foreground); line-height: 1.15; margin-bottom: 10px; }
    .desc { font-size: 12.5px; line-height: 1.55; color: var(--muted-foreground); flex: 1; margin-bottom: 16px; }
    .tech-row { display: flex; flex-wrap: wrap; gap: 6px; }
    .tech { font-family: var(--font-mono); font-size: 10px; color: var(--muted-foreground); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 2px 8px; }

    .flip-hint { position: absolute; bottom: 10px; right: 14px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.1em; }
    .refresh-ic { display: inline-block; width: 10px; height: 10px; vertical-align: middle; }
    .ext-ic { display: inline-block; width: 12px; height: 12px; vertical-align: middle; margin-left: 4px; }
    .bottom-accent { position: absolute; bottom: 0; left: 0; height: 2px; width: 100%; opacity: 0.5; }

    .face.back { transform: rotateY(180deg); padding: 24px; justify-content: space-between; border-width: 1px; border-style: solid; }
    .back-grid { position: absolute; inset: 0; background-size: 24px 24px; pointer-events: none; }
    .back-top { position: relative; }
    .back-head { display: flex; gap: 8px; align-items: center; margin-bottom: 14px; }
    .icon-sm { width: 20px; height: 20px; color: var(--foreground); }
    .icon-sm svg { width: 100%; height: 100%; }
    .back-title { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; line-height: 1; }
    .full-desc { font-size: 12px; line-height: 1.65; color: var(--muted-foreground); }

    .back-bottom { position: relative; }
    .stack-label { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.15em; margin-bottom: 8px; }
    .back-tech { margin-bottom: 14px; }
    .back-tech span { font-family: var(--font-mono); font-size: 10.5px; border: 1px solid; padding: 3px 9px; font-weight: 500; }

    .link-btn {
      display: inline-block; margin-bottom: 12px; padding: 7px 14px; font-family: var(--font-mono);
      font-size: 10.5px; letter-spacing: 0.08em; border: 1px solid; transition: all 0.25s ease;
    }
    .link-btn:hover { background: rgba(255,255,255,0.06); }
    .private-badge {
      margin-bottom: 12px; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.05em;
      color: var(--muted-foreground); border: 1px dashed var(--border); padding: 6px 10px; display: inline-block;
    }
    .brand { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.15em; border-top: 1px solid; padding-top: 8px; }
  `],
})
export class ProjectsComponent {
  protected readonly SVG_ICONS = SVG_ICONS;
  projects: Project[] = [
    {
      title: 'Site DIGIVERSE Technologie',
      shortDesc: "Site vitrine officiel de l'entreprise DiGiVERSE — services, portfolio et contact.",
      fullDesc: "Conception et développement du site vitrine de DiGiVERSE Technologie : présentation des services (dev web/mobile, design, formations), portfolio de réalisations et prise de contact rapide.",
      tech: ['Vue.js', 'Design UI/UX', 'Vercel'],
      category: 'WEB · VITRINE',
      accent: '#00c8ff',
      icon: SVG_ICONS.globe,
      status: 'DÉPLOYÉ',
      image: 'assets/images/projects/digiverse.svg',
      link: 'https://digiversebenin.vercel.app/',
    },
    {
      title: 'Marathon Commercial',
      shortDesc: 'Landing page événementielle avec paiement intégré · Elite Akossiwa.',
      fullDesc: 'Landing page pour le Marathon Commercial de Cotonou — inscription en ligne, système de paiement sécurisé, tableau de bord admin en temps réel.',
      tech: ['Next.js', 'Node.js', 'Supabase'],
      category: 'E-COMMERCE · ÉVÉNEMENT',
      accent: '#00ffaa',
      icon: SVG_ICONS.activity,
      status: 'DÉPLOYÉ',
      image: 'assets/images/projects/marathon-commercial.svg',
      link: 'https://marathon-commercial-de-cotonou.vercel.app/',
    },
    {
      title: 'Radio SRTB Platform',
      shortDesc: 'Site vitrine + suivi en temps réel des programmes radio de la SRTB.',
      fullDesc: "Développement de 2 sites : présentation des émissions programmées de la Radio Bénin (SRTB) et plateforme de suivi live des programmes en temps réel.",
      tech: ['HTML5', 'Bootstrap', 'JavaScript'],
      category: 'WEB · MÉDIAS',
      accent: '#00c8ff',
      icon: SVG_ICONS.radio,
      status: 'DÉPLOYÉ',
      image: 'assets/images/projects/radio-srtb.svg',
      link: null,
    },
    {
      title: 'ArchiDoc GED',
      shortDesc: 'Logiciel de gestion électronique de documents — archivage & traçabilité.',
      fullDesc: "Système complet de GED : archivage structuré, recherche intelligente, historique de modifications et gestion des droits d'accès par profils utilisateurs.",
      tech: ['Angular', 'Spring Boot', 'PostgreSQL'],
      category: 'LOGICIEL ENTREPRISE',
      accent: '#7b2fff',
      icon: SVG_ICONS.folder,
      status: 'EN PRODUCTION',
      image: 'assets/images/projects/archidoc-ged.svg',
      link: null,
    },
    {
      title: 'Clinique & Pharmacie',
      shortDesc: 'Logiciel complet de gestion sanitaire — patients, prescriptions, stock.',
      fullDesc: 'Gestion patients, dossiers médicaux, rendez-vous, prescriptions, stock de pharmacie et facturation — interface intuitive pour le personnel soignant.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      category: 'SANTÉ · LOGICIEL',
      accent: '#00c8ff',
      icon: SVG_ICONS.hospital,
      status: 'LIVRÉ',
      image: 'assets/images/projects/clinique-pharmacie.svg',
      link: null,
    },
    {
      title: 'Site Tramarq',
      shortDesc: 'Site vitrine institutionnel présentant les services et produits.',
      fullDesc: "Conception et développement d'un site vitrine moderne pour l'entreprise Tramarq — présentation des services, galerie produits et formulaire de contact.",
      tech: ['Wix', 'Design', 'SEO'],
      category: 'WEB · VITRINE',
      accent: '#7b2fff',
      icon: SVG_ICONS.building,
      status: 'EN LIGNE',
      image: 'assets/images/projects/site-tramarq.svg',
      link: null,
    },
    {
      title: 'Fondation ORE-OFE',
      shortDesc: 'Site officiel de la fondation — mission, actions et actualités.',
      fullDesc: 'Site institutionnel bilingue pour la Fondation ORE-OFE : présentation de la mission, galerie de projets humanitaires, actualités et formulaire de don.',
      tech: ['Wix', 'Design', 'Contenu'],
      category: 'ONG · FONDATION',
      accent: '#00ffaa',
      icon: SVG_ICONS.globe,
      status: 'EN LIGNE',
      image: 'assets/images/projects/fondation-ore-ofe.svg',
      link: null,
    },
  ];
}
