import { useMembers } from '@/contexts/members/hooks/useMembers';
import type { InviteMemberDTO } from '@/contexts/members/libs/types';
import Button from '@/contexts/shared/components/ui/Button';
import Input from '@/contexts/shared/components/ui/Input';
import Modal from '@/contexts/shared/components/ui/Modal';
import Select from '@/contexts/shared/components/ui/Select';
import { useT } from '@/contexts/shared/hooks/useT';
import type { MemberRole } from '@/contexts/workspace/libs/types';
import { useWorkspaceStore } from '@/contexts/workspace/store/useWorkspaceStore';
import { useState } from 'react';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ isOpen, onClose }) => {
  const t = useT();
  const { selectedWorkspace } = useWorkspaceStore();
  const { inviteMember } = useMembers();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<MemberRole>('viewer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError(t('members.errors.emailRequired'));
      return;
    }

    if (!selectedWorkspace) {
      setError(t('members.errors.noWorkspace'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const memberData: InviteMemberDTO = {
        workspace_id: selectedWorkspace.id,
        email,
        member_role: role,
      };

      const success = await inviteMember(memberData);

      if (success) {
        setEmail('');
        setRole('viewer');
        onClose();
      }
    } catch (err) {
      console.error('Error al invitar miembro:', err);
      setError(t('members.errors.inviteFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const roleOptions = [
    { value: 'admin', label: t('members.roles.admin') },
    { value: 'editor', label: t('members.roles.editor') },
    { value: 'viewer', label: t('members.roles.viewer') },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('members.inviteModalTitle')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            {t('members.emailLabel')}
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('members.emailPlaceholder')}
            fullWidth
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-300">
            {t('members.roleLabel')}
          </label>
          <Select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as MemberRole)}
            options={roleOptions}
            disabled={isSubmitting}
          />
        </div>

        {error && <div className="rounded-md bg-red-900/50 p-3 text-sm text-red-300">{error}</div>}

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            {t('common.cancel')}
          </Button>
          <Button variant="primary" type="submit" isLoading={isSubmitting}>
            {t('members.invite')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteMemberModal;
