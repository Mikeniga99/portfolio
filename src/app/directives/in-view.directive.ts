import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

/**
 * Reproduces framer-motion's `whileInView` + `viewport={{ once: true }}` behaviour.
 * Adds the `.in-view` class to the host element the first time it crosses the
 * given viewport margin, then disconnects the observer (once === true by default).
 *
 * Usage:
 *   <div appInView [appInViewMargin]="'-80px'" (appInViewEnter)="onEnter()">...</div>
 */
@Directive({
  selector: '[appInView]',
  standalone: true,
})
export class InViewDirective implements OnInit, OnDestroy {
  @Input() appInViewMargin = '-60px';
  @Input() appInViewOnce = true;
  @Output() appInViewEnter = new EventEmitter<void>();

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'reveal');

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'in-view');
            this.appInViewEnter.emit();
            if (this.appInViewOnce) {
              this.observer?.unobserve(this.el.nativeElement);
            }
          } else if (!this.appInViewOnce) {
            this.renderer.removeClass(this.el.nativeElement, 'in-view');
          }
        }
      },
      { rootMargin: `0px 0px ${this.appInViewMargin} 0px`, threshold: 0.05 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
