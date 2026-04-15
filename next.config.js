/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

const withNextIntl = require('next-intl/plugin')(
  './src/i18n/request.ts'
);

module.exports = withNextIntl(nextConfig);
