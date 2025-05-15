import Input from '@/contexts/shared/components/ui/Input';
import Select from '@/contexts/shared/components/ui/Select';
import { useT } from '@/contexts/shared/hooks/useT';
import type { MemberRole } from '@/contexts/workspace/libs/types';

interface MembersSearchBarProps {
  searchTerm: string;
  selectedRole: MemberRole | null;
  roles: string[];
  onSearchChange: (term: string) => void;
  onRoleChange: (role: MemberRole | null) => void;
}

const MembersSearchBar: React.FC<MembersSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleChange,
  roles,
}) => {
  const t = useT();

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Input
        id="search-members"
        placeholder={t('members.searchPlaceholder')}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
        className="flex-1"
        icon={
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        }
      />

      <Select
        id="role-filter"
        value={selectedRole as string}
        onChange={(e) => onRoleChange(e.currentTarget.value as MemberRole)}
        className="md:w-48"
        options={[
          { value: '', label: t('members.allRoles') },
          ...roles.map((role) => ({
            value: role,
            label: t(`members.roles.${role}`),
          })),
        ]}
      />
    </div>
  );
};

export default MembersSearchBar;
