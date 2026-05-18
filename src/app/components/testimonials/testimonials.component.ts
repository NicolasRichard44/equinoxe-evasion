import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
  activity: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="testimonials" class="py-28 bg-earth-900 relative overflow-hidden">
      <!-- Decorative Background -->
      <div class="absolute inset-0 opacity-5"
        style="background-image: url('https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2071'); background-size: cover; background-position: center;">
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-20" appReveal>
          <p class="font-body text-gold-400 text-xs tracking-[0.5em] uppercase mb-4">Ils nous font confiance</p>
          <h2 class="font-heading text-white text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
            Leurs <em class="italic text-gold-400">expériences</em>
          </h2>
          <div class="w-16 h-px bg-gold-400 mx-auto mt-8"></div>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (t of testimonials; track t.name; let i = $index) {
            <article
              appReveal
              [delay]="i * 150"
              class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-500"
            >
              <!-- Quote Icon -->
              <svg class="w-8 h-8 text-gold-400 mb-6 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>

              <!-- Stars -->
              <div class="flex gap-1 mb-4">
                @for (star of getStars(t.rating); track star) {
                  <svg class="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                }
              </div>

              <!-- Text -->
              <p class="font-body text-white/70 text-sm leading-relaxed mb-8 italic">
                "{{ t.text }}"
              </p>

              <!-- Author -->
              <div class="flex items-center gap-4 pt-4 border-t border-white/10">
                <img
                  [src]="t.avatar"
                  [alt]="t.name"
                  loading="lazy"
                  class="w-12 h-12 rounded-full object-cover"
                >
                <div>
                  <p class="font-heading text-white text-base">{{ t.name }}</p>
                  <p class="font-body text-white/40 text-xs tracking-wide">{{ t.location }}</p>
                  <p class="font-body text-gold-400 text-xs mt-1">{{ t.activity }}</p>
                </div>
              </div>
            </article>
          }
        </div>

        <!-- Trust Badges -->
        <div class="mt-20 flex flex-wrap justify-center gap-12 items-center" appReveal>
          @for (badge of badges; track badge.label) {
            <div class="flex flex-col items-center gap-2 text-center">
              <span class="text-3xl">{{ badge.icon }}</span>
              <span class="font-body text-white/40 text-xs tracking-widest uppercase">{{ badge.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      name: 'Marie-Claire Dupont',
      location: 'Paris, France',
      text: "Une expérience qui dépasse tous les mots. La complicité avec le cheval, les paysages à couper le souffle, l'accueil chaleureux de toute l'équipe... Je repars transformée.",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?q=80&w=200&auto=format&fit=crop&facepad=3',
      activity: 'Trek multi-jours 5 jours',
    },
    {
      name: 'Thomas & Julie Berger',
      location: 'Lyon, France',
      text: "Nous avons fait le stage famille avec nos deux enfants de 8 et 11 ans. Un souvenir impérissable pour toute la famille ! Les moniteurs sont patients, pédagogues et passionnés.",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop&facepad=3',
      activity: 'Stage famille 4 jours',
    },
    {
      name: 'Isabelle Morel',
      location: 'Bordeaux, France',
      text: "Le séjour premium a été une révélation. L'hébergement de charme, la gastronomie locale et les sorties à cheval au lever du soleil... C'est exactement ce dont j'avais besoin pour me ressourcer.",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop&facepad=3',
      activity: 'Séjour premium 7 jours',
    },
  ];

  badges = [
    { icon: '🏅', label: 'Moniteurs diplômés d\'État' },
    { icon: '🌿', label: 'Éco-responsable' },
    { icon: '🛡️', label: 'Assurance incluse' },
    { icon: '⭐', label: '4.9/5 sur 200+ avis' },
    { icon: '🇫🇷', label: 'Made in France' },
  ];

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
