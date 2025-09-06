// app/(site)/blog/page.jsx

import BlogPostCard from "@/components/BlogPostCard";

// --- REAL DATA FETCHING ---
async function getPosts() {
  try {
    const res = await fetch('http://localhost:1337/api/blog-posts?populate=*', { 
      cache: 'no-store' 
    });
    
    if (!res.ok) {
      console.error("Strapi API response was not OK:", res.status, res.statusText);
      return []; // Return empty array on server error
    }

    const responseData = await res.json();
    
    // --- Defensive Check ---
    // The posts are in responseData.data. If it doesn't exist or is not an array, return empty.
    if (!responseData || !Array.isArray(responseData.data)) {
        console.error("API did not return a 'data' array:", responseData);
        return [];
    }

    return responseData.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// --- The Main Exported Page Component ---
export default async function BlogPage() {
  const allPosts = await getPosts();

  const PageHeader = () => (
    <div className="bg-gray-50 text-center py-16 sm:py-20">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
        Atrsaw's Insights
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        A collection of articles on strategy, operations, and the art of leadership.
      </p>
    </div>
  );

  return (
    <main>
      <PageHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {allPosts && allPosts.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
            {allPosts.map((post) => {
              if (!post) {
                return null;
              }

              const transformedPost = {
                slug: post.slug,
                title: post.title,
                category: post.category?.Text || 'Uncategorized',
                excerpt: post.excerpt,
                imageUrl:`http://127.0.0.1:1337${post.featuredImage?.url}`
              };
              return <BlogPostCard key={post.id} post={transformedPost} />;
            })}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-700">No blog posts found. Please check back later!</p>
          </div>
        )}
      </div>
    </main>
  );
}