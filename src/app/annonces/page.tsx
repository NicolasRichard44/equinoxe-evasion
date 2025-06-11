'use client';

import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';

interface Annonce {
  id: number;
  titre: string;
  contenu: string;
  created_at: string;
}

export default function Annonces() {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        // Vérification si on est en mode développement sans Supabase configuré
        if (process.env.NODE_ENV === 'development' && 
            (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
          console.log('Mode développement sans Supabase actif');
          // Simuler un délai de chargement et des données de test
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Données factices pour le développement
          setAnnonces([
            {
              id: 1,
              titre: 'Stage d\'équitation - Été 2025',
              contenu: 'Rejoignez-nous pour notre stage d\'équitation estival du 15 au 30 juillet. Tous niveaux acceptés, à partir de 8 ans.',
              created_at: new Date().toISOString()
            },
            {
              id: 2,
              titre: 'Balade au coucher de soleil',
              contenu: 'Profitez d\'une expérience unique avec nos balades équestres au coucher de soleil tous les vendredis soir de juin.',
              created_at: new Date(Date.now() - 7*24*60*60*1000).toISOString()
            }
          ]);
          setIsLoading(false);
          return;
        }
        
        const { data, error } = await supabaseClient
          .from('annonces')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setAnnonces(data || []);
      } catch (err) {
        console.error('Erreur lors du chargement des annonces:', err);
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des annonces. Supabase n\'est peut-être pas configuré correctement.');
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
