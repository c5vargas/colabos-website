import AddMemberButton from '@/contexts/members/components/AddMemberButton';
import MembersList from '@/contexts/members/components/MembersList';
import MembersSearchBar from '@/contexts/members/components/MembersSearchBar';
import { useMembersPage } from '@/contexts/members/hooks/useMembersPage';
import { useT } from '@/contexts/shared/hooks/useT';

const MembersPage: React.FC = () => {
  const t = useT();
  const {
    members,
    searchTerm,
    selectedRole,
    roles,
    isLoading,
    error,
    setSearchTerm,
    setSelectedRole,
  } = useMembersPage();

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{t('members.title')}</h1>
        <AddMemberButton />
      </div>

      <div className="mb-6 space-y-4">
        <MembersSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          roles={roles}
        />
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-500/50 bg-red-500/20 p-4 text-red-400">
          {error}
        </div>
      )}

      <MembersList
        members={members}
        searchTerm={searchTerm}
        roleFilter={selectedRole}
        isLoading={isLoading}
      />
    </>
  );
};

export default MembersPage;
