export interface Workspace {
  id: string;
  name: string;
  members: string[];
  description: string;
  created_at: string;
  owner_id: string;
}

export type MemberRole = 'admin' | 'editor' | 'viewer';
export type MemberStatus = 'pending' | 'active' | 'rejected';

export interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  member_role: MemberRole;
  status: MemberStatus;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceMemberFormData {
  email: string;
  role: MemberRole;
}
