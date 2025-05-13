import MemberRoleSelect from '@/contexts/members/components/MemberRoleSelect';
import { useMemberItem } from '@/contexts/members/hooks/useMemberItem';
import type { EnrichedMember } from '@/contexts/members/libs/types';
import Button from '@/contexts/shared/components/ui/Button';
import { useT } from '@/contexts/shared/hooks/useT';
import { useState } from 'react';

interface MemberItemProps {
  member: EnrichedMember;
}

const MemberItem: React.FC<MemberItemProps> = ({ member }) => {
  const t = useT();
  const { handleRemove, handleUpdateRole, isUpdating } = useMemberItem(member);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            {member.avatar_url ? (
              <img className="h-10 w-10 rounded-full" src={member.avatar_url} alt={member.name} />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600">
                <span className="text-sm font-medium text-white">
                  {member.email?.substring(0, 1).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-white">{member.email}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {isEditing ? (
          <MemberRoleSelect
            currentRole={member.member_role}
            onRoleChange={(newRole) => {
              handleUpdateRole(newRole);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
            isLoading={isUpdating}
          />
        ) : (
          <div
            className="cursor-pointer text-sm text-gray-300 hover:text-primary-400"
            onClick={() => setIsEditing(true)}
          >
            {t(`members.roles.${member.member_role}`)}
          </div>
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            member.status === 'active'
              ? 'bg-green-100 text-green-800'
              : member.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {t(`members.status.${member.status}`)}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
        <Button variant="secondary" size="sm" onClick={handleRemove}>
          {t('members.remove')}
        </Button>
      </td>
    </tr>
  );
};

export default MemberItem;
