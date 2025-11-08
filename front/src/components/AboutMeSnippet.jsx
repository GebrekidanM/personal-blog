'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const AboutMeSnippet = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`)
      .then(res => res.json())
      .then(data => setAbout(data))
      .catch(err => console.error(err));
  }, []);

  if (!about) return <div className="text-center py-10">Loading...</div>;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="flex justify-center">
          <Image
            className="rounded-full shadow-2xl h-64 w-64 sm:h-80 sm:w-80 object-cover"
            src={about.image || '/placeholder-about.jpg'}
            alt={about.name || 'Atrsaw Aderajew'}
            width={320}
            height={320}
          />
        </div>

        <div className="text-center md:text-left md:order-first">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {about.name}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{about.title}</p>
          <p className="mt-3 text-lg text-gray-600">{about.description}</p>
          <div className="mt-8">
            <a
              href="/about"
              className="inline-block bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 transition-transform transform hover:scale-105"
            >
              My Full Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSnippet;
