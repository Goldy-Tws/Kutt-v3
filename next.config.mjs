/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Prevents duplicate GSAP trigger registrations in dev
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
