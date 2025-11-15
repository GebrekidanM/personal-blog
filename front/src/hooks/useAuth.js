// hooks/useAuth.js
'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { api } from '@/lib/api';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setIsAuthenticated(false);
          router.replace("/admin/login");
          return;
        }

        // Verify token with backend
        const res = await axios.get(`${api}/users/me`, {
          headers: { "x-auth-token": token }
        });

        if (res.data) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Token invalid or expired
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, loading };
}
