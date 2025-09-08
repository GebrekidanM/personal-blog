'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useAuth from '../../../../../hooks/useAuth';
import TiptapEditor from '../../../../../components/TiptapEditor';

export default function NewPostPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Strategic Insights');
  const [status, setStatus] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
 
  // Auto-generate slug (no change here)
  useEffect(() => {
    const generatedSlug = title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    setSlug(generatedSlug);
  }, [title]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setIsUploading(true);
    setStatus('Uploading image...');

    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post('http://localhost:4000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });

      // The backend returns the secure URL from Cloudinary
      setFeaturedImageUrl(res.data.imageUrl);
      setStatus('Image uploaded successfully!');
    } catch (err) {
      console.error('Image upload error:', err);
      setStatus('Image upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    setStatus('Publishing...');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication error.');

      const newPost = { title, slug, excerpt, content, category,featuredImageUrl };
      await axios.post('http://localhost:4000/api/posts', newPost, {
        headers: { 'x-auth-token': token },
      });

      setStatus('Post published successfully!');
      setTimeout(() => router.push('/admin/posts'), 1500);

    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'Failed to publish post.';
      setStatus(errorMessage);
    } finally {
      setIsPublishing(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!isAuthenticated) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <button
            type="submit"
            disabled={isPublishing}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isPublishing ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>

        {/* --- TWO-COLUMN LAYOUT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
          
          {/* --- LEFT COLUMN (Main Content) --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white p-4 rounded-lg shadow">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full text-xl p-2 border-2 border-gray-200 rounded-md outline-0"/>
            </div>
            
            {/* Content (Rich Text Editor) */}
            <div className="bg-white rounded-lg shadow p-2">
              <label className="block text-sm font-medium text-gray-700 p-4 pb-0">Content</label>
              <TiptapEditor
                content={content}
                onContentChange={(newContent) => setContent(newContent)}
              />
            </div>
          </div>

          {/* --- RIGHT COLUMN (Sidebar for Settings) --- */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Message Area */}
            {status && <p className="text-center text-sm text-gray-600 p-4 bg-gray-100 rounded">{status}</p>}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">Post Settings</h2>
              
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full p-2 border-2 border-gray-200 outline-0 rounded-md">
                  <option>Strategic Insights</option>
                  <option>Operational Excellence</option>
                  <option>Leadership & Culture</option>
                </select>
              </div>

              {/* Slug (URL) */}
              <div className="mt-4">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug (URL)</label>
                <input type="text" id="slug" value={slug} readOnly className="mt-1 block w-full p-2 border-2 border-gray-200 outline-0 rounded-md bg-gray-100"/>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">Featured Image</h2>
                <input type="file" id="image" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                {isUploading && <p className="mt-2 text-sm">Uploading...</p>}
                
                {/* Image Preview */}
                {featuredImageUrl && (
                    <div className="mt-4">
                    <img src={featuredImageUrl} alt="Preview" className="w-full h-auto rounded-md" />
                    </div>
                )}
               </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">Excerpt</h2>
              <p className="text-xs text-gray-500 mb-2">A short summary of the post for previews.</p>
              <textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required rows="5" className="mt-1 block w-full p-2 border-2 border-gray-200 outline-0 rounded-md"/>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}