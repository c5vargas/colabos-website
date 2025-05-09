import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Función para crear el cliente de Supabase con el token de Clerk
export function createSupabaseClient(clerkToken?: string | null) {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: clerkToken ? `Bearer ${clerkToken}` : '',
      },
    },
  });
}

// Cliente por defecto para operaciones no autenticadas
export const supabase = createClient(supabaseUrl, supabaseKey);
