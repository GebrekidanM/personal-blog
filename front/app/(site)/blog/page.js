import BlogPostCard from "@/components/BlogPostCard";
import {api} from "@/lib/api";

async function getPosts() {
  try {
    const res = await fetch(`${api}/posts`, { 
      cache: "no-store"
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch posts from Express API');
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}


export default async function BlogPage() {
  const allPosts = await getPosts();

  const PageHeader = () => (
    <div className="bg-gray-50 text-center py-16 sm:py-20">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
        Atrsaw&apos;s Insights
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
              const transformedPost = {
                id: post._id, 
                slug: post.slug,
                title: post.title,
                category: post.category,
                excerpt: post.excerpt,
                imageUrl: post.featuredImageUrl,
              };
              return <BlogPostCard key={transformedPost.id} post={transformedPost} />;
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