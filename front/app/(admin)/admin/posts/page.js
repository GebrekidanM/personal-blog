'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import useAuth from '../../../../hooks/useAuth';
import { FiEdit, FiTrash2, FiPlusCircle } from 'react-icons/fi';

export default function ManagePostsPage() {
  const { isAuthenticated, loading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('Loading posts...');

  // Function to fetch all posts
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setStatus('Authentication error.');
        return;
      }
      
      // We use the PUBLIC endpoint to get posts
      const res = await axios.get('http://localhost:4000/api/posts');
      setPosts(res.data);
      if (res.data.length === 0) {
        setStatus('No posts found. Create your first one!');
      } else {
        setStatus('');
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setStatus('Failed to load posts.');
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  // Function to handle deleting a post
  const handleDelete = async (postId) => {
    // Ask for confirmation before deleting
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:4000/api/posts/${postId}`, {
        headers: { 'x-auth-token': token }
      });
      // Refresh the list of posts after deletion
      fetchPosts();
      setStatus('Post deleted successfully.');
    } catch (err) {
      console.error('Failed to delete post:', err);
      setStatus('Failed to delete post.');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if (!isAuthenticated) {
    return null; // The auth hook handles redirection
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Posts</h1>
        <Link href="/admin/posts/new" className="flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          <FiPlusCircle className="mr-2" />
          Create New Post
        </Link>
      </div>

      {status && <p className="text-center my-4">{status}</p>}

      {posts.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Title</th>
                <th className="py-2 hidden md:table-cell">Category</th>
                <th className="py-2 hidden sm:table-cell">Date</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 font-semibold">{post.title}</td>
                  <td className="py-4 hidden md:table-cell">{post.category}</td>
                  <td className="py-4 hidden sm:table-cell">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 flex justify-end space-x-2">
                    <Link href={`/admin/posts/edit/${post._id}`} className="p-2 text-blue-600 hover:text-blue-800" title="Edit">
                      <FiEdit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(post._id)} className="p-2 text-red-600 hover:text-red-800" title="Delete">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}