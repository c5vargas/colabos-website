import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useOnboarding() {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkFirstTimeUser();
  }, []);

  const checkFirstTimeUser = async () => {
    try {
      // Aquí irá la lógica para verificar si el usuario tiene workspaces
      // Si no tiene, setIsFirstTime(true)
      // Si tiene, setIsFirstTime(false)
      setIsFirstTime(true); // Temporally
    } catch (error) {
      console.error('Error checking first time user:', error);
    }
  };

  const redirectToOnboarding = useCallback(() => {
    if (isFirstTime) {
      navigate('/onboarding');
    }
  }, [isFirstTime, navigate]);

  return {
    isFirstTime,
    redirectToOnboarding,
  };
}
