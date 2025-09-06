/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: [
      'http://172.19.18.177:3000', // Replace with the actual IP and port you use
      'http://localhost:3000',     // Optional: add localhost too
      'http://127.0.0.1:3000'      // Optional: add 127.0.0.1 too
    ],
    images: {
        qualities: [90, 95], // Add the qualities you're using in <Image quality={...}>
      },
  }
  
  module.exports = nextConfig
  