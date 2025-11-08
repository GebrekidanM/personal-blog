'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroEditor() {
  const [hero, setHero] = useState(
    { 
      title: '', 
      subtitle: '', 
      description: '', 
      image: '' ,
      secondaryButtonLink:'',
      secondaryButtonText:'', 
      primaryButtonLink:'',
      primaryButtonText:''
    }
  );
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setHero(data);
          setImagePreview(data.image);
        }
      });
  }, []);

  const handleChange = (e) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', hero.title);
    formData.append('subtitle', hero.subtitle);
    formData.append('description', hero.description);
    formData.append('primaryButtonLink',hero.primaryButtonLink);
    formData.append('primaryButtonText',hero.primaryButtonText);
    formData.append('secondaryButtonLink',hero.secondaryButtonLink);
    formData.append('secondaryButtonText',hero.secondaryButtonText);

    if (imageFile) formData.append('image', imageFile);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('Hero section updated!');
      router.push('/admin');
    } else {
      alert('Failed to update hero section.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Hero Section</h1>

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={hero.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          value={hero.subtitle}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={hero.description}
          onChange={handleChange}
          className="w-full border p-3 rounded h-24"
        />
        <input
        type="text"
        name="primaryButtonText"
        placeholder="Primary Button Text"
        value={hero.primaryButtonText}
        onChange={handleChange}
        className="w-full border p-3 rounded"/>

        <input
        type="text"
        name="primaryButtonLink"
        placeholder="Primary Button Link"
        value={hero.primaryButtonLink}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        />

        <input
        type="text"
        name="secondaryButtonText"
        placeholder="Secondary Button Text"
        value={hero.secondaryButtonText}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        />

        <input
        type="text"
        name="secondaryButtonLink"
        placeholder="Secondary Button Link"
        value={hero.secondaryButtonLink}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        />


        <div>
          <label className="block mb-2 font-semibold">Image</label>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-48 h-32 object-cover rounded mb-3" />
          )}
          <input type="file" onChange={handleImageChange} />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
