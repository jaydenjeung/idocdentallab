import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ig",
        destination: "/instagram",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
