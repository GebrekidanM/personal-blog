'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function EditCatagoryForm({ catagoryData }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: catagoryData?.name || '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Updating...');

    try {
      const res = await fetch(`${api}/catagory/${catagoryData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to update category');
      setStatus('Category updated successfully!');
      router.push('/admin/catagory'); // redirect after success
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-6 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 block w-full border rounded-md px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        Save Changes
      </button>

      {status && <p className="text-sm text-gray-500 mt-2">{status}</p>}
    </form>
  );
}
