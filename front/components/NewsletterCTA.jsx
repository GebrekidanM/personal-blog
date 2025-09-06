'use client'
import { useState } from 'react';

const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setMessage('Subscribing...');

    try {
      const response = await fetch('http://localhost:4000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setMessage('Thank you for subscribing!'); 
      setEmail('');

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Get Smarter About Business
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Join my newsletter for actionable insights on strategy, operations, and leadership delivered straight to your inbox. No spam, ever.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-8 sm:flex sm:justify-center">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Subscribe
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-gray-300">{message}</p>}

        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;