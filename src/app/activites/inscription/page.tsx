'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabaseClient';

interface EvenementOption {
  id: number;
  titre: string;
  date: string;
  date_fin: string | null;
  niveau: string | null;
  places_max: number;
}

const EMPTY_FORM = {
  evenementId: '',
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  nombreParticipants: 1,
  niveau: '',
  message: '',
};

function formatDateLabel(ev: EvenementOption): string {
  const start = new Date(ev.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  if (ev.date_fin) {
    const end = new Date(ev.date_fin).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    return `${ev.titre} — du ${start} au ${end}`;
  }
  return `${ev.titre} — ${start}`;
}

function InscriptionForm() {
  const searchParams = useSearchParams();

  const [evenements, setEvenements] = useState<EvenementOption[]>([]);
  const [isLoadingEvenements, setIsLoadingEvenements] = useState(true);
  const [evenementsError, setEvenementsError] = useState<string | null>(null);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Chargement des événements actifs à venir
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    supabaseClient
      .from('evenements')
      .select('id, titre, date, date_fin, niveau, places_max')
      .eq('actif', true)
      .gte('date', today)
      .order('date', { ascending: true })
      .then(({ data, error }: { data: EvenementOption[] | null; error: { message: string } | null }) => {
        if (error) {
          setEvenementsError("Impossible de charger les événements disponibles.");
        } else {
          setEvenements(data || []);
        }
        setIsLoadingEvenements(false);
      });
  }, []);

  // Pré-sélection depuis l'URL (?activite=X)
  useEffect(() => {
    const activiteParam = searchParams.get('activite');
    if (activiteParam) {
      setFormData(prev => ({ ...prev, evenementId: activiteParam }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabaseClient.from('inscriptions').insert([
        {
          evenement_id: parseInt(formData.evenementId),
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone || null,
          nombre_participants: formData.nombreParticipants,
          niveau: formData.niveau || null,
          message: formData.message || null,
        },
      ]);
      if (insertError) throw insertError;
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <span className="text-5xl block mb-4">✅</span>
          <h2 className="text-2xl font-bold text-amber-900 mb-2">Inscription envoyée !</h2>
          <p className="text-gray-600 mb-6">
            Merci pour votre inscription. Nous vous contacterons prochainement
            pour confirmer votre participation et vous transmettre les détails pratiques.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData(EMPTY_FORM);
              }}
              className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
            >
              Nouvelle inscription
            </button>
            <Link
              href="/activites"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Retour aux activités
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-100 p-4 rounded-md text-red-700">{error}</div>
        )}

        {/* Choix de l'événement */}
        <div>
          <label htmlFor="evenementId" className="block mb-1 font-medium text-gray-700">
            Activité choisie *
          </label>
          {isLoadingEvenements ? (
            <div className="flex items-center gap-2 text-gray-500 text-sm py-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-600 border-r-transparent" />
              Chargement des activités disponibles…
            </div>
          ) : evenementsError ? (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
              {evenementsError}
            </div>
          ) : evenements.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-3 text-sm">
              Aucune activité disponible pour le moment. Revenez bientôt !
            </div>
          ) : (
            <select
              id="evenementId"
              name="evenementId"
              value={formData.evenementId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">-- Sélectionnez une activité --</option>
              {evenements.map(ev => (
                <option key={ev.id} value={ev.id}>
                  {formatDateLabel(ev)}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="prenom" className="block mb-1 font-medium text-gray-700">
              Prénom *
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label htmlFor="nom" className="block mb-1 font-medium text-gray-700">
              Nom *
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block mb-1 font-medium text-gray-700">
              Téléphone
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombreParticipants" className="block mb-1 font-medium text-gray-700">
              Nombre de participants *
            </label>
            <input
              type="number"
              id="nombreParticipants"
              name="nombreParticipants"
              min={1}
              max={10}
              value={formData.nombreParticipants}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label htmlFor="niveau" className="block mb-1 font-medium text-gray-700">
              Niveau équestre
            </label>
            <select
              id="niveau"
              name="niveau"
              value={formData.niveau}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">-- Sélectionnez --</option>
              <option value="debutant">Débutant (jamais monté)</option>
              <option value="initie">Initié (quelques reprises)</option>
              <option value="intermediaire">Intermédiaire (galop 2-4)</option>
              <option value="confirme">Confirmé (galop 5+)</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 font-medium text-gray-700">
            Message ou questions
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Allergies, besoins spécifiques, questions..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoadingEvenements || evenements.length === 0}
          className="w-full py-3 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Envoi en cours…' : "Envoyer mon inscription"}
        </button>
      </form>
    </div>
  );
}

export default function InscriptionPage() {
  return (
    <>
      <section className="bg-amber-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Inscription à une activité</h1>
          <p className="text-lg text-amber-100">
            Remplissez le formulaire ci-dessous pour vous inscrire à l&apos;une de nos randonnées ou stages.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 bg-amber-50">
        <Suspense fallback={<div className="text-center py-8 text-gray-500">Chargement…</div>}>
          <InscriptionForm />
        </Suspense>
      </section>
    </>
  );
}

