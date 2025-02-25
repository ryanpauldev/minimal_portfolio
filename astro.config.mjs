import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.ryanpaul.dev',
  integrations: [mdx(), sitemap(), tailwind(), react()],
  vite: {
    server: {
      hmr: {
        clientPort: 443
      },
      // Allow localtunnel and other hosts
      allowedHosts: [
        'localhost',
        '*.loca.lt',
        'tricky-ducks-notice.loca.lt'
      ]
    }
  }
});
