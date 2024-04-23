/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['res.cloudinary.com'], // Esta línea es la antigua configuración
        // remotePatterns: ['https://res.cloudinary.com/*'], // Nueva configuración utilizando 
        remotePatterns: [
          {
            // cambiar a https cuando cambie la imagen que acabo de subir
            protocol: 'http',
            hostname: 'res.cloudinary.com',
            // port: '',
            // pathname: '/account123/**',
          },
        ],
      },
    };
export default nextConfig;
