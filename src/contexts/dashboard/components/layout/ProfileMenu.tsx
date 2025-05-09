import { useState } from 'react';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import { useT } from '@/contexts/shared/hooks/useT';

const ProfileMenu: React.FC = () => {
  const { user } = useUser();
  const t = useT();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleProfileMenu}
        className="flex items-center space-x-2 rounded-full bg-black-700 p-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <div className="h-8 w-8 rounded-full bg-black-600 flex items-center justify-center overflow-hidden">
          {user?.hasImage ? (
            <img
              src={user.imageUrl}
              alt={user?.firstName || 'Usuario'}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-gray-300">
              {user?.firstName?.charAt(0) || 'U'}
            </span>
          )}
        </div>
      </button>

      {/* Menú desplegable de perfil */}
      {isProfileMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-black-800 py-1 shadow-lg ring-1 ring-black-700 ring-opacity-5">
          <div className="px-4 py-2 text-sm text-gray-300">
            {user?.firstName} {user?.lastName}
          </div>
          <hr className="border-black-700" />
          <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-black-700">
            {t('profile.settings')}
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-black-700">
            {t('profile.darkMode')}
          </a>
          <hr className="border-black-700" />
          <div className="px-4 py-2">
            <SignOutButton>
              <button className="w-full text-left text-sm text-red-400 hover:text-red-300">
                {t('profile.signOut')}
              </button>
            </SignOutButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
