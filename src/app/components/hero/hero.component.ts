import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild, signal } from '@angular/core';
import { SVG_ICONS } from '../../utils/icons';

interface FloatDot { x: string; y: string; size: number; delay: number; col: number; }
interface Cube { top?: string; bottom?: string; left?: string; right?: string; size: number; color: string; speed: number; opacity: number; hide?: string; }

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section #heroSection id="hero" class="hero">

      <!-- TRON FLOOR GRID -->
      <div class="floor-wrap">
        <div class="floor-grid"></div>
        <div class="horizon-glow"></div>
      </div>

      <!-- BACKGROUND VERTICAL GRID + GLOW (parallax) -->
      <div class="bg-parallax" [style.transform]="'translateY(' + bgY() + 'px)'">
        <div class="bg-grid"></div>
        <div class="bg-glow1"></div>
        <div class="bg-glow2"></div>
      </div>

      <!-- MOVING SCANLINE -->
      <div class="scanline"></div>

      <!-- STATIC SCANLINE OVERLAY -->
      <div class="static-scanlines"></div>

      <!-- FLOATING WIREFRAME CUBES -->
      @for (c of cubes; track $index) {
        <div class="cube-holder" [class]="c.hide || ''"
             [style.top]="c.top" [style.bottom]="c.bottom" [style.left]="c.left" [style.right]="c.right"
             [style.opacity]="c.opacity" [style.perspective.px]="c.size * 8">
          <div class="wire-cube" [style.width.px]="c.size" [style.height.px]="c.size"
               [style.animation]="'cube-spin ' + c.speed + 's linear infinite'">
            <div class="face" [style.width.px]="c.size" [style.height.px]="c.size" [style.border]="'1px solid ' + c.color" [style.background]="c.color + '06'" [style.transform]="'translateZ(' + c.size/2 + 'px)'"></div>
            <div class="face" [style.width.px]="c.size" [style.height.px]="c.size" [style.border]="'1px solid ' + c.color" [style.background]="c.color + '06'" [style.transform]="'translateZ(-' + c.size/2 + 'px) rotateY(180deg)'"></div>
            <div class="face" [style.width.px]="c.size" [style.height.px]="c.size" [style.border]="'1px solid ' + c.color" [style.background]="c.color + '06'" [style.transform]="'rotateY(90deg) translateZ(' + c.size/2 + 'px)'"></div>
            <div class="face" [style.width.px]="c.size" [style.height.px]="c.size" [style.border]="'1px solid ' + c.color" [style.background]="c.color + '06'" [style.transform]="'rotateY(-90deg) translateZ(' + c.size/2 + 'px)'"></div>
            <div class="face" [style.width.px]="c.size" [style.height.px]="c.size" [style.border]="'1px solid ' + c.color" [style.background]="c.color + '06'" [style.transform]="'rotateX(90deg) translateZ(' + c.size/2 + 'px)'"></div>
            <div class="face" [style.width.px]="c.size" [style.height.px]="c.size" [style.border]="'1px solid ' + c.color" [style.background]="c.color + '06'" [style.transform]="'rotateX(-90deg) translateZ(' + c.size/2 + 'px)'"></div>
          </div>
        </div>
      }

      <!-- HUD CORNER BRACKETS -->
      <div class="hud-bracket tl"></div>
      <div class="hud-bracket tr"></div>
      <div class="hud-bracket bl"></div>
      <div class="hud-bracket br"></div>

      <!-- FLOATING DOTS -->
      @for (d of dots; track $index) {
        <div class="dot"
             [style.left]="d.x" [style.top]="d.y"
             [style.width.px]="d.size * 4" [style.height.px]="d.size * 4"
             [style.background]="dotColors[d.col]"
             [style.boxShadow]="'0 0 ' + (d.size*10) + 'px ' + dotGlow[d.col]"
             [style.animation]="'float-dot ' + (3 + d.delay) + 's ease-in-out infinite ' + d.delay + 's'">
        </div>
      }

      <!-- CONTENT -->
      <div class="content" [style.transform]="'translateY(' + contentY() + 'px)'" [style.opacity]="contentOpacity()">
        <div class="tilt-wrap">
          <div class="tilt" [style.transform]="'rotateX(' + rotX() + 'deg) rotateY(' + rotY() + 'deg)'">
            <div class="max-w">

              <div class="pretitle">
                <div class="line"></div>
                <span class="ptag">PORTFOLIO · ANALYSTE PROGRAMMEUR</span>
                <span class="online"><span class="on-ic" [innerHTML]="SVG_ICONS.dot"></span> ONLINE</span>
              </div>

              <div class="firstname-wrap">
                <div class="firstname">
                  @for (ch of nameLetters; track $index; let i = $index) {
                    <span class="letter" [style.animationDelay]="(0.52 + i * 0.026) + 's'" [style.whiteSpace]="ch === ' ' ? 'pre' : 'normal'">{{ ch === ' ' ? '\u00A0' : ch }}</span>
                  }
                </div>
              </div>

              <div class="lastname-wrap">
                <h1 class="lastname">SOSSOU</h1>
              </div>

              <div class="role">
                <div class="line role-line"></div>
                <span>DIRECTEUR GÉNÉRAL · DIGIVERSE · COTONOU, BÉNIN</span>
              </div>

              <p class="tagline">
                Développement web &amp; mobile · Conception graphique · Formations numériques.<br />
                Maîtrise du cycle complet de développement, de l'analyse au déploiement.
              </p>

              <div class="cta">
                <a href="#projects" class="btn btn-outline">Voir les projets →</a>
                <a href="https://wa.me/2290199931715?text=Bonjour%20Mikel,%20je%20viens%20de%20voir%20votre%20portfolio%20et%20j'aimerais%20discuter%20avec%20vous." target="_blank" class="btn btn-fill">Me contacter</a>
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  `,
  styles: [`
    .hero {
      position: relative; min-height: 100vh; min-height: 100svh;
      display: flex; align-items: center; overflow: hidden;
      padding: 110px 0 60px;
    }
    @media (min-width: 1024px) {
      .hero { height: 100vh; padding: 0; }
    }
    .max-w { max-width: 1280px; margin: 0 auto; padding: 0 16px; width: 100%; }
    @media (min-width: 480px) { .max-w { padding: 0 24px; } }
    @media (min-width: 1024px) { .max-w { padding: 0 48px; } }

    /* Floor grid */
    .floor-wrap { position: absolute; inset-inline: 0; bottom: 0; height: 55%; pointer-events: none; overflow: hidden; }
    .floor-grid {
      position: absolute; bottom: 0; left: -60%; width: 220%; height: 100%;
      background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 80px 80px;
      transform: perspective(480px) rotateX(72deg);
      transform-origin: bottom center;
      animation: grid-scroll 2.4s linear infinite;
      -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 75%);
      mask-image: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 75%);
    }
    .horizon-glow {
      position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, transparent 0%, var(--primary) 30%, var(--secondary) 70%, transparent 100%);
      filter: blur(2px); opacity: 0.3;
    }
    body.dark .horizon-glow { opacity: 0.7; }

    .bg-parallax { position: absolute; inset: 0; pointer-events: none; transition: transform 0.05s linear; }
    .bg-grid {
      position: absolute; inset: 0;
      background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 80px 80px;
      opacity: 0.5;
    }
    body.dark .bg-grid { opacity: 1; }
    .bg-glow1 { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 55% at 50% 35%, var(--ring) 0%, transparent 70%); opacity: 0.2; }
    body.dark .bg-glow1 { opacity: 0.4; }
    .bg-glow2 { position: absolute; inset: 0; background: radial-gradient(ellipse 50% 40% at 80% 70%, var(--secondary) 0%, transparent 60%); opacity: 0.05; }
    body.dark .bg-glow2 { opacity: 0.15; }

    .scanline {
      position: absolute; inset-inline: 0; z-index: 30; pointer-events: none; height: 2px;
      background: linear-gradient(90deg, transparent 0%, var(--primary) 30%, var(--secondary) 70%, transparent 100%);
      filter: blur(1px); opacity: 0.3;
      animation: scanline-move 7s linear infinite;
    }
    body.dark .scanline { opacity: 0.55; }
    .static-scanlines {
      position: absolute; inset: 0; pointer-events: none; z-index: 5;
      background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, var(--foreground) 3px, var(--foreground) 4px);
      opacity: 0.03;
    }

    .cube-holder { position: absolute; pointer-events: none; z-index: 6; }
    .wire-cube { position: relative; transform-style: preserve-3d; }
    .face { position: absolute; }
    @media (max-width: 767px) { .hide-md { display: none; } }
    @media (max-width: 1023px) { .hide-lg { display: none; } }
    @media (max-width: 1279px) { .hide-xl { display: none; } }

    .hud-bracket {
      position: absolute; pointer-events: none; width: 28px; height: 28px;
      animation: bracket-pulse 2.8s ease-in-out infinite, hud-in 0.4s cubic-bezier(0.25,0.1,0.25,1) 1.8s backwards;
      z-index: 15;
    }
    @keyframes hud-in { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
    .hud-bracket.tl { left: 18px; top: 70px; border-top: 2px solid var(--primary); border-left: 2px solid var(--primary); opacity: 0.4; }
    .hud-bracket.tr { right: 18px; top: 70px; border-top: 2px solid var(--primary); border-right: 2px solid var(--primary); opacity: 0.4; }
    .hud-bracket.bl { left: 18px; bottom: 70px; border-bottom: 2px solid var(--primary); border-left: 2px solid var(--primary); opacity: 0.4; }
    .hud-bracket.br { right: 18px; bottom: 70px; border-bottom: 2px solid var(--primary); border-right: 2px solid var(--primary); opacity: 0.4; }
    @media (max-width: 767px) { .hud-bracket { display: none; } }

    .dot { position: absolute; border-radius: 50%; pointer-events: none; z-index: 6; }

    .content { position: relative; width: 100%; z-index: 20; transition: transform 0.05s linear; }
    .tilt-wrap { perspective: 1100px; }
    .tilt { transform-style: preserve-3d; transition: transform 0.15s ease-out; }

    .pretitle { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; animation: fade-up 0.6s cubic-bezier(0.25,0.1,0.25,1) 0.3s backwards; }
    .pretitle .line { height: 1px; width: 32px; background: var(--primary); }
    .ptag { color: var(--primary); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em; }
    .online { color: var(--accent); font-family: var(--font-mono); font-size: 10px; animation: hud-blink 1.4s ease-in-out infinite; display: flex; align-items: center; gap: 4px; }
    .on-ic { width: 8px; height: 8px; }

    .firstname-wrap, .lastname-wrap { overflow: hidden; }
    .firstname-wrap { margin-bottom: 4px; }
    .lastname-wrap { margin-bottom: 24px; }
    .firstname {
      display: flex; flex-wrap: wrap; row-gap: 2px;
      animation: slide-up-name 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.5s backwards;
    }
    @keyframes slide-up-name { from { transform: translateY(110%); } to { transform: translateY(0); } }
    .letter {
      font-family: var(--font-display); font-size: clamp(1rem, 3.8vw, 3.2rem); font-weight: 300;
      letter-spacing: clamp(0.04em, 1.2vw, 0.14em); color: var(--foreground); line-height: 1.1;
      opacity: 0; animation: letter-in 0.5s ease forwards;
      animation-delay: inherit;
      --letter-opacity: 0.35;
    }
    body.dark .letter { --letter-opacity: 0.42; }
    @keyframes letter-in { to { opacity: var(--letter-opacity); } }

    .lastname {
      font-family: var(--font-display); font-size: clamp(2.8rem, 11vw, 9.5rem); font-weight: 700;
      line-height: 0.92; letter-spacing: -0.02em; word-break: break-word;
      background: linear-gradient(135deg, var(--foreground) 18%, var(--primary) 52%, var(--secondary) 100%);
      -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
      display: inline-block;
      animation: name-glitch 6s infinite, slide-up-name 0.9s cubic-bezier(0.25,0.1,0.25,1) 0.65s backwards;
    }

    .role { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; animation: fade-up 0.6s cubic-bezier(0.25,0.1,0.25,1) 1s backwards; }
    .role-line { width: 24px; flex-shrink: 0; background: linear-gradient(90deg, var(--primary), transparent); }
    .role span { font-family: var(--font-mono); font-size: clamp(0.68rem, 1.3vw, 0.78rem); color: var(--muted-foreground); letter-spacing: 0.12em; line-height: 1.4; }

    .tagline { max-width: 34rem; font-size: 14px; line-height: 1.7; margin-bottom: 32px; color: var(--muted-foreground); animation: fade-up 0.6s cubic-bezier(0.25,0.1,0.25,1) 1.1s backwards; }

    .cta { display: flex; gap: 12px; flex-wrap: wrap; animation: fade-up 0.6s cubic-bezier(0.25,0.1,0.25,1) 1.3s backwards; }
    .btn {
      padding: 12px 24px; font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase;
      font-family: var(--font-mono); transition: all 0.3s ease; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; text-align: center;
    }
    @media (max-width: 480px) {
      .cta { flex-direction: column; width: 100%; }
      .btn { width: 100%; }
    }
    @media (min-width: 768px) {
      .btn { padding: 12px 32px; font-size: 12px; letter-spacing: 0.2em; }
    }
    .btn-outline { border: 1px solid var(--border); color: var(--foreground); background: transparent; }
    .btn-outline:hover { color: var(--primary-foreground); background: var(--primary); border-color: var(--primary); box-shadow: 0 10px 20px var(--ring); }
    .btn-fill { background: var(--primary); color: var(--primary-foreground); }
    .btn-fill:hover { background: var(--secondary); color: #fff; box-shadow: 0 10px 20px var(--ring); }

  `],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  protected readonly SVG_ICONS = SVG_ICONS;

  nameLetters = 'MIKEL SHRÖDINGUER'.split('');
  dotColors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
  dotGlow = ['var(--ring)', 'var(--secondary)', 'var(--accent)'];

  dots: FloatDot[] = [
    { x: '14%', y: '22%', size: 1, delay: 0, col: 0 },
    { x: '84%', y: '18%', size: 2, delay: 0.5, col: 1 },
    { x: '73%', y: '58%', size: 1.5, delay: 1.0, col: 0 },
    { x: '7%', y: '68%', size: 1, delay: 1.5, col: 1 },
    { x: '57%', y: '78%', size: 2, delay: 0.3, col: 2 },
    { x: '91%', y: '44%', size: 1, delay: 0.8, col: 0 },
    { x: '36%', y: '10%', size: 1.5, delay: 1.2, col: 1 },
    { x: '26%', y: '86%', size: 1, delay: 0.6, col: 2 },
  ];

  cubes: Cube[] = [
    { top: '96px', right: '80px', size: 55, color: 'var(--primary)', speed: 9, opacity: 0.15 },
    { top: '144px', left: '48px', size: 22, color: 'var(--accent)', speed: 13, opacity: 0.1 },
    { bottom: '144px', right: '192px', size: 36, color: 'var(--secondary)', speed: 6, opacity: 0.12, hide: 'hide-md' },
    { bottom: '192px', left: '128px', size: 18, color: 'var(--primary)', speed: 16, opacity: 0.08, hide: 'hide-lg' },
    { top: '224px', right: '320px', size: 42, color: 'var(--accent)', speed: 11, opacity: 0.08, hide: 'hide-xl' },
  ];

  bgY = signal(0);
  contentY = signal(0);
  contentOpacity = signal(1);
  rotX = signal(0);
  rotY = signal(0);

  private targetRotX = 0;
  private targetRotY = 0;
  private rafId?: number;

  ngAfterViewInit() {
    this.animateTilt();
  }

  ngOnDestroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  @HostListener('window:scroll')
  onScroll() {
    const section = this.heroSection?.nativeElement;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const height = section.offsetHeight;
    const progress = Math.min(Math.max(-rect.top / height, 0), 1);
    this.bgY.set(progress * 28 * (height / 100));
    this.contentY.set(progress * 14 * (height / 100));
    this.contentOpacity.set(Math.max(1 - progress / 0.75, 0));
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const mx = e.clientX / window.innerWidth;
    const my = e.clientY / window.innerHeight;
    this.targetRotY = (mx - 0.5) * 18; // -9..9
    this.targetRotX = (0.5 - my) * 12; // -6..6 flipped for correct feel
  }

  private animateTilt = () => {
    const curX = this.rotX();
    const curY = this.rotY();
    this.rotX.set(curX + (this.targetRotX - curX) * 0.08);
    this.rotY.set(curY + (this.targetRotY - curY) * 0.08);
    this.rafId = requestAnimationFrame(this.animateTilt);
  };
}
