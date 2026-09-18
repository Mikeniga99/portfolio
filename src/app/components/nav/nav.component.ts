import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { SVG_ICONS } from '../../utils/icons';

interface NavLink {
  href: string;
  label: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      class="nav"
      [class.scrolled]="scrolled()"
      [style.transform]="'translateY(' + navY() + 'px)'"
      [style.opacity]="navOpacity()"
    >
      <div class="max-w bar">
        <a href="#hero" class="logo">M.S.S</a>

        <div class="actions">
          <div class="links">
            @for (l of links; track l.href) {
              <a [href]="l.href">{{ l.label }}</a>
            }
          </div>

          <button class="theme-toggle" (click)="themeService.toggleTheme()" [title]="themeService.isDark() ? 'Passer au mode clair' : 'Passer au mode sombre'">
            <span class="toggle-icon" [innerHTML]="themeService.isDark() ? SVG_ICONS.sun : SVG_ICONS.moon"></span>
          </button>

          <button class="burger" (click)="toggleMenu()" aria-label="Menu">
            <span [class.a]="open()"></span>
            <span [class.b]="open()"></span>
            <span [class.c]="open()"></span>
          </button>
        </div>
      </div>

      <div class="progress" [style.transform]="'scaleX(' + scrollProgress() + ')'"></div>
    </nav>

    <div class="mobile-menu" [class.open]="open()">
      <div class="inner">
        @for (l of links; track l.href) {
          <a [href]="l.href" (click)="closeMenu()">{{ l.label }}</a>
        }
      </div>
    </div>
  `,
  styles: [`
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 50;
      transition: background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease;
      background: transparent;
      animation: nav-in 0.7s cubic-bezier(0.25,0.1,0.25,1);
    }
    @keyframes nav-in {
      from { transform: translateY(-80px); opacity: 0; }
      to   { transform: translateY(0); opacity: 1; }
    }
    .nav.scrolled {
      background: rgba(241, 245, 249, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(15, 23, 42, 0.08);
    }
    .bar { height: 72px; display: flex; align-items: center; justify-content: space-between; }
    @media (min-width: 768px) { .bar { height: 80px; } }
    .logo {
      font-family: var(--font-display); font-weight: 700; font-size: 22px;
      letter-spacing: 0.18em; color: var(--primary); flex-shrink: 0;
    }
    @media (min-width: 768px) { .logo { font-size: 24px; letter-spacing: 0.2em; } }
    .actions { display: flex; align-items: center; gap: 14px; }

    .theme-toggle {
      background: rgba(15, 23, 42, 0.05); border: 1px solid rgba(15, 23, 42, 0.1);
      width: 38px; height: 38px; border-radius: 50%; display: flex;
      align-items: center; justify-content: center; cursor: pointer;
      color: var(--foreground); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative; z-index: 60;
    }
    body.dark .theme-toggle {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
      color: var(--primary);
    }
    .theme-toggle:hover {
      transform: rotate(12deg) scale(1.1);
      background: var(--primary);
      color: var(--primary-foreground);
      border-color: var(--primary);
      box-shadow: 0 0 15px var(--ring);
    }
    .toggle-icon { width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; }
    .toggle-icon svg { width: 100%; height: 100%; display: block; }

    .links { display: none; align-items: center; gap: 18px; }
    .links a {
      font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--muted-foreground);
      transition: color 0.2s ease; white-space: nowrap;
    }
    .links a:hover { color: var(--primary); }

    .burger {
      display: flex; flex-direction: column; gap: 6px; padding: 6px;
      background: none; border: none; cursor: pointer; flex-shrink: 0;
    }
    .burger span {
      display: block; height: 2px; width: 26px; background: var(--primary);
      transition: transform 0.2s ease, opacity 0.2s ease;
    }
    .burger span.a { transform: rotate(45deg) translate(6px, 8px); }
    .burger span.b { opacity: 0; }
    .burger span.c { transform: rotate(-45deg) translate(6px, -8px); }

    @media (min-width: 860px) {
      .links { display: flex; }
      .burger { display: none; }
      .mobile-menu { display: none; }
    }
    @media (min-width: 1024px) {
      .links { gap: 28px; }
      .links a { font-size: 13px; letter-spacing: 0.15em; }
    }

    .progress {
      position: absolute; bottom: 0; left: 0; height: 1px; width: 100%;
      transform-origin: left; background: linear-gradient(90deg, var(--primary), var(--secondary));
      transition: transform 0.1s linear;
    }

    .mobile-menu {
      position: fixed; top: 72px; left: 0; right: 0; z-index: 40;
      overflow: hidden; max-height: 0; opacity: 0;
      background: rgba(241, 245, 249, 0.98); backdrop-filter: blur(20px);
      transition: max-height 0.3s cubic-bezier(0.25,0.1,0.25,1), opacity 0.3s ease;
      border-bottom: 1px solid var(--border);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    }
    @media (min-width: 768px) { .mobile-menu { top: 80px; } }
    body.dark .mobile-menu { background: rgba(4, 4, 10, 0.98); }
    .mobile-menu.open { max-height: 400px; opacity: 1; }
    .mobile-menu .inner { display: flex; flex-direction: column; padding: 16px 24px; }
    .mobile-menu a {
      padding: 14px 0; font-family: var(--font-mono); font-size: 13px;
      letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted-foreground);
      border-bottom: 1px solid var(--border);
    }
  `],
})
export class NavComponent {
  themeService = inject(ThemeService);
  protected readonly SVG_ICONS = SVG_ICONS;

  links: NavLink[] = [
    { href: '#about', label: 'À propos' },
    { href: '#experience', label: 'Expérience' },
    { href: '#projects', label: 'Projets' },
    { href: '#education', label: 'Formation' },
    { href: '#contact', label: 'Contact' },
  ];

  scrolled = signal(false);
  open = signal(false);
  scrollProgress = signal(0);
  navY = signal(0);
  navOpacity = signal(1);

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 40);
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    this.scrollProgress.set(max > 0 ? window.scrollY / max : 0);
  }

  toggleMenu() {
    this.open.set(!this.open());
  }

  closeMenu() {
    this.open.set(false);
  }
}
