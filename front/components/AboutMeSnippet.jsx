// components/AboutMeSnippet.js

import Link from 'next/link';
import Image from 'next/image';

const AboutMeSnippet = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Column: Image */}
          {/* Note: We place the image first in the code, but use 'md:order-last' on the text column to visually swap them on desktop */}
          <div className="flex justify-center">
            {/* Using Next.js Image component */}
            <Image
              className="rounded-full shadow-2xl h-64 w-64 sm:h-80 sm:w-80 object-cover"
              src="/placeholder-about.jpg" // Replace with Atrsaw's photo (e.g., in /public folder)
              alt="Atrsaw Aderajew"
              width={320}
              height={320}
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="text-center md:text-left md:order-first">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              A Bit About Me
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              I'm Atrsaw—a mechanical engineer turned MBA strategist. I believe the best businesses are built like a well-engineered machine and run with the heart of a thriving community.
            </p>
            <p className="mt-3 text-lg text-gray-600">
              My mission is to help you bridge the gap between your operational processes and your strategic vision, all while building a culture that empowers your people to do their best work.
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-block bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 transition-transform transform hover:scale-105"
              >
                My Full Story
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutMeSnippet;