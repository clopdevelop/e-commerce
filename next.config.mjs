/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'], // Esta línea es la antigua configuración
        // remotePatterns: ['https://res.cloudinary.com/*'], // Nueva configuración utilizando remotePatterns
      },
    };
export default nextConfig;
