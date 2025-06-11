import { createClient } from '@supabase/supabase-js';

// Utilisation d'URL test pendant le développement si les variables d'env ne sont pas définies
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-supabase-url.com';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

let supabaseClient;

// Création conditionnelle du client Supabase
try {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.error('Erreur lors de l\'initialisation de Supabase :', error);
  // Créer un client mock pour éviter les erreurs dans le développement
  supabaseClient = {
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: null }),
      order: () => ({ data: [], error: null })
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase n\'est pas configuré.' } }),
      signOut: () => Promise.resolve()
    }
  };
}

export { supabaseClient };
