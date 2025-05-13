import { useMembers } from '@/contexts/members/hooks/useMembers';
import type { Member } from '@/contexts/members/libs/types';
import { useWorkspace } from '@/contexts/workspace/hooks/useWorkspace';
import type { MemberRole } from '@/contexts/workspace/libs/types';
import { useEffect, useState } from 'react';

interface UseMembersPageReturn {
  members: Member[];
  searchTerm: string;
  selectedRole: MemberRole | null;
  roles: string[];
  isLoading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  setSelectedRole: (role: MemberRole | null) => void;
}

export const useMembersPage = (): UseMembersPageReturn => {
  const { members, isLoading, error, fetchMembers } = useMembers();
  const { workspace } = useWorkspace();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<MemberRole | null>(null);
  const roles = ['admin', 'editor', 'viewer'] as MemberRole[];

  useEffect(() => {
    if (!workspace) return;
    fetchMembers();
  }, [workspace]);

  return {
    members,
    searchTerm,
    roles,
    selectedRole,
    isLoading,
    error,
    setSearchTerm,
    setSelectedRole,
  };
};
