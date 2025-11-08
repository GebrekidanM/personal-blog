'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero`)
      .then(res => res.json())
      .then(data => setHero(data))
      .catch(err => console.error('Error fetching hero section:', err));
  }, []);

  if (!hero) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500 text-lg animate-pulse">
        empty hero section...
      </div>
    );
  }

  const [mainTitle, highlightTitle] = hero?.title?.split(',') || [];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-gray-100 overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent blur-3xl opacity-50"></div>

      <div className="relative container mx-auto px-6 lg:px-8 py-20 lg:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text */}
        <div className="text-center md:text-left space-y-6 z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            {mainTitle}
            {highlightTitle && (
              <span className="block text-blue-600">{highlightTitle}</span>
            )}
          </h1>

          {hero?.subtitle && (
            <p className="text-xl font-medium text-blue-500 mt-2">
              <TypeAnimation
                sequence={[
                  hero.subtitle,
                  2000,
                  ...(hero.altSubtitles?.length
                    ? hero.altSubtitles.flatMap(s => [s, 2000])
                    : []),
                ]}
                speed={5}
                repeat={Infinity}
                wrapper="span"
                className="text-blue-500"
              />
            </p>
          )}

          {hero.description && (
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0">
              {hero.description}
            </p>
          )}

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            {hero.primaryButtonLink && (
              <Link
                href={hero.primaryButtonLink}
                className="inline-block bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 transition-transform transform hover:scale-105"

              >
                {hero.primaryButtonText || 'Get Started'}
              </Link>
            )}
            {hero.secondaryButtonLink && (
              <Link
                href={hero.secondaryButtonLink}
                className="bg-white border border-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1"
              >
                {hero.secondaryButtonText || 'Learn More'}
              </Link>
            )}
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex justify-center relative">
          {hero.image ? (
            <div className="relative group">
              <div className="absolute -inset-4 bg-blue-200 rounded-3xl blur-3xl opacity-40 group-hover:opacity-70 transition duration-500"></div>
              <Image
                className="relative rounded-3xl shadow-2xl w-full max-w-sm object-cover transform transition duration-500 group-hover:scale-105"
                src={hero.image}
                alt={hero.title}
                width={420}
                height={420}
                priority
              />
            </div>
          ) : (
            <div className="w-64 h-64 bg-gray-200 rounded-3xl flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
