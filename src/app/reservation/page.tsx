'use client';

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';

export default function Reservation() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    date: '',
    personnes: 1,
    commentaire: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Vérification si on est en mode développement sans Supabase configuré
      if (process.env.NODE_ENV === 'development' && 
          (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
        console.log('Mode développement sans Supabase : ', formData);
        // Simuler un délai de réponse
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setIsSubmitted(true);
        setFormData({
          nom: '',
          email: '',
          date: '',
          personnes: 1,
          commentaire: ''
        });
        return;
      }
      
      const { error } = await supabaseClient
        .from('reservations')
        .insert([formData]);
      
      if (error) throw error;
      
      setIsSubmitted(true);
      setFormData({
        nom: '',
        email: '',
        date: '',
        personnes: 1,
        commentaire: ''
      });
    } catch (err) {
      console.error('Erreur de réservation:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'envoi de votre réservation. Supabase n\'est peut-être pas configuré correctement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-amber-50">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-amber-800 mb-6">Réservation</h1>
        
        {isSubmitted ? (
          <div className="bg-green-100 p-4 rounded-md text-green-700 mb-6">
            <h2 className="text-xl font-semibold">Réservation envoyée !</h2>
            <p className="mt-2">Nous vous contacterons prochainement pour confirmer votre réservation.</p>
            <button 
              onClick={() => setIsSubmitted(false)} 
              className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
            >
              Faire une autre réservation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 p-4 rounded-md text-red-700">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="nom" className="block mb-1 font-medium text-gray-700">Nom complet</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block mb-1 font-medium text-gray-700">Date souhaitée</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div>
              <label htmlFor="personnes" className="block mb-1 font-medium text-gray-700">Nombre de personnes</label>
              <input
                type="number"
                id="personnes"
                name="personnes"
                min="1"
                max="20"
                value={formData.personnes}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div>
              <label htmlFor="commentaire" className="block mb-1 font-medium text-gray-700">Commentaire (facultatif)</label>
              <textarea
                id="commentaire"
                name="commentaire"
                value={formData.commentaire}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors disabled:bg-amber-300"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer la réservation'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
