import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["@heroitvn/shacnui", "@heroitvn/supabase"],
};

export default nextConfig;
