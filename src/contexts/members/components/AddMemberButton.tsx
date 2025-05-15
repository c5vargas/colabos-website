import InviteMemberModal from '@/contexts/members/components/InviteMemberModal';
import Button from '@/contexts/shared/components/ui/Button';
import { useT } from '@/contexts/shared/hooks/useT';
import { useState } from 'react';

const AddMemberButton: React.FC = () => {
  const t = useT();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        {t('members.invite')}
      </Button>

      <InviteMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AddMemberButton;
