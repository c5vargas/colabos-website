import Button from '@/contexts/shared/components/ui/Button';
import Select from '@/contexts/shared/components/ui/Select';
import { useT } from '@/contexts/shared/hooks/useT';
import type { MemberRole } from '@/contexts/workspace/libs/types';
import { useState } from 'react';

interface MemberRoleSelectProps {
  currentRole: MemberRole;
  isLoading: boolean;
  onRoleChange: (role: MemberRole) => void;
  onCancel: () => void;
}

const MemberRoleSelect: React.FC<MemberRoleSelectProps> = ({
  currentRole,
  isLoading,
  onRoleChange,
  onCancel,
}) => {
  const t = useT();
  const [selectedRole, setSelectedRole] = useState<MemberRole>(currentRole);

  const roleOptions = ['admin', 'editor', 'viewer'].map((role) => ({
    value: role,
    label: t(`members.roles.${role}`),
  }));

  return (
    <div className="flex items-center space-x-2">
      <Select
        id="member-role"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value as MemberRole)}
        className="w-24 text-sm"
        disabled={isLoading}
        options={roleOptions}
      />
      <div className="flex space-x-1">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onRoleChange(selectedRole)}
          isLoading={isLoading}
        >
          ✓
        </Button>
        <Button variant="ghost" size="sm" onClick={onCancel} disabled={isLoading}>
          ✕
        </Button>
      </div>
    </div>
  );
};

export default MemberRoleSelect;
