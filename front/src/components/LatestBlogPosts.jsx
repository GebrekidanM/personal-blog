import { api } from '@/lib/api';
import BlogPostCard from './BlogPostCard';
import Link from 'next/link';

async function getLatestPosts() {
  try {
    const res = await fetch(`${api}/posts`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await res.json();
    return posts.slice(0, 3);
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return [];
  }
}

export default async function LatestBlogPosts() {
  const latestPosts = await getLatestPosts();

  if (!latestPosts || latestPosts.length === 0) {
    return null; 
  }

  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            From the Blog
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Actionable insights on strategy, operations, and leadership.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          {latestPosts.map((post) => {
            // Transform the data to match what BlogPostCard expects
            const transformedPost = {
              slug: post.slug,
              title: post.title,
              category: post.categoryId.name,
              author: post.author.name,
              excerpt: post.excerpt,
              imageUrl: post.featuredImageUrl || 'https://images.unsplash.com/photo-1620714223084-86c9df2a8894',
            };
            return <BlogPostCard key={post._id} post={transformedPost} />;
          })}
        </div>
        
        {/* "View All" Button */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 transition-transform transform hover:scale-105"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};