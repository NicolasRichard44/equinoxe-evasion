import Calendar from '@/components/Calendar';
import PhotoGallery from '@/components/PhotoGallery';

const GITE_PHOTOS = [
  { src: '/images/gite/gite-exterieur.jpg', alt: 'Vue extérieure du gîte' },
  { src: '/images/gite/gite-salon.jpg', alt: 'Le salon' },
  { src: '/images/gite/gite-chambre.jpg', alt: 'Chambre' },
  { src: '/images/gite/gite-cuisine.jpg', alt: 'Cuisine équipée' },
  { src: '/images/gite/gite-terrasse.jpg', alt: 'Terrasse' },
  { src: '/images/gite/gite-jardin.jpg', alt: 'Jardin' },
];

export default function Hebergement() {
  return (
    <>
      {/* Hero */}
      <section className="bg-amber-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Notre Gîte</h1>
          <p className="text-lg text-amber-100">
            Un hébergement de charme au cœur de la nature pour un séjour inoubliable.
          </p>
        </div>
      </section>

      {/* Galerie photos */}
      <section className="py-12 px-6 bg-amber-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Photos du gîte</h2>
          <PhotoGallery photos={GITE_PHOTOS} />
          <p className="mt-4 text-sm text-gray-500 italic">
            Ajoutez vos photos dans le dossier public/images/gite/ pour les voir apparaître ici.
          </p>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Informations pratiques</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-lg p-5">
                <h3 className="font-semibold text-amber-800 mb-2">🏠 Le gîte</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Capacité : jusqu&apos;à X personnes</li>
                  <li>• X chambres (X lits doubles, X lits simples)</li>
                  <li>• Salle de bain avec douche</li>
                  <li>• Salon avec cheminée</li>
                  <li>• Cuisine entièrement équipée</li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-lg p-5">
                <h3 className="font-semibold text-amber-800 mb-2">🌿 Extérieur</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Grand jardin privatif</li>
                  <li>• Terrasse avec mobilier de jardin</li>
                  <li>• Barbecue à disposition</li>
                  <li>• Parking privé gratuit</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-amber-50 rounded-lg p-5">
                <h3 className="font-semibold text-amber-800 mb-2">📋 Conditions</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Arrivée : à partir de 16h</li>
                  <li>• Départ : avant 10h</li>
                  <li>• Séjour minimum : 2 nuits</li>
                  <li>• Animaux : nous consulter</li>
                  <li>• Non-fumeur à l&apos;intérieur</li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-lg p-5">
                <h3 className="font-semibold text-amber-800 mb-2">📍 Accès</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Adresse à compléter</li>
                  <li>• GPS : coordonnées à compléter</li>
                  <li>• À Xkm de la ville la plus proche</li>
                  <li>• Gare la plus proche : à compléter</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendrier des disponibilités */}
      <section className="py-12 px-6 bg-amber-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Disponibilités</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Calendar />
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-amber-900 mb-3">Réserver votre séjour</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Consultez le calendrier pour vérifier les disponibilités, puis réservez
                  directement via l&apos;une de nos plateformes partenaires :
                </p>
                <div className="space-y-3">
                  <a
                    href="https://www.airbnb.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 bg-[#FF5A5F] text-white rounded-lg hover:bg-[#e0484d] transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.7 17.6c-.3.5-.7.8-1.2.9-.2 0-.4.1-.6.1-.5 0-1-.2-1.6-.5-1.3-.7-2.5-2-3.7-3.8-.1.1-.1.1-.2.2-1.1 1.3-1.9 2.3-2.8 2.9-.6.4-1.2.6-1.8.6-.2 0-.4 0-.6-.1-.5-.1-1-.4-1.2-.9-.3-.5-.3-1.1-.2-1.8.3-1.5 1.1-3.2 2.3-5 .1-.2.3-.4.4-.6-1.4-2.6-2-4.7-1.7-5.9.1-.5.4-1 .8-1.2.2-.1.4-.2.7-.2.8 0 1.7.6 2.9 1.8.5.5 1 1.1 1.5 1.7.5-.6 1-1.2 1.5-1.7 1.2-1.2 2.1-1.8 2.9-1.8.3 0 .5.1.7.2.4.3.7.7.8 1.2.3 1.2-.3 3.3-1.7 5.9.2.2.3.4.4.6 1.2 1.8 2 3.5 2.3 5 .1.7.1 1.3-.2 1.8z"/>
                    </svg>
                    Réserver sur Airbnb
                  </a>
                  <a
                    href="https://www.gites-de-france.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 bg-[#2E7D32] text-white rounded-lg hover:bg-[#1b5e20] transition-colors font-medium"
                  >
                    <span className="text-xl">🏡</span>
                    Réserver sur Gîtes de France
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-amber-900 mb-2">Contact direct</h3>
                <p className="text-gray-600 text-sm">
                  Vous pouvez aussi nous contacter directement pour toute question ou demande de réservation :
                </p>
                <p className="mt-2 text-amber-800 font-medium">
                  📞 Téléphone à compléter<br />
                  ✉️ Email à compléter
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
