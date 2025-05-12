import { createSupabaseClient } from '@/contexts/shared/libs/supabase';

interface PositionUpdate {
  id: string;
  position: number;
}

/**
 * Actualiza las posiciones de múltiples enlaces en una sola operación
 * @param clerkToken Token JWT para autenticación
 * @param updates Array de actualizaciones de posición
 * @returns Los enlaces actualizados
 */
export const updateMultiplePositions = async (
  clerkToken: string | null,
  updates: PositionUpdate[],
) => {
  const supabase = createSupabaseClient(clerkToken);

  try {
    const { data, error } = await supabase.rpc('update_link_positions', {
      position_updates: updates,
    });

    if (error) {
      console.error('Error al actualizar las posiciones de los enlaces:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error al actualizar las posiciones de los enlaces:', error);
    throw error;
  }
};
