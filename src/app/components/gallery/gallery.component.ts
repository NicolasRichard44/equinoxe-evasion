import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface GalleryImage {
  url: string;
  alt: string;
  span?: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="gallery" class="py-28 bg-earth-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-16" appReveal>
          <p class="font-body text-gold-500 text-xs tracking-[0.5em] uppercase mb-4">Nos moments</p>
          <h2 class="font-heading text-earth-900 text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
            La <em class="italic text-earth-600">galerie</em>
          </h2>
          <p class="font-body text-earth-600 text-lg max-w-xl mx-auto font-light">
            Chaque image raconte une histoire. Voici quelques fragments de nos aventures partagées.
          </p>
          <div class="w-16 h-px bg-gold-400 mx-auto mt-8"></div>
        </div>

        <!-- Masonry Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          @for (img of images; track img.alt; let i = $index) {
            <div
              appReveal
              [delay]="(i % 4) * 100"
              [class]="'group relative overflow-hidden cursor-pointer ' + (img.span ?? '')"
              (click)="openLightbox(i)"
            >
              <img
                [src]="img.url"
                [alt]="img.alt"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              >
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Lightbox -->
      @if (lightboxIndex() !== null) {
        <div
          class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          (click)="closeLightbox()"
        >
          <button
            class="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            (click)="closeLightbox()"
            aria-label="Fermer"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <img
            [src]="images[lightboxIndex()!].url"
            [alt]="images[lightboxIndex()!].alt"
            class="max-h-[90vh] max-w-[90vw] object-contain"
            (click)="$event.stopPropagation()"
          >
          <button
            class="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            (click)="prevImage($event)"
            aria-label="Précédent"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            class="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            (click)="nextImage($event)"
            aria-label="Suivant"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      }
    </section>
  `,
})
export class GalleryComponent {
  lightboxIndex = signal<number | null>(null);

  images: GalleryImage[] = [
    { url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=800&auto=format&fit=crop', alt: 'Cavalier au galop dans la nature', span: 'col-span-2 row-span-2' },
    { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop', alt: 'Cheval de face dans un pré' },
    { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop', alt: 'Paysage montagneux au coucher du soleil' },
    { url: 'https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?q=80&w=600&auto=format&fit=crop', alt: 'Forêt dense et lumineuse' },
    { url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=600&auto=format&fit=crop', alt: 'Cavalière en selle' },
    { url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop', alt: 'Chien et cheval dans la campagne', span: 'col-span-2' },
    { url: 'https://images.unsplash.com/photo-1617714651610-7da24d2f37b6?q=80&w=600&auto=format&fit=crop', alt: 'Troupeau de chevaux au galop' },
    { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=600&auto=format&fit=crop', alt: 'Coucher de soleil en montagne', span: 'row-span-2' },
    { url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=600&auto=format&fit=crop', alt: 'Rivière de montagne' },
    { url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop', alt: 'Animaux sauvages en liberté' },
  ];

  openLightbox(index: number): void {
    this.lightboxIndex.set(index);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxIndex.set(null);
    document.body.style.overflow = '';
  }

  prevImage(e: Event): void {
    e.stopPropagation();
    const current = this.lightboxIndex();
    if (current !== null) {
      this.lightboxIndex.set((current - 1 + this.images.length) % this.images.length);
    }
  }

  nextImage(e: Event): void {
    e.stopPropagation();
    const current = this.lightboxIndex();
    if (current !== null) {
      this.lightboxIndex.set((current + 1) % this.images.length);
    }
  }
}
