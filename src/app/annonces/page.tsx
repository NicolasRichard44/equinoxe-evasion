'use client';

import { useEffect, useState } from 'react';
import { supabaseClient, Database } from '@/lib/supabaseClient';

type Annonce = Database['public']['Tables']['annonces']['Row'];

export default function Annonces() {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      {
        const { data, error } = await supabaseClient
          .from('annonces')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setAnnonces(data ?? []);
      } catch (err) {
        console.error('Erreur lors du chargement des annonces:', err);
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des annonces.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnonces();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-amber-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-800 mb-8">Nos annonces</h1>
        
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-600 border-r-transparent"></div>
            <p className="mt-2 text-amber-800">Chargement des annonces...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 p-4 rounded-md text-red-700">
            <p>{error}</p>
          </div>
        )}
        
        {!isLoading && !error && annonces.length === 0 && (
          <div className="bg-amber-100 p-6 rounded-md text-amber-800 text-center">
            <p>Aucune annonce disponible pour le moment.</p>
          </div>
        )}
        
        <div className="space-y-6">
          {annonces.map((annonce) => (
            <div key={annonce.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-amber-700 mb-2">{annonce.titre}</h2>
              <div className="text-gray-700 whitespace-pre-line">{annonce.contenu}</div>
              <div className="mt-4 text-sm text-gray-500">
                {new Date(annonce.created_at).toLocaleDateString('fr-FR')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
