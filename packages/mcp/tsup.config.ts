import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    "@modelcontextprotocol/client",
    "@modelcontextprotocol/server",
    "ai",
    "@ai-sdk/groq",
    "zod",
  ],
});
