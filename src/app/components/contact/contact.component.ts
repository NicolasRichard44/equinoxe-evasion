import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RevealDirective } from '../../shared/directives/reveal.directive';

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/5d9533549929730f1f2387d3b6845d00';

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  website: string; 
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RevealDirective],
  template: `
    <section id="contact" class="py-28 bg-earth-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-20" appReveal>
          <p class="font-body text-gold-500 text-xs tracking-[0.5em] uppercase mb-4">Parlons de votre projet</p>
          <h2 class="font-heading text-earth-900 text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
            Prêt pour votre <em class="italic text-earth-600">aventure ?</em>
          </h2>
          <p class="font-body text-earth-600 text-lg max-w-2xl mx-auto font-light">
            Chaque aventure commence par une conversation. Parlez-nous de votre projet
            et nous créons l'expérience qui vous correspond.
          </p>
          <div class="w-16 h-px bg-gold-400 mx-auto mt-8"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-16">

          <!-- Left: Info -->
          <div class="lg:col-span-2 space-y-10" appReveal direction="left">
            <div>
              <h3 class="font-heading text-earth-900 text-2xl mb-6">Nos coordonnées</h3>
              <ul class="space-y-6">
                @for (info of contactInfo; track info.label) {
                  <li class="flex items-start gap-4">
                    <div class="w-10 h-10 bg-gold-500 flex items-center justify-center shrink-0">
                      <span class="text-white text-lg">{{ info.icon }}</span>
                    </div>
                    <div>
                      <p class="font-body text-xs tracking-widest uppercase text-earth-500 mb-1">{{ info.label }}</p>
                      <p class="font-body text-earth-800 text-sm">{{ info.value }}</p>
                    </div>
                  </li>
                }
              </ul>
            </div>

            <div class="bg-earth-900 p-8">
              <h4 class="font-heading text-white text-xl mb-4">Nos horaires</h4>
              @for (hour of hours; track hour.day) {
                <div class="flex justify-between py-2 border-b border-white/10 last:border-0">
                  <span class="font-body text-white/60 text-sm">{{ hour.day }}</span>
                  <span class="font-body text-white text-sm">{{ hour.time }}</span>
                </div>
              }
            </div>
          </div>

          <!-- Right: Form -->
          <div class="lg:col-span-3" appReveal direction="right">

            @if (state() === 'success') {
              <div class="flex flex-col items-center justify-center text-center py-16">
                <div class="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mb-6">
                  <svg class="w-10 h-10 text-forest-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 class="font-heading text-earth-900 text-3xl mb-4">Message envoyé !</h3>
                <p class="font-body text-earth-600 text-lg mb-8">
                  Merci pour votre message. Nous vous répondrons dans les 24 heures.
                </p>
                <button (click)="reset()"
                  class="text-gold-600 font-body text-sm tracking-widest uppercase underline hover:text-gold-500 transition-colors">
                  Envoyer un autre message
                </button>
              </div>

            } @else {
              <form (ngSubmit)="onSubmit(contactForm)" #contactForm="ngForm" class="space-y-6" novalidate>

                <!-- Honeypot invisible -->
                <div style="position:absolute;left:-9999px;top:-9999px" aria-hidden="true">
                  <label for="website">Ne pas remplir</label>
                  <input id="website" name="website" type="text"
                    [(ngModel)]="form.website" tabindex="-1" autocomplete="off">
                </div>

                <!-- Bannière d'erreur -->
                @if (state() === 'error') {
                  <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-body" role="alert">
                    {{ errorMessage() }}
                  </div>
                }

                <!-- Prénom / Nom -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block font-body text-xs tracking-widest uppercase text-earth-600 mb-2" for="firstName">
                      Prénom *
                    </label>
                    <input id="firstName" name="firstName" type="text"
                      [(ngModel)]="form.firstName" required
                      class="w-full px-4 py-3 border border-earth-200 bg-white font-body text-earth-900 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                      placeholder="Marie">
                  </div>
                  <div>
                    <label class="block font-body text-xs tracking-widest uppercase text-earth-600 mb-2" for="lastName">
                      Nom *
                    </label>
                    <input id="lastName" name="lastName" type="text"
                      [(ngModel)]="form.lastName" required
                      class="w-full px-4 py-3 border border-earth-200 bg-white font-body text-earth-900 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                      placeholder="Dupont">
                  </div>
                </div>

                <!-- Email -->
                <div>
                  <label class="block font-body text-xs tracking-widest uppercase text-earth-600 mb-2" for="email">
                    Adresse email *
                  </label>
                  <input id="email" name="email" type="email"
                    [(ngModel)]="form.email" required
                    class="w-full px-4 py-3 border border-earth-200 bg-white font-body text-earth-900 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300"
                    placeholder="marie@exemple.fr">
                </div>

                <!-- Message -->
                <div>
                  <label class="block font-body text-xs tracking-widest uppercase text-earth-600 mb-2" for="message">
                    Votre message *
                  </label>
                  <textarea id="message" name="message"
                    [(ngModel)]="form.message" required rows="6"
                    class="w-full px-4 py-3 border border-earth-200 bg-white font-body text-earth-900 text-sm focus:outline-none focus:border-gold-500 transition-colors duration-300 resize-none"
                    placeholder="Parlez-nous de votre projet, de vos attentes..."></textarea>
                </div>

                <!-- Bouton -->
                <div class="space-y-3">
                  <button type="submit"
                    [disabled]="contactForm.invalid || state() === 'sending'"
                    class="w-full py-4 bg-earth-900 text-white text-sm tracking-widest uppercase font-body hover:bg-earth-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group">
                    @if (state() === 'sending') {
                      <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Envoi en cours...
                    } @else {
                      Envoyer ma demande
                      <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    }
                  </button>

                  <p class="font-body text-earth-400 text-xs text-center">
                    Protection anti-spam activée
                  </p>
                </div>

              </form>
            }

          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {

  state = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  errorMessage = signal('Une erreur est survenue. Veuillez réessayer.');

  form: ContactForm = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    website: '',
  };

  contactInfo = [
    { icon: '📍', label: 'Adresse', value: '123 Chemin des Écuries, 12345 Nature-sur-Bois' },
    { icon: '📞', label: 'Téléphone', value: '+33 5 00 00 00 00' },
    { icon: '✉️', label: 'Email', value: 'contact@equinoxe-evasion.fr' },
  ];

  hours = [
    { day: 'Lundi – Vendredi', time: '9h – 19h' },
    { day: 'Samedi', time: '9h – 18h' },
    { day: 'Dimanche', time: 'Sur RDV uniquement' },
  ];

  onSubmit(ngForm: NgForm): void {
    if (ngForm.invalid) return;
    this.state.set('sending');
    this.sendForm();
  }

  private sendForm(): void {
    const payload = {
      _subject:  'Nouvelle demande de contact — Équinoxe Évasion',
      _captcha:  'true',
      _honey:    this.form.website, // honeypot
      firstName: this.form.firstName,
      lastName:  this.form.lastName,
      email:     this.form.email,
      message:   this.form.message,
    };

    fetch(FORMSUBMIT_ENDPOINT, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify(payload),
    })
      .then(res => res.ok ? this.state.set('success') : Promise.reject(res))
      .catch(() => {
        this.errorMessage.set('Une erreur est survenue. Veuillez réessayer.');
        this.state.set('error');
      });
  }

  reset(): void {
    this.form = { firstName: '', lastName: '', email: '', message: '', website: '' };
    this.state.set('idle');
  }
}
