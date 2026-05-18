import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface Activity {
  icon: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
  tag: string;
}

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="activities" class="py-28 bg-warm-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Section Header -->
        <div class="text-center mb-20" appReveal>
          <p class="font-body text-gold-500 text-xs tracking-[0.5em] uppercase mb-4">
            Ce que nous proposons
          </p>
          <h2 class="font-heading text-earth-900 text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
            Nos <em class="italic text-earth-600">aventures</em>
          </h2>
          <p class="font-body text-earth-600 text-lg max-w-2xl mx-auto font-light">
            De la balade contemplative au trek multi-jours, chaque expérience est conçue pour vous connecter profondément avec la nature et votre monture.
          </p>
          <div class="w-16 h-px bg-gold-400 mx-auto mt-8"></div>
        </div>

        <!-- Activities Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (activity of activities; track activity.title; let i = $index) {
            <article
              appReveal
              [delay]="i * 100"
              class="group relative bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-earth-900/10 transition-all duration-500 hover:-translate-y-2"
            >
              <!-- Image -->
              <div class="relative h-64 overflow-hidden">
                <img
                  [src]="activity.image"
                  [alt]="activity.title"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <!-- Tag -->
                <span class="absolute top-4 left-4 bg-gold-500 text-white text-xs px-3 py-1 tracking-widest uppercase font-body">
                  {{ activity.tag }}
                </span>
              </div>

              <!-- Content -->
              <div class="p-8">
                <div class="text-3xl mb-4">{{ activity.icon }}</div>
                <h3 class="font-heading text-earth-900 text-2xl mb-3">
                  {{ activity.title }}
                </h3>
                <p class="font-body text-earth-600 text-sm leading-relaxed mb-6">
                  {{ activity.description }}
                </p>
                <div class="flex items-center gap-6 mb-6 pt-4 border-t border-earth-100">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="font-body text-xs text-earth-600 tracking-wide">{{ activity.duration }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <span class="font-body text-xs text-earth-600 tracking-wide">{{ activity.level }}</span>
                  </div>
                </div>
                <a
                  href="#contact"
                  class="group/btn inline-flex items-center gap-2 text-sm text-earth-700 font-body tracking-widest uppercase hover:text-gold-600 transition-colors duration-300"
                >
                  En savoir plus
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              </div>
            </article>
          }
        </div>
      </div>

      <!-- Nature Banner -->
      <div
        class="mt-28 relative py-32 parallax-bg"
        style="background-image: url('https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?q=80&w=1887&auto=format&fit=crop');"
      >
        <div class="absolute inset-0 bg-earth-900/70"></div>
        <div class="relative z-10 max-w-4xl mx-auto px-6 text-center" appReveal>
          <p class="font-body text-gold-400 text-xs tracking-[0.5em] uppercase mb-6">Notre philosophie</p>
          <blockquote class="font-heading text-white text-3xl sm:text-4xl lg:text-5xl font-light italic leading-relaxed">
            "Le cheval n'est pas un simple moyen de transport —<br> c'est un partenaire de vie, un miroir de l'âme."
          </blockquote>
          <p class="font-body text-white/60 mt-6 tracking-widest uppercase text-sm">— L'équipe Équinoxe Évasion</p>
        </div>
      </div>
    </section>
  `,
})
export class ActivitiesComponent {
  activities: Activity[] = [
    {
      icon: '🌄',
      title: 'Randonnée de découverte',
      description: 'Explorez les sentiers boisés et les panoramas époustouflants à cheval. Idéal pour les débutants et les cavaliers occasionnels souhaitant une initiation en douceur.',
      duration: 'Demi-journée',
      level: 'Tous niveaux',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1887&auto=format&fit=crop',
      tag: 'Découverte',
    },
    {
      icon: '🏕️',
      title: 'Trek multi-jours',
      description: "Partez pour une aventure de 3 à 7 jours à travers des paysages variés. Bivouac sous les étoiles, repas au coin du feu et connexion totale avec la nature.",
      duration: '3 à 7 jours',
      level: 'Intermédiaire',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1774&auto=format&fit=crop',
      tag: 'Aventure',
    },
    {
      icon: '🌸',
      title: 'Séjour équestre premium',
      description: 'Un séjour complet alliant équitation, gastronomie locale et hébergement de charme. Pour ceux qui veulent vivre l\'équitation comme une expérience de luxe.',
      duration: '5 à 10 jours',
      level: 'Confirmé',
      image: 'https://images.unsplash.com/photo-1617714651610-7da24d2f37b6?q=80&w=1887&auto=format&fit=crop',
      tag: 'Premium',
    },
    {
      icon: '👨‍👩‍👧',
      title: 'Stage famille',
      description: "Un programme spécialement conçu pour les familles avec enfants dès 6 ans. Apprentissage ludique, promenades adaptées et moments de complicité inoubliables.",
      duration: '2 à 5 jours',
      level: 'Famille',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop',
      tag: 'Famille',
    },
    {
      icon: '🎯',
      title: 'Stage perfectionnement',
      description: 'Progressez avec nos moniteurs diplômés d\'État. Travail en manège, extérieur et cours personnalisés pour affiner votre technique et votre harmonie avec le cheval.',
      duration: '3 à 7 jours',
      level: 'Avancé',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1965&auto=format&fit=crop',
      tag: 'Formation',
    },
    {
      icon: '🌙',
      title: 'Nuit sous les étoiles',
      description: "Une expérience magique et unique : partez en soirée à cheval, observez le coucher du soleil depuis les crêtes et revenez à la lueur des torches.",
      duration: '1 soirée',
      level: 'Intermédiaire',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1887&auto=format&fit=crop',
      tag: 'Unique',
    },
  ];
}
