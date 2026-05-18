import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-earth-900 text-white">

      <!-- Main Footer -->
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          <!-- Brand -->
          <div class="lg:col-span-1">
            <div class="flex items-center gap-3 mb-6">
              <span class="text-2xl">🐎</span>
              <div class="flex flex-col leading-tight">
                <span class="font-heading text-xl font-semibold tracking-widest text-white">ÉQUINOXE</span>
                <span class="font-body text-xs tracking-[0.4em] text-white/50 uppercase">Évasion</span>
              </div>
            </div>
            <p class="font-body text-white/50 text-sm leading-relaxed mb-8">
              Des aventures équestres authentiques au cœur de la nature française. Vivez l'inoubliable.
            </p>
            <!-- Social Links -->
            <div class="flex gap-4">
              @for (social of socials; track social.name) {
                <a
                  [href]="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="social.name"
                  class="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-400 transition-all duration-300"
                >
                  <span class="text-sm">{{ social.icon }}</span>
                </a>
              }
            </div>
          </div>

          <!-- Navigation -->
          <div>
            <h4 class="font-body text-xs tracking-widest uppercase text-gold-400 mb-6">Navigation</h4>
            <ul class="space-y-3">
              @for (link of navLinks; track link.label) {
                <li>
                  <a
                    [routerLink]="link.route"
                    [fragment]="link.fragment"
                    class="font-body text-white/50 text-sm hover:text-white transition-colors duration-300"
                  >
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Activities -->
          <div>
            <h4 class="font-body text-xs tracking-widest uppercase text-gold-400 mb-6">Nos activités</h4>
            <ul class="space-y-3">
              @for (activity of activityLinks; track activity) {
                <li>
                  <span class="font-body text-white/50 text-sm">{{ activity }}</span>
                </li>
              }
            </ul>
          </div>

          <!-- Newsletter -->
          <div>
            <h4 class="font-body text-xs tracking-widest uppercase text-gold-400 mb-6">Newsletter</h4>
            <p class="font-body text-white/50 text-sm leading-relaxed mb-6">
              Recevez nos inspirations, nos offres exclusives et nos actualités.
            </p>
            <form class="flex gap-2" (ngSubmit)="onNewsletterSubmit($event)">
              <input
                type="email"
                placeholder="Votre email"
                class="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-body placeholder-white/30 focus:outline-none focus:border-gold-400 transition-colors"
                aria-label="Email newsletter"
              >
              <button
                type="submit"
                class="px-4 py-2.5 bg-gold-500 text-white text-xs hover:bg-gold-400 transition-colors duration-300"
                aria-label="S'abonner"
              >
                →
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/10">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="font-body text-white/30 text-xs text-center md:text-left">
            © 2026 Équinoxe Évasion. Tous droits réservés.
          </p>
          <div class="flex gap-6">
            @for (legal of legalLinks; track legal.label) {
              <a
                [href]="legal.href"
                class="font-body text-white/30 text-xs hover:text-white/60 transition-colors duration-300"
              >
                {{ legal.label }}
              </a>
            }
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  socials = [
    { name: 'Facebook', icon: 'f', url: 'https://facebook.com' },
    { name: 'Instagram', icon: '▣', url: 'https://instagram.com' },
    { name: 'YouTube', icon: '▷', url: 'https://youtube.com' },
    { name: 'TikTok', icon: '♪', url: 'https://tiktok.com' },
  ];

  navLinks = [
    { label: 'Accueil', route: '/', fragment: 'hero' },
    { label: 'Nos activités', route: '/', fragment: 'activities' },
    { label: 'Galerie', route: '/', fragment: 'gallery' },
    { label: 'Témoignages', route: '/', fragment: 'testimonials' },
    { label: 'Tarifs & Séjours', route: '/', fragment: 'pricing' },
    { label: 'FAQ', route: '/', fragment: 'faq' },
    { label: 'Contact', route: '/', fragment: 'contact' },
  ];

  activityLinks = [
    'Randonnée découverte',
    'Trek multi-jours',
    'Séjour premium',
    'Stage famille',
    'Stage perfectionnement',
    'Nuit sous les étoiles',
  ];

  legalLinks = [
    { label: 'Mentions légales', href: '#' },
    { label: 'Politique de confidentialité', href: '#' },
    { label: 'CGV', href: '#' },
  ];

  onNewsletterSubmit(e: Event): void {
    e.preventDefault();
    // In production: connect to newsletter service
  }
}
