import type { CreateMemberDTO } from '@/contexts/members/libs/types';
import Input from '@/contexts/shared/components/ui/Input';
import Select from '@/contexts/shared/components/ui/Select';
import { useT } from '@/contexts/shared/hooks/useT';

interface MemberFormProps {
  formData: CreateMemberDTO;
  onChange: (field: keyof CreateMemberDTO, value: string) => void;
  className?: string;
}

/**
 * Componente reutilizable para formularios de miembros
 * Puede ser usado para invitar miembros
 */
const MemberForm: React.FC<MemberFormProps> = ({ formData, onChange, className = '' }) => {
  const t = useT();

  const roleOptions = ['admin', 'editor', 'viewer'].map((role) => ({
    value: role,
    label: t(`members.roles.${role}`),
  }));

  return (
    <div className={`space-y-4 ${className}`}>
      <Input
        id="member-email"
        label={t('members.emailLabel')}
        type="email"
        value={formData.email}
        onChange={(e) => onChange('email', e.target.value)}
        placeholder={t('members.emailPlaceholder')}
        required
        fullWidth
      />

      <div>
        <label htmlFor="member-role" className="mb-2 block text-sm font-medium text-gray-300">
          {t('members.roleLabel')}
        </label>
        <Select
          id="member-role"
          value={formData.role}
          onChange={(e) => onChange('role', e.target.value)}
          fullWidth
          options={roleOptions}
        />
      </div>
    </div>
  );
};

export default MemberForm;
