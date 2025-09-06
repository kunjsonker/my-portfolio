/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: [
      'http://172.19.18.177:3000', // Replace with the actual IP and port you use
      'http://localhost:3000',     // Optional: add localhost too
      'http://127.0.0.1:3000'      // Optional: add 127.0.0.1 too
    ]
  }
  
  module.exports = nextConfig
  