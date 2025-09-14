import Image from 'next/image';
import Link from 'next/link';


// --- Component 1: PageHeader ---
const PageHeader = () => (
  <div className="bg-gray-800 text-center py-16 sm:py-20">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-white">My Story</h1>
    <p className="mt-4 text-lg text-gray-300">
      From Engineering Systems to Empowering People
    </p>
  </div>
);

// --- Component 2: StorySection ---
const StorySection = () => (
  <div className="bg-white py-16 sm:py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-1 flex justify-center">
          <Image
            className="rounded-lg shadow-xl h-64 w-64 object-cover"
            src="/next.svg" // Remember to replace this with Atrsaw's actual photo
            alt="Atrsaw Aderajew"
            width={256}
            height={256}
          />
        </div>
        <div className="md:col-span-2 text-lg text-gray-700 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            The Journey of a Problem Solver
          </h2>
          <p>
            My journey began not in a boardroom, but in the world of mechanics and systems. As a <b>Mechanical Engineer</b>, I was trained to see the world as an intricate set of interconnected parts. I learned to diagnose complex problems, understand how one small inefficiency could impact an entire system, and design solutions that were both elegant and effective.
          </p>
          <p>
            But I soon realized that the most complex and fascinating systems are not made of gears and circuits; they are made of people. I wanted to understand the why behind the what—the business strategy that drives the operational decisions. This curiosity led me to pursue my <b>MBA</b>.
          </p>
          <p>
            {/* --- THIS IS THE FIX for the ESLint error --- */}
            Through my community leadership as a Deacon and my deep interest in psychology, I have come to believe that a business&apos;s greatest asset and most common point of failure is its people. This led me to write my book, Beyond the Shadow, exploring the intersection of spiritual well-being and psychological resilience.
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
  <div className="bg-blue-600 text-center py-16 sm:py-20">
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
  return (
    <main>
      <PageHeader />
      <StorySection />
      <PhilosophySection />
      <ContactCTA />
    </main>
  );
}