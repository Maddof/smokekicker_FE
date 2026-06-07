/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "*.ngrok-free.dev",
    "*.ngrok.app",
    "http://192.168.0.*:3000",
    "http://192.168.0.*:5000",
    // "192.168.0.107", // Add your specific IP (when mobile device is used for testing)
  ],

  images: {
    // unoptimized: true,
    // Disable optimization for development to bypass private IP restrictions
    // unoptimized: process.env.NODE_ENV === "development",
    unoptimized:
      process.env.NEXT_PUBLIC_UNOPTIMIZED_IMAGES === "true",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      // Allow any 192.168.x.x IP for development
      {
        protocol: "http",
        hostname: "192.168.0.107",
        port: "5000",
        pathname: "/**",
      },
      // Production image hosting (no port needed for standard HTTPS)
      {
        protocol: "https",
        hostname: "api.smokekicker.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
