import { type MemberRole, type MemberStatus } from '@/contexts/workspace/libs/types';

export interface Member {
  id: string;
  workspace_id: string;
  user_id?: string;
  email: string;
  member_role: MemberRole;
  status: 'active' | 'pending' | 'inactive';
  created_at: string;
  updated_at: string;
}

/**
 * Representa un miembro con datos enriquecidos desde Clerk
 */
export interface EnrichedMember extends Member {
  name?: string;
  avatar_url?: string;
}

export interface WorkspaceMemberWithWorkspace {
  id: string;
  workspace_id: string;
  email: string;
  member_role: string;
  created_at: string;
  workspaces: {
    name: string;
  };
}

export interface InviteMemberDTO {
  workspace_id: string;
  email: string;
  member_role: MemberRole;
}

export interface UpdateMemberDTO {
  id: string;
  member_role?: MemberRole;
  status?: MemberStatus;
}

export interface CreateMemberDTO {
  email: string;
  member_role: MemberRole;
  workspace_id: string;
}
