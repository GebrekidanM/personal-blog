// app/(site)/blog/[slug]/page.jsx

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// --- This function fetches the data for a SINGLE post from Strapi ---
async function getPostData(slug) {
  try {
    const res = await fetch(`http://localhost:1337/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }

    const responseData = await res.json();
    
    // The API returns an array, so we need the first item
    if (responseData.data && responseData.data.length > 0) {
      return responseData.data[0];
    } else {
      return null; // Post not found
    }
  } catch (error) {
    console.error("Error fetching single post:", error);
    return null;
  }
}

// --- The Main Exported Page Component ---
export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const postData = await getPostData(slug);

  // If no post is found, trigger the Next.js 404 page
  if (!postData) {
    notFound();
  }
  
  const { title, category, author, date, featuredImage, content } = postData;
  const imageUrl = featuredImage?.url 
    ? `http://localhost:1337${featuredImage.url}`
    : 'https://images.unsplash.com/photo-1521790797524-12432c835848';

  return (
    <main>
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <p className="text-base font-semibold text-blue-600 uppercase">
              {category?.Text || 'Uncategorized'}
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h1>
            <p className="mt-4 text-md text-gray-500">
              By {author || 'Atrsaw Aderajew'} on {date || new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-lg shadow-lg overflow-hidden mb-12">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority // Important for performance (LCP)
            />
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Back to Blog Link */}
          <div className="mt-12 text-center">
            <Link href="/blog" className="text-blue-600 font-semibold hover:underline">
              &larr; Back to All Posts
            </Link>
          </div>
          
        </div>
      </article>
    </main>
  );
}