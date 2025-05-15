import { createSupabaseClient } from '@/contexts/shared/libs/supabase';

/**
 * Actualiza la posición de un enlace en Supabase
 * @param token Token JWT para autenticación
 * @param linkId ID del enlace a actualizar
 * @param position Nueva posición del enlace
 * @returns El enlace actualizado
 */
export const updateLinkPosition = async (
  clerkToken: string | null,
  linkId: string,
  position: number,
) => {
  const supabase = createSupabaseClient(clerkToken);

  try {
    // Actualizar la posición del enlace
    const { data, error } = await supabase
      .from('links')
      .update({ position })
      .eq('id', linkId)
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar la posición del enlace:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error al actualizar la posición del enlace:', error);
    throw error;
  }
};
