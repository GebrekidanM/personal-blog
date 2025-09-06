import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Strategy, 
              <span className="block text-blue-600">Simplified.</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
              Driving sustainable growth for businesses through the synergy of strategic planning, operational excellence, and human-centered leadership.
            </p>
            
            {/* Call-to-Action Buttons */}
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <Link href="/blog" className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                  Read My Insights
              </Link>
              <Link href="/about" className="inline-block bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-transform transform hover:scale-105">
                  About Me
            </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center">
            {/* Replace this with Next.js <Image /> component once you have the final image */}
            <img 
              className="rounded-lg shadow-2xl w-full max-w-sm" 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop" // Replace with Atrsaw's photo
              alt="Atrsaw Aderajew - Business Consultant" 
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;