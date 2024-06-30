import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
// import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), db()],
  output: "server",
  adapter: vercel(),
  vite: {
    optimizeDeps: {
      exclude: ["oslo"]
    }
  }
});