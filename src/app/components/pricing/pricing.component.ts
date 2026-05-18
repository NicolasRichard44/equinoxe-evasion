import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface Package {
  name: string;
  subtitle: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  tag?: string;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="pricing" class="py-28 bg-cream">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-20" appReveal>
          <p class="font-body text-gold-500 text-xs tracking-[0.5em] uppercase mb-4">Nos formules</p>
          <h2 class="font-heading text-earth-900 text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
            Choisissez votre <em class="italic text-earth-600">évasion</em>
          </h2>
          <p class="font-body text-earth-600 text-lg max-w-2xl mx-auto font-light">
            Des formules transparentes, tout inclus. Équipement, encadrement professionnel, hébergement et restauration selon la formule choisie.
          </p>
          <div class="w-16 h-px bg-gold-400 mx-auto mt-8"></div>
        </div>

        <!-- Pricing Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          @for (pkg of packages; track pkg.name; let i = $index) {
            <article
              appReveal
              [delay]="i * 150"
              [class]="pkg.highlighted
                ? 'relative bg-earth-900 text-white p-10 shadow-2xl shadow-earth-900/30 -mt-4 -mb-4'
                : 'relative bg-white p-10 shadow-sm hover:shadow-lg transition-shadow duration-300'"
            >
              <!-- Tag -->
              @if (pkg.tag) {
                <div class="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span class="bg-gold-500 text-white text-xs px-4 py-1.5 tracking-widest uppercase font-body">
                    {{ pkg.tag }}
                  </span>
                </div>
              }

              <!-- Package Name -->
              <div class="mb-8">
                <h3 [class]="pkg.highlighted ? 'font-heading text-2xl text-white mb-1' : 'font-heading text-2xl text-earth-900 mb-1'">
                  {{ pkg.name }}
                </h3>
                <p [class]="pkg.highlighted ? 'font-body text-xs tracking-widest uppercase text-gold-400' : 'font-body text-xs tracking-widest uppercase text-earth-500'">
                  {{ pkg.subtitle }}
                </p>
              </div>

              <!-- Price -->
              <div class="mb-8 pb-8" [class]="pkg.highlighted ? 'border-b border-white/10' : 'border-b border-earth-100'">
                <div class="flex items-baseline gap-2">
                  <span [class]="pkg.highlighted ? 'font-heading text-5xl font-light text-white' : 'font-heading text-5xl font-light text-earth-900'">
                    {{ pkg.price }}
                  </span>
                  <span [class]="pkg.highlighted ? 'font-body text-sm text-white/50' : 'font-body text-sm text-earth-500'">
                    {{ pkg.period }}
                  </span>
                </div>
                <p [class]="pkg.highlighted ? 'font-body text-sm text-white/60 mt-2' : 'font-body text-sm text-earth-500 mt-2'">
                  {{ pkg.description }}
                </p>
              </div>

              <!-- Features -->
              <ul class="space-y-4 mb-10">
                @for (feature of pkg.features; track feature) {
                  <li class="flex items-start gap-3">
                    <svg [class]="pkg.highlighted ? 'w-4 h-4 text-gold-400 mt-0.5 shrink-0' : 'w-4 h-4 text-forest-500 mt-0.5 shrink-0'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span [class]="pkg.highlighted ? 'font-body text-sm text-white/70' : 'font-body text-sm text-earth-600'">
                      {{ feature }}
                    </span>
                  </li>
                }
              </ul>

              <!-- CTA -->
              <a
                href="#contact"
                [class]="pkg.highlighted
                  ? 'block text-center py-4 bg-gold-500 text-white text-sm tracking-widest uppercase font-body hover:bg-gold-400 transition-colors duration-300'
                  : 'block text-center py-4 border border-earth-300 text-earth-800 text-sm tracking-widest uppercase font-body hover:bg-earth-900 hover:text-white hover:border-earth-900 transition-all duration-300'"
              >
                {{ pkg.cta }}
              </a>
            </article>
          }
        </div>

        <!-- Disclaimer -->
        <p class="text-center mt-12 font-body text-earth-500 text-sm" appReveal>
          Tous nos séjours sont personnalisables. Contactez-nous pour un devis sur mesure selon vos dates et votre groupe.
        </p>
      </div>
    </section>
  `,
})
export class PricingComponent {
  packages: Package[] = [
    {
      name: 'Découverte',
      subtitle: 'Premier contact',
      price: '89€',
      period: '/ personne',
      description: 'Demi-journée ou journée complète',
      features: [
        'Accueil et prise en main du cheval',
        'Balade guidée en nature (2h-4h)',
        'Casque et équipement fournis',
        'Encadrement moniteur diplômé',
        'Collation de bienvenue',
        'Photos souvenir incluses',
      ],
      cta: 'Réserver',
      highlighted: false,
    },
    {
      name: 'Aventure',
      subtitle: 'Le choix idéal',
      price: '490€',
      period: '/ personne',
      description: 'Séjour de 3 jours / 2 nuits',
      features: [
        'Tout inclus (hébergement + repas)',
        'Randonnée itinérante 3 jours',
        'Bivouac ou gîte de charme',
        'Guide nature expert local',
        'Équipement complet fourni',
        'Repas du terroir & petit-déjeuner',
        'Assurance complète',
        'Transferts inclus',
      ],
      cta: 'Réserver ce séjour',
      highlighted: true,
      tag: 'Le plus populaire',
    },
    {
      name: 'Premium',
      subtitle: 'L\'expérience ultime',
      price: '1 290€',
      period: '/ personne',
      description: 'Séjour de 7 jours / 6 nuits',
      features: [
        'Hébergement haut de gamme',
        'Trek itinérant 7 jours',
        'Gastronomie locale raffinée',
        'Guide dédié & photographe',
        'Accès SPA et détente',
        'Vins et spiritueux locaux',
        'Transferts privés inclus',
        'Personnalisation totale du séjour',
      ],
      cta: 'Nous contacter',
      highlighted: false,
    },
  ];
}
