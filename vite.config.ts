import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Used by Cypress component tests only (`framework: "react"`, `bundler: "vite"`).
 * Stubs `next/image` and `next/link` so components can mount outside the Next.js runtime.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next/link": path.resolve(__dirname, "./cypress/support/next-stubs/Link.tsx"),
      "next/image": path.resolve(__dirname, "./cypress/support/next-stubs/Image.tsx"),
    },
  },
});
