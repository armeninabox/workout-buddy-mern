import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

//faccio il signup con questo hook, mandare la request , far tornare un response, se e' successful e l'user e' loggato allora faccio l'update anche di useAuthContext: Abbiamo il current user e cosi' posso fare l'update di AuthContext (dove c'e' user: null e inserire l'user email , che ora e' disponibile)

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);

    setError(null);

    // request
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
