import { createSupabaseClient } from '@/contexts/shared/libs/supabase';

/**
 * Elimina un enlace de Supabase
 * @param token Token JWT para autenticación
 * @param linkId ID del enlace a eliminar
 * @returns Void
 */
export const deleteLink = async (clerkToken: string | null, linkId: string) => {
  const supabase = createSupabaseClient(clerkToken);

  try {
    const { data: linkData, error: fetchError } = await supabase
      .from('links')
      .select('image_src')
      .eq('id', linkId)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    if (linkData?.image_src) {
      const imagePath = linkData.image_src;
      const storagePathMatch = imagePath.match(/\/images\/([^?]+)/);

      if (storagePathMatch && storagePathMatch[1]) {
        const filePath = storagePathMatch[1];
        const { error: deleteImageError } = await supabase.storage
          .from('images')
          .remove([filePath]);

        if (deleteImageError) {
          console.error('Error al eliminar la imagen:', deleteImageError);
        }
      }
    }

    const { error } = await supabase.from('links').delete().eq('id', linkId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error al eliminar el enlace:', error);
    throw error;
  }
};
