
import { useNavigate } from 'react-router-dom';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  // Using currentUser to match the key used in Login.tsx
  const isAuthenticated = () => {
    return localStorage.getItem('currentUser') !== null;
  };

  const handleAuthenticatedAction = (action: () => void) => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    action();
  };

  return { handleAuthenticatedAction, isAuthenticated };
};
