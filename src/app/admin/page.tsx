'use client';

import { useState, useEffect } from 'react';
import { supabaseClient, Database } from '@/lib/supabaseClient';

type Reservation = Database['public']['Tables']['reservations']['Row'];

export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [dataError, setDataError] = useState<string | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabaseClient.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
        fetchReservations();
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      setIsAuthenticated(true);
      fetchReservations();
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setAuthError(err instanceof Error ? err.message : 'Erreur de connexion. Supabase n\'est peut-être pas configuré correctement.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    setIsAuthenticated(false);
    setReservations([]);
  };

  const fetchReservations = async () => {
    setIsLoadingData(true);
    setDataError(null);

    try {
      const { data, error } = await supabaseClient
        .from('reservations')
        .select('*')
        .order('date', { ascending: true });
      
      if (error) throw error;
      
      setReservations(data ?? []);
    } catch (err) {
      console.error('Erreur lors du chargement des réservations:', err);
      setDataError(err instanceof Error ? err.message : 'Erreur lors du chargement des réservations.');
    } finally {
      setIsLoadingData(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-amber-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-800 mb-8">Administration</h1>
        
        {!isAuthenticated ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-amber-700 mb-4">Connexion</h2>
            
            <form onSubmit={handleLogin} className="space-y-4">
              {authError && (
                <div className="bg-red-100 p-4 rounded-md text-red-700">
                  {authError}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors disabled:bg-amber-300"
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-amber-700">Liste des réservations</h2>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Déconnexion
              </button>
            </div>
            
            {isLoadingData && (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-600 border-r-transparent"></div>
                <p className="mt-2 text-amber-800">Chargement des réservations...</p>
              </div>
            )}
            
            {dataError && (
              <div className="bg-red-100 p-4 rounded-md text-red-700 mb-6">
                <p>{dataError}</p>
              </div>
            )}
            
            {!isLoadingData && !dataError && reservations.length === 0 && (
              <div className="bg-amber-100 p-6 rounded-md text-amber-800 text-center">
                <p>Aucune réservation pour le moment.</p>
              </div>
            )}
            
            {reservations.length > 0 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personnes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commentaire</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{reservation.nom}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{reservation.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{new Date(reservation.date).toLocaleDateString('fr-FR')}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{reservation.personnes}</td>
                        <td className="px-6 py-4">{reservation.commentaire ?? '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
