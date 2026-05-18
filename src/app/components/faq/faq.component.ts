import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="faq" class="py-28 bg-warm-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-16" appReveal>
          <p class="font-body text-gold-500 text-xs tracking-[0.5em] uppercase mb-4">Questions fréquentes</p>
          <h2 class="font-heading text-earth-900 text-4xl sm:text-5xl font-light mb-6">
            Tout ce que vous<br><em class="italic text-earth-600">souhaitez savoir</em>
          </h2>
          <div class="w-16 h-px bg-gold-400 mx-auto mt-8"></div>
        </div>

        <!-- Accordion -->
        <div class="space-y-3" appReveal>
          @for (item of faqs; track item.question; let i = $index) {
            <div class="border border-earth-200 overflow-hidden">
              <button
                class="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-earth-50 transition-colors duration-300"
                (click)="toggle(i)"
                [attr.aria-expanded]="openIndex() === i"
              >
                <span class="font-heading text-earth-900 text-lg pr-4">
                  {{ item.question }}
                </span>
                <svg
                  [class]="openIndex() === i ? 'w-5 h-5 text-gold-500 shrink-0 rotate-180 transition-transform duration-300' : 'w-5 h-5 text-earth-400 shrink-0 transition-transform duration-300'"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <div
                [class]="openIndex() === i
                  ? 'px-8 pb-6 max-h-[500px] transition-all duration-500 overflow-hidden'
                  : 'px-8 max-h-0 overflow-hidden transition-all duration-500'"
              >
                <p class="font-body text-earth-600 text-sm leading-relaxed">
                  {{ item.answer }}
                </p>
              </div>
            </div>
          }
        </div>

        <!-- CTA -->
        <div class="text-center mt-16" appReveal>
          <p class="font-body text-earth-600 mb-6">
            Vous ne trouvez pas votre réponse ?
          </p>
          <a
            href="#contact"
            class="inline-flex items-center gap-3 px-8 py-4 bg-earth-900 text-white text-sm tracking-widest uppercase font-body hover:bg-earth-700 transition-colors duration-300"
          >
            Posez-nous votre question
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class FaqComponent {
  openIndex = signal<number | null>(0);

  toggle(index: number): void {
    this.openIndex.update((v) => (v === index ? null : index));
  }

  faqs: FaqItem[] = [
    {
      question: 'Faut-il savoir monter à cheval pour participer ?',
      answer: 'Absolument pas ! Nous accueillons tous les niveaux, du grand débutant au cavalier confirmé. Nos formules "Découverte" et "Stage famille" sont spécialement pensées pour les personnes n\'ayant jamais ou peu monté à cheval. Nos moniteurs diplômés d\'État s\'adaptent à chacun.',
    },
    {
      question: "Quel âge minimum est requis ?",
      answer: "Les enfants sont acceptés dès l'âge de 6 ans pour les stages familles et activités adaptées. Pour les treks et séjours aventure, nous recommandons un minimum de 10-12 ans. Les adolescents et adultes de tous âges sont les bienvenus.",
    },
    {
      question: 'Quels équipements dois-je apporter ?',
      answer: "Nous fournissons tout le matériel équestre (casque homologué, gilet de protection, selle, harnachement). Pour vous, nous recommandons des vêtements confortables et solides, des chaussures à talon léger ou des bottes, et une tenue de rechange. Pour les séjours multi-jours, nous vous envoyons une liste détaillée.",
    },
    {
      question: "Les séjours sont-ils assurés ?",
      answer: "Oui, tous nos séjours incluent une assurance responsabilité civile complète. Nos chevaux sont régulièrement suivis par un vétérinaire. Nous vous recommandons de souscrire à une assurance annulation voyage pour vous couvrir en cas d'imprévu de votre côté.",
    },
    {
      question: 'Comment se déroule la réservation ?',
      answer: "La réservation se fait en 3 étapes simples : contactez-nous via le formulaire ou par téléphone pour vérifier les disponibilités, nous établissons votre devis personnalisé, puis vous confirmez avec un acompte de 30%. Le solde est dû 15 jours avant votre arrivée.",
    },
    {
      question: 'Quelle est la politique d\'annulation ?',
      answer: "Annulation jusqu'à 30 jours avant : remboursement intégral. Entre 15 et 30 jours : remboursement à 50%. Moins de 15 jours : l'acompte est conservé mais nous proposons un report sur une autre date disponible. En cas de météo dangereuse, nous reportons sans frais.",
    },
    {
      question: 'Les repas et l\'hébergement sont-ils inclus ?',
      answer: "Cela dépend de la formule choisie. La formule Découverte inclut une collation. La formule Aventure comprend hébergement en gîte de charme ou bivouac et tous les repas du terroir. La formule Premium propose un hébergement haut de gamme avec restauration gastronomique.",
    },
  ];
}
