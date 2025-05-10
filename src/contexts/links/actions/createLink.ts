import type { CreateLinkDTO } from '@/contexts/links/libs/types';
import { createSupabaseClient } from '@/contexts/shared/libs/supabase';

/**
 * Crea un nuevo enlace en Supabase
 * @param token Token JWT para autenticación
 * @param linkData Datos del enlace a crear
 * @returns El enlace creado
 */
export const createLink = async (clerkToken: string | null, linkData: CreateLinkDTO) => {
  const supabase = createSupabaseClient(clerkToken);

  try {
    // Procesar la imagen si existe
    let imagePath = '';

    // Si image_src es un objeto File
    if (linkData.image_src instanceof File) {
      const file = linkData.image_src;
      const fileExt = file.name.split('.').pop();
      const fileName = `${new Date().getTime()}.${fileExt}`;
      const filePath = `links/${fileName}`;

      // Subir el archivo directamente
      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Obtener la URL pública
      const { data } = supabase.storage.from('images').getPublicUrl(filePath);

      if (!data) {
        throw Error('No se pudo obtener la URL de la imagen');
      }
      imagePath = data.publicUrl || '';
      console.log('imagePath', imagePath);
    }

    // Crear el enlace en la base de datos
    const { data, error } = await supabase
      .from('links')
      .insert({
        name: linkData.name,
        url: linkData.url,
        workspace_id: linkData.workspace_id,
        image_src: imagePath,
        category: linkData.category,
      })
      .select()
      .single();

    if (error) {
      console.log('error', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error al crear el enlace:', error);
    throw error;
  }
};
