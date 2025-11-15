'use client';

import { useState, useEffect } from "react";
import BlogPostCard from "../../../components/BlogPostCard";
import { api } from "@/lib/api";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch posts using async inside useEffect
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${api}/posts`, { cache: "no-store" });
        const data = await res.json();

        setPosts(data);

        // Create unique dynamic categories
        const unique = ["All", ...new Set(data.map((p) => p.categoryId.name))];
        setCategories(unique);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.categoryId.name === selectedCategory);

  return (
    <main>
      {/* Page Header */}
      <div className="bg-gray-50 text-center py-16 sm:py-20">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          Atrsaw&apos;s Insights
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A collection of articles on strategy, operations, and leadership.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border transition 
                ${
                  selectedCategory === cat
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {loading ? (
          <p className="text-center text-lg">Loading posts...</p>
        ) : filteredPosts.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <BlogPostCard
                key={post._id}
                post={{
                  id: post._id,
                  slug: post.slug,
                  title: post.title,
                  category: post.categoryId.name,
                  excerpt: post.excerpt,
                  imageUrl: post.featuredImageUrl,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-700">No posts in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}
