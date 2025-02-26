import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';
import compress from "astro-compress";

export default defineConfig({
  site: 'https://www.ryanpaul.dev',
  integrations: [
    mdx(), 
    sitemap({
      filter: (page) => !page.includes('/drafts/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }), 
    tailwind(), 
    react(),
    compress({
      css: true,
      html: true,
      img: true,
      js: true,
      svg: true,
    })
  ],
  vite: {
    server: {
      hmr: {
        clientPort: 443
      },
      // Allow localtunnel and other hosts
      allowedHosts: [
        'localhost',
        '*.loca.lt'
      ]
    }
  }
});
