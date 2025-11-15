import { api } from '../../../../lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getPostData(slug) {
  try {
    const res = await fetch(`${api}/posts/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching single post from Express API:", error);
    return null;
  }
}


export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  
  const { title, categoryId, author, publishedAt, featuredImageUrl, content } = post;
  const imageUrl = featuredImageUrl

  return (
    <main>
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <p className="text-base font-semibold text-blue-600 uppercase">
              {categoryId?.name || 'Uncategorized'}
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h1>
            <p className="mt-4 text-md text-gray-500">
              Published on {new Date(publishedAt).toLocaleDateString()} {author && (`- by: ${author?.name}`)}
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-lg shadow-lg overflow-hidden mb-12">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
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