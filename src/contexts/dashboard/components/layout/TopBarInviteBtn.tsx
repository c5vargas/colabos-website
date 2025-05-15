import InviteMemberModal from '@/contexts/members/components/InviteMemberModal';
import { useT } from '@/contexts/shared/hooks/useT';
import { useState } from 'react';

const TopBarInviteBtn: React.FC = () => {
  const t = useT();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className="rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-black-50 transition-colors hover:bg-primary-500"
        onClick={() => setIsModalOpen(true)}
      >
        {t('workspace.invite')}
      </button>

      <InviteMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default TopBarInviteBtn;
