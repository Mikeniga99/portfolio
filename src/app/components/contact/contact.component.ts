import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InViewDirective } from '../../directives/in-view.directive';
import { SVG_ICONS } from '../../utils/icons';

interface ContactItem {
  label: string;
  value: string;
  href: string | null;
  icon: SafeHtml;
  accent: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, InViewDirective],
  template: `
    <section id="contact" class="contact">
      <div class="grid-bg"></div>
      <div class="radial-bg"></div>

      <div class="max-w rel">
        <div class="reveal" data-reveal="fade-up" appInView style="margin-bottom:64px;">
          <div class="section-pretitle"><div class="line"></div><span>05 · CONTACT</span></div>
          <h2 class="section-title">Travaillons ensemble</h2>
          <p class="lead">Disponible pour des projets freelance, collaborations ou opportunités professionnelles.</p>
        </div>

        <div class="grid">
          <div>
            <div class="items">
              @for (item of items; track item.label; let i = $index) {
                <div class="item-perspective">
                  <div class="reveal contact-item" data-reveal="tilt" appInView [style.--d]="(i * 0.1) + 's'"
                       [style.borderColor]="'var(--border)'"
                       (click)="handleItemClick(item)"
                       [style.cursor]="item.label === 'Localisation' ? 'default' : 'pointer'">
                    <span class="ic" [style.color]="item.accent" [style.borderColor]="item.accent + '40'" [innerHTML]="item.icon"></span>
                    <div>
                      <span class="label">{{ item.label }}</span>
                      <span class="value" [class.link]="item.label !== 'Localisation'">{{ item.value }}</span>
                    </div>
                  </div>
                </div>
              }
            </div>

            <div class="reveal" data-reveal="fade-up" appInView>
              <h3 class="subhead">Centres d'intérêt</h3>
              <div class="interests">
                @for (item of interests; track item; let i = $index) {
                  <span class="reveal chip" data-reveal="scale" appInView [style.--d]="(0.1 + i * 0.08) + 's'">{{ item }}</span>
                }
              </div>
            </div>
          </div>

          <div class="cta-perspective">
            <div class="reveal cta-card" data-reveal="tilt" appInView [style.--d]="'0.2s'">
              <div class="cta-glow"></div>
              <div class="cta-top">
                <h3>Prêt à collaborer ?</h3>
                <p>Que ce soit pour un projet web, mobile, une formation numérique ou une consultation, n'hésitez pas à me contacter. Je réponds sous 24h.</p>
              </div>
              <div class="cta-actions">
                <a href="mailto:mikelsossou1@gmail.com" class="btn">Envoyer un mail</a>
              </div>

              <div class="cta-line reveal-w in-view" appInView [style.--d]="'0.5s'"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact { position: relative; padding: 112px 0; overflow: hidden; }
    @media (min-width: 768px) { .contact { padding: 144px 0; } }
    .grid-bg { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px); background-size: 60px 60px; }
    .radial-bg { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124, 58, 237, 0.04) 0%, transparent 70%); }
    .rel { position: relative; z-index: 10; }
    .lead { margin-top: 16px; font-size: 14px; max-width: 28rem; color: var(--muted-foreground); }

    .grid { display: grid; grid-template-columns: 1fr; gap: 64px; }
    @media (min-width: 1024px) { .grid { grid-template-columns: 1fr 1fr; } }

    .items { display: flex; flex-direction: column; gap: 20px; margin-bottom: 48px; }
    .item-perspective { perspective: 800px; }
    .contact-item {
      display: flex; align-items: center; gap: 20px; padding: 20px; border: 1px solid var(--border);
      background: var(--card); transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.02);
    }
    .contact-item:hover { border-color: var(--primary); background: rgba(2, 132, 199, 0.04); box-shadow: 0 10px 25px rgba(15, 23, 42, 0.05); }
    .ic { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid; flex-shrink: 0; padding: 10px; }
    .ic svg { width: 100%; height: 100%; }
    .label { display: block; font-size: 12px; margin-bottom: 2px; color: var(--muted-foreground); font-family: var(--font-mono); }
    .value { font-size: 14px; color: var(--foreground); }
    .value.link:hover { color: var(--primary); }

    .subhead { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; color: var(--primary); font-family: var(--font-mono); }
    .interests { display: flex; gap: 12px; flex-wrap: wrap; }
    .chip { padding: 8px 16px; border: 1px solid var(--border); font-size: 14px; color: var(--muted-foreground); font-family: var(--font-mono); background: #FFFFFF; }

    .cta-perspective { perspective: 1000px; }
    .cta-card {
      border: 1px solid rgba(2, 132, 199, 0.12); padding: 40px; position: relative; overflow: hidden;
      height: 100%; min-height: 256px; display: flex; flex-direction: column; justify-content: space-between;
      background: linear-gradient(135deg, rgba(2, 132, 199, 0.04) 0%, rgba(124, 58, 237, 0.04) 100%);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.03);
    }
    .cta-glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at 70% 30%, rgba(2, 132, 199, 0.06) 0%, transparent 60%); }
    .cta-top { position: relative; z-index: 10; }
    .cta-top h3 { margin-bottom: 16px; font-family: var(--font-display); font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 700; color: var(--foreground); line-height: 1.1; }
    .cta-top p { font-size: 14px; line-height: 1.7; color: var(--muted-foreground); }
    .cta-actions { position: relative; z-index: 10; margin-top: 32px; display: flex; gap: 16px; flex-wrap: wrap; }
    .btn { padding: 10px 24px; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; font-family: var(--font-mono); background: var(--primary); color: var(--primary-foreground); transition: all 0.3s ease; display: inline-block; }
    .btn:hover { background: var(--secondary); color: #fff; box-shadow: 0 10px 20px rgba(124, 58, 237, 0.2); }
    .cta-line { position: absolute; bottom: 0; left: 0; height: 1px; background: linear-gradient(90deg, var(--primary), var(--secondary), transparent); }
  `],
})
export class ContactComponent {
  private sanitizer = inject(DomSanitizer);
  protected readonly SVG_ICONS = SVG_ICONS;

  items: ContactItem[] = [
    { label: 'Email', value: 'mikelsossou1@gmail.com', href: 'mailto:mikelsossou1@gmail.com', icon: this.sanitizer.bypassSecurityTrustHtml(SVG_ICONS.mail), accent: '#0284C7' },
    { label: 'Téléphone', value: '+229 01 999 317 15', href: 'tel:+2290199931715', icon: this.sanitizer.bypassSecurityTrustHtml(SVG_ICONS.phone), accent: '#7C3AED' },
    { label: 'Localisation', value: 'Cotonou, Bénin', href: null, icon: this.sanitizer.bypassSecurityTrustHtml(SVG_ICONS.mapPin), accent: '#059669' },
  ];

  interests = ['Musique', 'Jeux vidéo', 'Sport'];

  handleItemClick(item: ContactItem) {
    if (item.label === 'Email') {
      window.location.href = 'mailto:mikelsossou1@gmail.com';
    } else if (item.label === 'Téléphone') {
      const choice = window.confirm("Voulez-vous passer un appel direct ?\n\nCliquez sur 'OK' pour appeler, ou 'Annuler' pour envoyer un message WhatsApp.");
      if (choice) {
        window.location.href = 'tel:+2290199931715';
      } else {
        window.open("https://wa.me/2290199931715?text=Bonjour%20Mikel,%20je%20viens%20de%20voir%20votre%20portfolio%20et%20j'aimerais%20discuter%20avec%20vous.", "_blank");
      }
    }
  }
}
