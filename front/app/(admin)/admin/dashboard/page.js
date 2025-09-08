'use client';

import useAuth from '../../../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/admin/login');
  };
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          </div>
        </nav>
        
        <main className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome, Atrsaw!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Link to create a new post */}
            <div
              onClick={() => router.push('/admin/posts/new')}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="font-bold text-lg text-blue-600">Create New Post</h3>
              <p className="mt-2 text-gray-600">Write and publish a new article for your blog.</p>
            </div>
            
            {/* Link to manage existing posts */}
            <div
              onClick={() => router.push('/admin/posts')}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="font-bold text-lg text-blue-600">Manage Posts</h3>
              <p className="mt-2 text-gray-600">Edit, update, or delete your existing blog posts.</p>
            </div>
            
            {/* We can add more cards here later for categories, subscriptions, etc. */}
          </div>
        </main>
      </div>
    );
  }

  return null;
}