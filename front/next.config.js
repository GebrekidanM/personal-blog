/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      '127.0.0.1',
      'localhost',
      'images.unsplash.com',
      'res.cloudinary.com'
    ],
  },
   output: 'export',
};

module.exports = nextConfig;