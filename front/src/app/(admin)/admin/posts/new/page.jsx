'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TiptapEditor from '../../../../../components/TiptapEditor';
import {api} from '@/lib/api';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

const Option = ({catagory}) => {
  return(
    <option value={`${catagory}`}>{catagory}</option>
  )
}

export default function NewPostPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState();
  const [status, setStatus] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [author, setAuthor] = useState('');
  const [fetchCategory,setFetchCategory] = useState([])
  const [categoryId,setCategoryId]=useState(' ');
  // Auto-generate slug (no change here)
  useEffect(() => {
    const generatedSlug = title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    setSlug(generatedSlug);

    const fetchAuthor = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get(`${api}/users/me`, {
          headers: { 'x-auth-token': token },
        });
        setAuthor(res.data._id);
      } catch (err) {
        console.error('Failed to fetch author info:', err);
      }
    };

    if (isAuthenticated) {
      fetchAuthor();
    } 

    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${api}/catagory`);
        //res.data is array
        setFetchCategory(res.data);
      } catch (err) {
        console.error('Failed to fetch category info:', err);
      }
    };

    fetchCategory();
  }, [title,isAuthenticated]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setIsUploading(true);
    setStatus('Uploading image...');

    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post(`${api}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      if(!res){
        console.error('No response from image upload');
      }

      // The backend returns the secure URL from Cloudinary
      setFeaturedImageUrl(res.data.imageUrl);
      setStatus('Image uploaded successfully!');
    } catch (err) {
      console.error(err.message);
      setStatus('Image upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const categoryObj = fetchCategory.find(cat => cat.name === selectedCategory);
    if (categoryObj) {
      setCategoryId(categoryObj._id);
    } else {
      setCategoryId(null);
    }
    setCategory(selectedCategory);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    setStatus('Publishing...');

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Authentication error.');

      const newPost = { title, slug, excerpt, content, categoryId,featuredImageUrl, author };
      await axios.post(`${api}/posts`, newPost, {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/admin" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Dashboard</Link>
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
                <label className="block text-sm font-medium text-gray-700">Category</label>

                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="mt-1 block w-full p-2 border-2 outline-none border-gray-200 rounded-md"
                >
                  <option value="">-- Select Category --</option>

                  {fetchCategory.length > 0 &&
                    fetchCategory.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
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
                {status==='Image upload failed.' && !isUploading && <p className='text-red-600'>{status}</p>}
                
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