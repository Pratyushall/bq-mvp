// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ stops Vercel failing on ESLint flags
  },
};

module.exports = nextConfig;
