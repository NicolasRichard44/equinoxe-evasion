import Link from 'next/link';
import PhotoGallery from '@/components/PhotoGallery';

interface Activite {
  id: number;
  titre: string;
  date: string;
  duree: string;
  niveau: string;
  places: number;
  prix: string;
  description: string;
  image?: string;
}

const ACTIVITES: Activite[] = [
  {
    id: 1,
    titre: 'Randonnée découverte — Vallée des Lavandes',
    date: '12 avril 2026',
    duree: 'Demi-journée (3h)',
    niveau: 'Débutant / Intermédiaire',
    places: 8,
    prix: 'À compléter',
    description:
      'Une balade au pas et au trot à travers les champs de lavande. Idéale pour une première approche de la randonnée équestre en pleine nature.',
  },
  {
    id: 2,
    titre: 'Grande randonnée — Les Crêtes du Soleil',
    date: '26 avril 2026',
    duree: 'Journée complète',
    niveau: 'Intermédiaire / Confirmé',
    places: 6,
    prix: 'À compléter',
    description:
      'Parcourez les sentiers de crête avec des panoramas exceptionnels. Pique-nique inclus au sommet. Prévoir un bon niveau de forme.',
  },
  {
    id: 3,
    titre: 'Balade au coucher de soleil',
    date: '10 mai 2026',
    duree: '2h (18h-20h)',
    niveau: 'Tous niveaux',
    places: 10,
    prix: 'À compléter',
    description:
      'Profitez d\'une sortie magique au crépuscule. La lumière dorée qui baigne les collines offre un spectacle inoubliable à cheval.',
  },
  {
    id: 4,
    titre: 'Week-end équestre — Immersion nature',
    date: '23-24 mai 2026',
    duree: '2 jours (avec nuitée)',
    niveau: 'Intermédiaire',
    places: 6,
    prix: 'À compléter',
    description:
      'Deux jours de randonnée avec une nuit en bivouac ou au gîte. Une expérience complète pour les amoureux de la nature et des chevaux.',
  },
  {
    id: 5,
    titre: 'Stage d\'été — Initiation équitation',
    date: '6-10 juillet 2026',
    duree: '5 jours',
    niveau: 'Débutant',
    places: 8,
    prix: 'À compléter',
    description:
      'Un stage de 5 jours pour apprendre les bases de l\'équitation : soins aux chevaux, travail en manège et petites balades.',
  },
];

const ACTIVITES_PHOTOS = [
  { src: '/images/activites/rando-1.jpg', alt: 'Randonnée à cheval dans la campagne' },
  { src: '/images/activites/rando-2.jpg', alt: 'Groupe de cavaliers en forêt' },
  { src: '/images/activites/rando-3.jpg', alt: 'Coucher de soleil à cheval' },
  { src: '/images/activites/rando-4.jpg', alt: 'Pause pique-nique en randonnée' },
  { src: '/images/activites/rando-5.jpg', alt: 'Les chevaux au pré' },
  { src: '/images/activites/rando-6.jpg', alt: 'Stage d\'été' },
];

export default function Activites() {
  return (
    <>
      {/* Hero */}
      <section className="bg-amber-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Activités Équestres</h1>
          <p className="text-lg text-amber-100">
            Randonnées, balades et stages à cheval pour tous les niveaux.
          </p>
        </div>
      </section>

      {/* Galerie photos */}
      <section className="py-12 px-6 bg-amber-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">En images</h2>
          <PhotoGallery photos={ACTIVITES_PHOTOS} />
          <p className="mt-4 text-sm text-gray-500 italic">
            Ajoutez vos photos dans le dossier public/images/activites/ pour les voir apparaître ici.
          </p>
        </div>
      </section>

      {/* Programme des activités */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-900 mb-8">Prochaines randonnées &amp; activités</h2>

          <div className="space-y-6">
            {ACTIVITES.map((activite) => (
              <div
                key={activite.id}
                className="bg-amber-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-amber-900">{activite.titre}</h3>
                    <p className="text-gray-600 mt-2">{activite.description}</p>

                    <div className="mt-3 flex flex-wrap gap-3 text-sm">
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                        📅 {activite.date}
                      </span>
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                        ⏱ {activite.duree}
                      </span>
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                        📊 {activite.niveau}
                      </span>
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                        👥 {activite.places} places
                      </span>
                      {activite.prix && (
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                          💰 {activite.prix}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/activites/inscription?activite=${activite.id}`}
                    className="shrink-0 px-5 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium text-center"
                  >
                    S&apos;inscrire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="py-12 px-6 bg-amber-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Informations pratiques</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold text-amber-800 mb-2">🐴 Nos chevaux</h3>
              <p className="text-gray-600 text-sm">
                Nos chevaux sont calmes, bien dressés et adaptés à tous les niveaux.
                Ils sont habitués aux randonnées en extérieur.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold text-amber-800 mb-2">👕 Équipement</h3>
              <p className="text-gray-600 text-sm">
                Nous fournissons les casques (obligatoires). Prévoir des chaussures fermées,
                un pantalon long et des vêtements adaptés à la météo.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold text-amber-800 mb-2">⚠️ Conditions</h3>
              <p className="text-gray-600 text-sm">
                Âge minimum : 8 ans (accompagné). Poids maximum : 90 kg.
                Annulation gratuite jusqu&apos;à 48h avant l&apos;activité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 bg-amber-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Envie de participer ?</h2>
          <p className="text-amber-100 mb-6">
            Inscrivez-vous en ligne ou contactez-nous pour plus d&apos;informations.
          </p>
          <Link
            href="/activites/inscription"
            className="inline-block px-8 py-3 bg-white text-amber-900 font-semibold rounded-lg hover:bg-amber-100 transition-colors"
          >
            S&apos;inscrire à une activité
          </Link>
        </div>
      </section>
    </>
  );
}
