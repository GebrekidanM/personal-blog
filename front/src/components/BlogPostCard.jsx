import Link from 'next/link';
import Image from 'next/image';

const BlogPostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/blog/${post.slug}`}>
          {/* Featured Image */}
          <div className="relative h-48 w-full">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill // The new prop to make the image fill the parent container
              className="object-cover" // Standard Tailwind CSS class
            />
          </div>

          <div className="p-6">
            {/* Category */}
            <p className="text-sm font-semibold text-blue-600 uppercase">
              {post.category}
            </p>

            {/* Title */}
            <h3 className="mt-2 text-xl font-bold text-gray-900">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="mt-3 text-base text-gray-600">
              {post.excerpt}
            </p>

            {/* Read More Link */}
            <div className="mt-4 font-semibold text-blue-600 hover:text-blue-800">
              Read More &rarr;
            </div>
          </div>
      </Link>
    </div>
  );
};

export default BlogPostCard;