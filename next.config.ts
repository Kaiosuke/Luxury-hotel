import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "aguasdeibiza.com",
      "images.unsplash.com",
      "res.cloudinary.com",
      "d321ocj5nbe62c.cloudfront.net",
      "i.ytimg.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
