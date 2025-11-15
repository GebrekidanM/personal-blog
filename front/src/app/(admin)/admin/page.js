'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { FaPen, FaSignOutAlt, FaUser, FaImages, FaHome } from 'react-icons/fa';

export default function DashboardPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white mt-0 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Welcome, Atrsaw 👋</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/** Create new Catagory */}
          <div
            onClick={() => router.push('/admin/catagory/new')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <FaPen className="text-blue-600 text-3xl mb-3" />
            <h3 className="font-bold text-lg text-blue-600">Create New Category</h3>
            <p className="mt-2 text-gray-600">Add a new category to organize your posts.</p>
          </div>

          {/** Manage Catagories */}
          <div
            onClick={() => router.push('/admin/catagory')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <FaImages className="text-green-600 text-3xl mb-3" />
            <h3 className="font-bold text-lg text-green-600">Manage Categories</h3> 
            <p className="mt-2 text-gray-600">Edit or delete existing categories.</p>
          </div>  
          {/* Create Post */}
          <div
            onClick={() => router.push('/admin/posts/new')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <FaPen className="text-blue-600 text-3xl mb-3" />
            <h3 className="font-bold text-lg text-blue-600">Create New Post</h3>
            <p className="mt-2 text-gray-600">Write and publish a new article.</p>
          </div>

          {/* Manage Posts */}
          <div
            onClick={() => router.push('/admin/posts')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <FaImages className="text-green-600 text-3xl mb-3" />
            <h3 className="font-bold text-lg text-green-600">Manage Posts</h3>
            <p className="mt-2 text-gray-600">Edit, update, or delete existing posts.</p>
          </div>

          {/* Manage About Section */}
          <div
            onClick={() => router.push('/admin/about')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <FaUser className="text-purple-600 text-3xl mb-3" />
            <h3 className="font-bold text-lg text-purple-600">About Section</h3>
            <p className="mt-2 text-gray-600">Update your profile photo and description.</p>
          </div>

          {/* Manage Hero Section */}
          <div
            onClick={() => router.push('/admin/hero')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <FaHome className="text-yellow-600 text-3xl mb-3" />
            <h3 className="font-bold text-lg text-yellow-600">Hero Section</h3>
            <p className="mt-2 text-gray-600">
              Edit homepage title, description, buttons, and image.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center py-4 shadow-inner text-gray-500 text-sm">
        © {new Date().getFullYear()} Atrsaw Admin Panel — Powered by Next.js
      </footer>
    </div>
  );
}
