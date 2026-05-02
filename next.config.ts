import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: [
    "@heroitvn/google",
    "@heroitvn/shacnui",
    "@heroitvn/supabase",
    "@heroitvn/utils",
  ],
};

export default nextConfig;
