import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';

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

        <div class="links">
          @for (l of links; track l.href) {
            <a [href]="l.href">{{ l.label }}</a>
          }
        </div>

        <button class="burger" (click)="toggleMenu()" aria-label="Menu">
          <span [class.a]="open()"></span>
          <span [class.b]="open()"></span>
          <span [class.c]="open()"></span>
        </button>
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
      background: rgba(4,4,10,0.92);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0,200,255,0.08);
    }
    .bar { height: 80px; display: flex; align-items: center; justify-content: space-between; }
    .logo {
      font-family: var(--font-display); font-weight: 700; font-size: 24px;
      letter-spacing: 0.2em; color: var(--primary);
    }
    .links { display: none; align-items: center; gap: 40px; }
    .links a {
      font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.15em;
      text-transform: uppercase; color: var(--muted-foreground);
      transition: color 0.2s ease;
    }
    .links a:hover { color: var(--primary); }

    .burger {
      display: flex; flex-direction: column; gap: 8px; padding: 10px;
      background: none; border: none; cursor: pointer;
    }
    .burger span {
      display: block; height: 2px; width: 30px; background: var(--primary);
      transition: transform 0.2s ease, opacity 0.2s ease;
    }
    .burger span.a { transform: rotate(45deg) translate(6px, 8px); }
    .burger span.b { opacity: 0; }
    .burger span.c { transform: rotate(-45deg) translate(6px, -8px); }

    @media (min-width: 768px) {
      .links { display: flex; }
      .burger { display: none; }
      .mobile-menu { display: none; }
    }

    .progress {
      position: absolute; bottom: 0; left: 0; height: 1px; width: 100%;
      transform-origin: left; background: linear-gradient(90deg, var(--primary), var(--secondary));
      transition: transform 0.1s linear;
    }

    .mobile-menu {
      position: fixed; top: 80px; left: 0; right: 0; z-index: 40;
      overflow: hidden; max-height: 0; opacity: 0;
      background: rgba(4,4,10,0.96); backdrop-filter: blur(20px);
      transition: max-height 0.3s cubic-bezier(0.25,0.1,0.25,1), opacity 0.3s ease;
    }
    .mobile-menu.open { max-height: 400px; opacity: 1; }
    .mobile-menu .inner { display: flex; flex-direction: column; padding: 16px 24px; }
    .mobile-menu a {
      padding: 12px 0; font-family: var(--font-mono); font-size: 14px;
      letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted-foreground);
      border-bottom: 1px solid var(--border);
    }
  `],
})
export class NavComponent {
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
