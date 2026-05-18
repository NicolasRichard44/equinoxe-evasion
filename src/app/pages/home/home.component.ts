import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ActivitiesComponent } from '../../components/activities/activities.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { ContactComponent } from '../../components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ActivitiesComponent,
    GalleryComponent,
    TestimonialsComponent,
    PricingComponent,
    FaqComponent,
    ContactComponent,
  ],
  template: `
    <main>
      <app-hero />
      <app-activities />
      <app-gallery />
      <app-testimonials />
      <app-pricing />
      <app-faq />
      <app-contact />
    </main>
  `,
})
export class HomeComponent {}
