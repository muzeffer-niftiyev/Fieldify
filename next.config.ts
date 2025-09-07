import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      new URL(
        "https://idiiflhtshpclcowwrvw.supabase.co/storage/v1/object/public/field-images/**"
      ),
    ],
  },
};

export default nextConfig;
