// app/(site)/contact/page.jsx
'use client'; // This directive is needed because we are using hooks (useState)

import { useState } from 'react';
import { FiMail, FiLinkedin } from 'react-icons/fi'; // Icons for contact info

// --- The Main Exported Page Component ---
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(''); // To show feedback (e.g., "Sending...", "Success!")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the entire form data state
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      setStatus(error.message);
    }
  };


  return (
    <main>
      <div className="bg-gray-50 text-center py-16 sm:py-20">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Get in Touch</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Have a project in mind or just want to discuss an idea? I'd love to hear from you.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
            <p className="text-gray-600">
              Fill out the form, or reach out to me directly through one of the channels below. I'll get back to you as soon as possible.
            </p>
            <div className="flex items-center space-x-3">
              <FiMail className="h-6 w-6 text-blue-600" />
              <a href="mailto:atrsaw.name@email.com" className="text-lg text-gray-700 hover:text-blue-600">
                atrsawade@email.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <FiLinkedin className="h-6 w-6 text-blue-600" />
              <a href="https://linkedin.com/in/atrsaw-aderajew" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-700 hover:text-blue-600">
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea name="message" id="message" rows="4" required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                Send Message
              </button>
            </div>
            {status && <p className="text-center text-gray-600">{status}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}