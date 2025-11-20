"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "../../../components/TiptapEditor";
import { api } from "@/lib/api";

export default function EditPostForm({ initialPostData }) {
  const router = useRouter();

  // -------------------------
  // FORM STATE
  // -------------------------
  const [formData, setFormData] = useState({
    title: initialPostData.title || "",
    slug: initialPostData.slug || "",
    excerpt: initialPostData.excerpt || "",
    featuredImageUrl: initialPostData.featuredImageUrl || "",
    // IMPORTANT: store category as plain string
    categoryName: initialPostData.categoryId?.name || "",
  });

  const [content, setContent] = useState(initialPostData.content || "");
  const [categories, setCategories] = useState([]);

  // -------------------------
  // FETCH ALL CATEGORIES
  // -------------------------
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(`${api}/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    loadCategories();
  }, []);

  // -------------------------
  // HANDLE INPUT CHANGE
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -------------------------
  // FIND OR CREATE CATEGORY
  // -------------------------
  const findOrCreateCategory = async (name) => {
    try {
      const res = await fetch(`${api}/categories/find-or-create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      return data._id;
    } catch (err) {
      console.error("Category create error:", err);
      return null;
    }
  };

  // -------------------------
  // SUBMIT: CREATE / UPDATE
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Get categoryId from categoryName
    const categoryId = await findOrCreateCategory(formData.categoryName);

    // Step 2: Send updated post
    const updatedPost = {
      ...formData,
      content,
      category: categoryId, // Backend expects categoryId
    };

    try {
      const res = await fetch(`${api}/posts/${initialPostData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });

      if (res.ok) {
        router.push("/blog");
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  // -------------------------
  // FORM JSX
  // -------------------------
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Title */}
      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block font-medium">Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block font-medium">Excerpt</label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      {/* Featured Image URL */}
      <div>
        <label className="block font-medium">Featured Image URL</label>
        <input
          type="text"
          name="featuredImageUrl"
          value={formData.featuredImageUrl}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      {/* Category (datalist) */}
      <div>
        <label className="block font-medium">Category</label>

        <input
          list="category-list"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleChange}
          placeholder="Select or type category"
          className="input w-full"
        />

        <datalist id="category-list">
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name} />
          ))}
        </datalist>
      </div>

      {/* Content (Tiptap) */}
      <div>
        <label className="block font-medium">Content</label>
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="px-6 py-3 bg-black text-white rounded-md"
      >
        Update Post
      </button>
    </form>
  );
}
