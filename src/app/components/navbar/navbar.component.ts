import {
  Component, signal, HostListener, inject, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface NavLink {
  label: string;
  fragment: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header
      [class]="scrolled()
        ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#3d2a1a]/95 backdrop-blur-md shadow-lg shadow-black/20'
        : 'fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent'"
    >
      <nav class="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">

        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-3 group">
          <span class="text-2xl">🐎</span>
          <div class="flex flex-col leading-tight">
            <span class="font-heading text-xl font-semibold tracking-widest text-white group-hover:text-gold-400 transition-colors duration-300">
              ÉQUINOXE
            </span>
            <span class="font-body text-xs tracking-[0.4em] text-white/60 uppercase">
              Évasion
            </span>
          </div>
        </a>

        <!-- Desktop Links -->
        <ul class="hidden lg:flex items-center gap-8">
          @for (link of navLinks; track link.fragment) {
            <li>
              <a
                [routerLink]="link.route"
                [fragment]="link.fragment !== link.route.slice(1) ? link.fragment : undefined"
                class="font-body text-sm tracking-widest uppercase text-white/80 hover:text-gold-400 transition-colors duration-300 relative group"
              >
                {{ link.label }}
                <span class="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
          }
        </ul>

        <!-- CTA -->
        <div class="hidden lg:flex items-center gap-4">
          <a
            routerLink="/"
            fragment="contact"
            class="px-6 py-2.5 border border-gold-400 text-gold-400 text-sm tracking-widest uppercase font-body hover:bg-gold-400 hover:text-white transition-all duration-300"
          >
            Réserver
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="lg:hidden flex flex-col gap-1.5 p-2"
          (click)="toggleMenu()"
          aria-label="Menu"
        >
          <span [class]="mobileOpen() ? 'w-6 h-0.5 bg-white rotate-45 translate-y-2 transition-all duration-300' : 'w-6 h-0.5 bg-white transition-all duration-300'"></span>
          <span [class]="mobileOpen() ? 'w-6 h-0.5 bg-white opacity-0 transition-all duration-300' : 'w-6 h-0.5 bg-white transition-all duration-300'"></span>
          <span [class]="mobileOpen() ? 'w-6 h-0.5 bg-white -rotate-45 -translate-y-2 transition-all duration-300' : 'w-6 h-0.5 bg-white transition-all duration-300'"></span>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div
        [class]="mobileOpen()
          ? 'lg:hidden bg-[#3d2a1a]/98 backdrop-blur-lg border-t border-white/10 px-6 py-8 flex flex-col gap-6 transition-all duration-300'
          : 'lg:hidden max-h-0 overflow-hidden transition-all duration-300'"
      >
        @for (link of navLinks; track link.fragment) {
          <a
            [routerLink]="link.route"
            [fragment]="link.fragment"
            (click)="toggleMenu()"
            class="font-body text-base tracking-widest uppercase text-white/80 hover:text-gold-400 transition-colors duration-300"
          >
            {{ link.label }}
          </a>
        }
        <a
          routerLink="/"
          fragment="contact"
          (click)="toggleMenu()"
          class="mt-2 px-6 py-3 border border-gold-400 text-gold-400 text-sm tracking-widest uppercase text-center hover:bg-gold-400 hover:text-white transition-all duration-300"
        >
          Réserver
        </a>
      </div>
    </header>
  `,
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);

  scrolled = signal(false);
  mobileOpen = signal(false);

  navLinks: NavLink[] = [
    { label: 'Accueil', fragment: 'hero', route: '/' },
    { label: 'Activités', fragment: 'activities', route: '/' },
    { label: 'Nos Séjours', fragment: 'pricing', route: '/' },
    { label: 'Galerie', fragment: 'gallery', route: '/' },
    { label: 'Témoignages', fragment: 'testimonials', route: '/' },
    { label: 'Contact', fragment: 'contact', route: '/' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 60);
    }
  }

  toggleMenu(): void {
    this.mobileOpen.update((v) => !v);
  }
}
