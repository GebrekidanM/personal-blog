'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TiptapEditor from '../../../components/TiptapEditor';
import { api } from '@/lib/api';

export default function EditPostForm({ initialPostData }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: initialPostData.title || '',
    slug: initialPostData.slug || '',
    excerpt: initialPostData.excerpt || '',
    category: initialPostData.categoryId.name,
    featuredImageUrl: initialPostData.featuredImageUrl || '',
  });

  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState(initialPostData.content || '');
  const [status, setStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${api}/catagory`);
        console.log('Fetched categories:', res.data);
        setCategories(res.data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Generate slug automatically when title changes
  useEffect(() => {
    const generatedSlug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData((prev) => ({ ...prev, slug: generatedSlug }));
  }, [formData.title]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);
    setIsUploading(true);
    setStatus('Uploading image...');

    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post(`${api}/upload`, uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      setFormData((prev) => ({ ...prev, featuredImageUrl: res.data.imageUrl }));
      setStatus('Image uploaded successfully!');
    } catch (err) {
      setStatus('Image upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  // ✅ Find or create category if it doesn’t exist
  const findOrCreateCategory = async (category) => {
    if (!category) return null;
    try {
      // Try to find existing category by name
      const findRes = await axios.get(`${api}/catagory/by-name/${category}`);
      console.log('Found existing category:', findRes.data);
      if (findRes.data) return findRes.data._id;
    } catch (error) {
      // Not found, continue to create
    }

    try {
      const token = localStorage.getItem('authToken');
      const createRes = await axios.post(
        `${api}/catagory`,
        { name: categoryName },
        { headers: { 'x-auth-token': token } }
      );
      return createRes.data._id;
    } catch (error) {
      console.error('Error creating category:', error);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setStatus('Updating post...');

    try {
      const token = localStorage.getItem('authToken');

      // Ensure category exists or create it
      const categoryId = await findOrCreateCategory(formData.category);
      console.log('Using category ID:', categoryId);
      if (!categoryId) {
        setStatus('Failed to save category.');
        return;
      }

      const finalPostData = { ...formData, content, category: categoryId };

      await axios.put(`${api}/posts/${initialPostData._id}`, finalPostData, {
        headers: { 'x-auth-token': token },
      });

      setStatus('Post updated successfully!');
      setTimeout(() => router.push('/admin/posts'), 1500);
    } catch (err) {
      setStatus(err.response?.data?.msg || 'Failed to update post.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <button
          type="submit"
          disabled={isUpdating || isUploading}
          className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition disabled:bg-green-300 disabled:cursor-not-allowed"
        >
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full text-2xl p-2 border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows="3"
                className="mt-1 block w-full input"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg p-2 shadow">
            <label className="block text-sm font-medium text-gray-700 p-4 pb-0">Content</label>
            <TiptapEditor content={content} onContentChange={setContent} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-1 space-y-6">
          {status && <p className="text-center text-sm p-4 bg-gray-100 rounded">{status}</p>}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">Featured Image</h2>
            <input
              type="file"
              id="image"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {isUploading && <p className="mt-2 text-sm">Uploading...</p>}
            {formData.featuredImageUrl && (
              <div className="mt-4">
                <img
                  src={formData.featuredImageUrl}
                  alt="Preview"
                  className="w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">Post Settings</h2>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>

              {/* ✅ Allows selecting or typing new category */}
              <input
                list="category-list"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Select or type category"
                className="mt-1 block w-full input"
              />

              <datalist id="category-list">
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name} />
                ))}
              </datalist>
            </div>

            <div className="mt-4">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug (URL)
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                readOnly
                className="mt-1 block w-full input bg-gray-100"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
