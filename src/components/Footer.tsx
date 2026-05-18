import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">Équinoxe Évasion</h3>
            <p className="text-amber-200 text-sm leading-relaxed">
              Gîte rural &amp; centre de tourisme équestre.<br />
              Découvrez notre hébergement de charme et nos randonnées à cheval au cœur de la nature.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-amber-300 transition-colors">Accueil</Link></li>
              <li><Link href="/hebergement" className="hover:text-amber-300 transition-colors">Hébergement</Link></li>
              <li><Link href="/activites" className="hover:text-amber-300 transition-colors">Activités équestres</Link></li>
              <li><Link href="/activites/inscription" className="hover:text-amber-300 transition-colors">Inscription activités</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-amber-200">
              <li>📍 Adresse à compléter</li>
              <li>📞 Téléphone à compléter</li>
              <li>✉️ Email à compléter</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-6 text-center text-sm text-amber-300">
          © {new Date().getFullYear()} Équinoxe Évasion — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
