'use client';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '../../../components/PageHeader';
import { useEffect, useState } from 'react';
import {api} from '../../../lib/api';

// --- Component 1: StorySection ---
const StorySection = ({aboutData}) => (
  <div className="bg-white py-16 sm:py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-1 flex justify-center">
          <Image
            className="rounded-lg shadow-xl h-64 w-64 object-cover"
            src={aboutData?.image}
            alt="Atrsaw Aderajew"
            width={256}
            height={256}
          />
        </div>
        <div className="md:col-span-2 text-lg text-gray-700 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {aboutData?.title}
          </h2>
          <p>
            {aboutData?.description}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// --- Component 3: PhilosophySection ---
const PhilosophySection = () => (
  // ... (This component is correct, no changes needed) ...
  <div className="bg-gray-50 py-16 sm:py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
      <h2 className="text-3xl font-bold text-gray-900">My Consulting Philosophy</h2>
      <div className="mt-8 space-y-8 md:flex md:space-y-0 md:space-x-8">
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold text-blue-600">My Mission</h3>
          <p className="mt-2 text-lg text-gray-700">
            To drive sustainable growth for businesses through the synergy of strategic planning, operational excellence, and human-centered leadership.
          </p>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold text-blue-600">My Vision</h3>
          <p className="mt-2 text-lg text-gray-700">
            To create a business world where companies operate with the efficiency of a well-engineered machine and the heart of a thriving community.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// --- Component 4: ContactCTA ---
const ContactCTA = () => (
  <div className="bg-gray-800 text-center py-16 sm:py-20">
    <h2 className="text-3xl font-extrabold text-white">Ready to Build a Better Business?</h2>
    <p className="mt-4 text-lg text-gray-200">
      Let us discuss how we can work together to achieve your goals.
    </p>
    <div className="mt-8">
      <Link
        href="/contact"
        className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
      >
        Get in Touch
      </Link>
    </div>
  </div>
);

// --- The Main About Page Component ---
// NOTE: It is NO LONGER wrapped in <SiteLayout>
export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);

  console.log(aboutData)
  useEffect(() => {
    fetch(`${api}/about`)
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error('Error fetching About data:', err));
  }, []);
  return (
    <main>
      <PageHeader />
      <StorySection aboutData={aboutData}/>
      <PhilosophySection />
      <ContactCTA />
    </main>
  );
}