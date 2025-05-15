import { checkIfWorkspaceExists } from '@/contexts/workspace/actions/checkIfWorkspaceExists';
import { useAuth } from '@clerk/clerk-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useOnboarding() {
  const { getToken } = useAuth();
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkFirstTimeUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = await getToken({ template: 'supabase' });
      const hasWorkspaces = await checkIfWorkspaceExists(token);
      setIsFirstTime(!hasWorkspaces);
    } catch (error) {
      console.error('Error al verificar usuario nuevo:', error);
      setIsFirstTime(true);
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    checkFirstTimeUser();
  }, [checkFirstTimeUser]);

  const redirectToOnboarding = useCallback(() => {
    if (isFirstTime) {
      navigate('/onboarding');
    }
  }, [isFirstTime, navigate]);

  return {
    isFirstTime,
    isLoading,
    redirectToOnboarding,
  };
}
