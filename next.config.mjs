/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    experimental: {
      serverActions: {
        allowedOrigins: ["localhost:3000"],
        // Asegúrate de tener la versión next@v14.0.2-canary.4 o superior
        // Puedes necesitar usar la propiedad allowedForwardedHosts dependiendo de tu versión exacta
        allowedForwardedHosts: ["rwn8jxt0-3000.uks1.devtunnels.ms"],
      }
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/catalogo',
          permanent: true,
        },
      ]
    },
    async rewrites() {
      return [
        {
          source: '/pago/stripe',
          destination: 'https://example.com/blog',
        },
        {
          source: '/pago/stripe/:slug',
          destination: 'https://example.com/blog/:slug', // Matched parameters can be used in the destination
        },
      ]
    },
    trustProxy: ['rwn8jxt0-3000.uks1.devtunnels.ms', 'https'],
    images: {
        // domains: ['res.cloudinary.com'], // Esta línea es la antigua configuración
        // remotePatterns: ['https://res.cloudinary.com/*'], // Nueva configuración utilizando 
        remotePatterns: [
          {
            // cambiar a https cuando cambie la imagen que acabo de subir
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            // port: '',
            // pathname: '/account123/**',
          },
        ],
      },
    //   Configuración para ignorar la verificación de tipos de typeScript en la build
    typescript: {
    //   !! WARN !!
    //   Dangerously allow production builds to successfully complete even if
    //   your project has type errors.
    //   !! WARN !!
      ignoreBuildErrors: true,
    },
};
export default nextConfig;
