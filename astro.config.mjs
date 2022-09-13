import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";

export default defineConfig({
  site: "https://langy.fr/",
  integrations: [tailwind()],
  vite: {
    ssr: {
      external: ["@11ty/eleventy-img", "svgo"],
    },
  },
});
