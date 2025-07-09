import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-amber-50">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-amber-800 mb-6">Bienvenue à Equinoxe Évasion</h1>
        
        <div className="mb-8 text-amber-700">
          <p className="mb-4">
            Découvrez notre centre de tourisme équestre niché au cœur d&apos;un paysage naturel préservé.
            Nous vous proposons des balades à cheval inoubliables pour tous les niveaux, 
            ainsi qu&apos;un hébergement confortable dans notre gîte rural pour prolonger l&apos;expérience.
          </p>
          <p>
            Notre équipe passionnée vous accueille toute l&apos;année pour des moments 
            de déconnexion et de reconnexion avec la nature.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/reservation" 
            className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Réserver une activité
          </Link>
          <Link 
            href="/annonces" 
            className="px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
          >
            Voir nos annonces
          </Link>
          <Link 
            href="/admin" 
            className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Espace administrateur
          </Link>
        </div>
      </div>
    </main>
  );
}
