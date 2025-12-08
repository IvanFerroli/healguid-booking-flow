/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "softr-tables-eu-prod-bucket02.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "softr-tables-eu-prod-bucket01.s3.eu-central-1.amazonaws.com",
      }
    ],
  },
};

export default nextConfig;
