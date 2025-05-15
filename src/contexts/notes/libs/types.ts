/**
 * Tipos y interfaces para el módulo de notas
 */

export interface Note {
  id: string;
  title: string;
  content: string;
  workspace_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  is_pinned: boolean;
  position: number;
  color?: string;
  tags?: string[];
  is_archived: boolean;
  last_edited_by?: string;
}

export interface CreateNoteDTO {
  title: string;
  content: string;
  workspace_id: string;
  color?: string;
  tags?: string[];
  is_pinned?: boolean;
}

export interface UpdateNoteDTO {
  title?: string;
  content?: string;
  color?: string;
  tags?: string[];
  is_pinned?: boolean;
  is_archived?: boolean;
  position?: number;
}
