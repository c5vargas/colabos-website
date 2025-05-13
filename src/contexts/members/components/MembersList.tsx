import MemberItem from '@/contexts/members/components/MemberItem';
import type { EnrichedMember } from '@/contexts/members/libs/types';
import Spinner from '@/contexts/shared/components/ui/Spinner';
import { useT } from '@/contexts/shared/hooks/useT';
import type { MemberRole } from '@/contexts/workspace/libs/types';
import { useMemo } from 'react';

interface MembersListProps {
  members: EnrichedMember[];
  searchTerm: string;
  roleFilter: MemberRole | null;
  isLoading: boolean;
}

const MembersList: React.FC<MembersListProps> = ({
  members,
  searchTerm,
  roleFilter,
  isLoading,
}) => {
  const t = useT();

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch = searchTerm
        ? member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesRole = roleFilter ? member.member_role === roleFilter : true;
      return matchesSearch && matchesRole;
    });
  }, [members, searchTerm, roleFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="py-12 text-center text-gray-400">
        <p>{t('members.noMembers')}</p>
      </div>
    );
  }

  if (filteredMembers.length === 0) {
    return (
      <div className="py-12 text-center text-gray-400">
        <p>{t('members.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-black-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-black-700">
          <thead className="bg-black-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
              >
                {t('members.email')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
              >
                {t('members.role')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
              >
                {t('members.status_label')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400"
              >
                {t('members.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black-700 bg-black-800">
            {filteredMembers.map((member) => (
              <MemberItem key={member.id} member={member} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersList;
