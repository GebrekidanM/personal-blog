import BlogPostCard from './BlogPostCard';

// Dummy data - later this will come from your Strapi API
const dummyPosts = [
  {
    slug: 'strategic-analysis-of-banking',
    title: 'A Strategic Analysis of the Ethiopian Banking Industry',
    category: 'Strategic Insights',
    excerpt: 'Diving deep into the competitive landscape of Ethiopian banks using the powerful Porter\'s Five Forces framework.',
    imageUrl: '', // Placeholder
  },
  {
    slug: 'hidden-costs-of-bad-culture',
    title: 'Beyond the Balance Sheet: The Hidden Costs of a Bad Company Culture',
    category: 'Leadership & Culture',
    excerpt: 'A toxic culture doesn\'t just hurt morale; it directly impacts your bottom line. Here’s how to identify the warning signs.',
    imageUrl: '', // Placeholder
  },
  {
    slug: 'lessons-from-engineering',
    title: '3 Lessons Your Business Can Learn from Mechanical Engineering',
    category: 'Operational Excellence',
    excerpt: 'Applying the principles of systems thinking and process optimization to build a more resilient and efficient business.',
    imageUrl: '', // Placeholder
  },
];


const LatestBlogPosts = () => {
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
          {dummyPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
        
        {/* "View All" Button */}
        <div className="mt-12 text-center">
          <a
            href="/blog"
            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            View All Posts
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPosts;