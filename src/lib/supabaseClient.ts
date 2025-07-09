import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Types pour la base de données
export interface Database {
  public: {
    Tables: {
      reservations: {
        Row: {
          id: number;
          nom: string;
          email: string;
          date: string;
          personnes: number;
          commentaire: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          nom: string;
          email: string;
          date: string;
          personnes: number;
          commentaire?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          nom?: string;
          email?: string;
          date?: string;
          personnes?: number;
          commentaire?: string | null;
          created_at?: string;
        };
      };
      annonces: {
        Row: {
          id: number;
          titre: string;
          contenu: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          titre: string;
          contenu: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          titre?: string;
          contenu?: string;
          created_at?: string;
        };
      };
    };
  };
}

// Utilisation d'URL test pendant le développement si les variables d'env ne sont pas définies
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder-supabase-url.com';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key';

// Création du client Supabase
const supabaseClient: SupabaseClient<Database> = createClient(supabaseUrl, supabaseAnonKey);

export { supabaseClient };
