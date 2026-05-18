import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section
      id="hero"
      class="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      <!-- Background Image with Parallax -->
      <div
        class="absolute inset-0 parallax-bg"
        style="background-image: url('https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2071&auto=format&fit=crop');"
      ></div>

      <!-- Overlay -->
      <div class="absolute inset-0 hero-overlay"></div>

      <!-- Content -->
      <div class="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <!-- Eyebrow -->
        <p class="font-body text-gold-400 text-xs tracking-[0.5em] uppercase mb-6 animate-[fadeInDown_1s_ease_0.2s_both]">
          Randonnées Équestres &amp; Aventures Nature
        </p>

        <!-- Main Heading -->
        <h1 class="font-heading text-white text-5xl sm:text-6xl lg:text-8xl font-light leading-none mb-6 animate-[fadeInDown_1s_ease_0.4s_both]">
          Vivez l'aventure<br>
          <em class="italic text-gold-400">au galop</em>
        </h1>

        <!-- Subtitle -->
        <p class="font-body text-white/75 text-lg sm:text-xl font-light max-w-2xl mx-auto mb-10 animate-[fadeInUp_1s_ease_0.6s_both]">
          Partez à la découverte de paysages sauvages à cheval. Des expériences équestres d'exception, pensées pour les âmes aventurières.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_1s_ease_0.8s_both]">
          <a
            routerLink="/"
            fragment="activities"
            class="group inline-flex items-center gap-3 px-10 py-4 bg-gold-500 text-white text-sm tracking-widest uppercase font-body hover:bg-gold-400 transition-all duration-300 hover:gap-5"
          >
            Découvrir nos séjours
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <a
            routerLink="/"
            fragment="contact"
            class="inline-flex items-center gap-3 px-10 py-4 border border-white/50 text-white text-sm tracking-widest uppercase font-body hover:bg-white hover:text-earth-900 transition-all duration-300"
          >
            Nous contacter
          </a>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[fadeIn_2s_ease_1.2s_both]">
        <span class="font-body text-white/40 text-xs tracking-widest uppercase">Découvrir</span>
        <div class="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-[scrollLine_2s_ease-in-out_infinite]"></div>
      </div>
    </section>

    <!-- Intro Band -->
    <section class="bg-earth-900 py-6">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-around gap-6 text-center">
        @for (stat of stats; track stat.label) {
          <div class="flex flex-col gap-1">
            <span class="font-heading text-3xl text-gold-400">{{ stat.value }}</span>
            <span class="font-body text-xs tracking-widest uppercase text-white/50">{{ stat.label }}</span>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scrollLine {
      0%, 100% { opacity: 0; transform: scaleY(0); transform-origin: top; }
      50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
    }
  `],
})
export class HeroComponent {
  stats = [
    { value: '15+', label: "Années d'expérience" },
    { value: '500+', label: 'Aventuriers comblés' },
    { value: '12', label: 'Itinéraires uniques' },
    { value: '100%', label: 'Évasion garantie' },
  ];
}
