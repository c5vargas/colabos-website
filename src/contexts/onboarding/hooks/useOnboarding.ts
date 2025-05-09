import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfWorkspaceExists } from '@/contexts/workspace/actions/checkIfWorkspaceExists';

export function useOnboarding() {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkFirstTimeUser = async () => {
    try {
      setIsLoading(true);
      const hasWorkspaces = await checkIfWorkspaceExists();
      setIsFirstTime(!hasWorkspaces);
    } catch (error) {
      console.error('Error al verificar usuario nuevo:', error);
      setIsFirstTime(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkFirstTimeUser();
  }, []);

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
