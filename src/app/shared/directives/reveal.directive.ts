import { Directive, ElementRef, OnInit, OnDestroy, inject, input } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private observer!: IntersectionObserver;

  direction = input<'up' | 'left' | 'right'>('up');
  delay = input<number>(0);

  ngOnInit(): void {
    const host = this.el.nativeElement as HTMLElement;
    const cls = this.direction() === 'left'
      ? 'reveal-left'
      : this.direction() === 'right'
        ? 'reveal-right'
        : 'reveal';
    host.classList.add(cls);
    if (this.delay()) {
      host.style.transitionDelay = `${this.delay()}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            host.classList.add('visible');
            this.observer.unobserve(host);
          }
        });
      },
      { threshold: 0.15 }
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
