'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {api} from '../../../../lib/api';

export default function AboutAdminPage() {
  const [about, setAbout] = useState({ name: '', title: '', description: '', image: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${api}/about`);
      if (res.data) setAbout(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', about.name);
    formData.append('title', about.title);
    formData.append('description', about.description);
    if (file) formData.append('image', file);

    try {
      await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ About info updated successfully');
      fetchAbout();
    } catch (err) {
      console.error('Update error:', err);
      alert('❌ Failed to update About info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage About Section</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={about.name}
              onChange={(e) => setAbout({ ...about, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={about.title}
              onChange={(e) => setAbout({ ...about, title: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              value={about.description}
              onChange={(e) => setAbout({ ...about, description: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 h-32 resize-none focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Profile Image</label>
            {about.image && (
              <img
                src={about.image}
                alt="About"
                className="w-32 h-32 object-cover rounded-full mb-3"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
