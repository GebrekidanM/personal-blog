// hooks/useAuth.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Here you could add a step to verify the token with the backend
      // For now, we'll just check if it exists.
      setIsAuthenticated(true);
    } else {
      // If no token, redirect to login page
      router.push('/admin/login');
    }
    setLoading(false);
  }, [router]);

  return { isAuthenticated, loading };
};

export default useAuth;