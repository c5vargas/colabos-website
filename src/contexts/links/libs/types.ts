export interface Link {
  id: string;
  name: string;
  url: string;
  workspace_id: string;
  user_id: string;
  image_src: string;
  category: string;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface CreateLinkDTO {
  name: string;
  url: string;
  workspace_id: string;
  image_src: string | File;
  category: string;
}
