# Ryan Paul's Portfolio & Blog

A modern, minimalist portfolio and blog built with Astro, featuring a custom theme system and integrated project showcases.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/ryanpauldev/minimal_portfolio.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📋 Features

- ✅ Built with Astro 4.0
- ✅ TypeScript support
- ✅ Tailwind CSS styling
- ✅ Dark/Light theme
- ✅ MDX blog support
- ✅ Project showcase
- ✅ SEO optimization
- ✅ RSS feed
- ✅ Automatic sitemap
- ✅ 100/100 Lighthouse score
- ✅ Responsive design

## 🛠️ Technologies

- **Framework**: Astro 4.0
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Content**: MDX
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics
- **Icons**: Heroicons

## 📁 Project Structure

```
minimal_portfolio/
├── src/
│   ├── components/
│   ├── content/
│   │   ├── blog/
│   │   └── projects/
│   ├── layouts/
│   └── pages/
├── public/
└── astro.config.mjs
```

## 💻 Development Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Install dependencies                             |
| `npm run dev`             | Start dev server at `localhost:4321`             |
| `npm run build`           | Build production site to `./dist/`               |
| `npm run preview`         | Preview production build locally                 |
| `npm run astro ...`       | Run CLI commands                                 |
| `npm run lint`            | Run ESLint                                       |

## 🔧 Configuration

### Environment Variables

```bash
# .env
PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
PUBLIC_SITE_URL=your_site_url
```

### Content Management

- Blog posts go in `src/content/blog/`
- Projects go in `src/content/projects/`
- Images go in `public/images/`

## 📝 Adding Content

### Blog Posts

```markdown
---
title: "Your Blog Title"
description: "Blog description"
date: "Feb 25 2024"
draft: false
---

Your content here...
```

### Projects

```markdown
---
title: "Project Title"
description: "Project description"
date: "Feb 25 2025"
demoURL: "https://demo.com"
repoURL: "https://github.com/username/repo"
---

Project content...
```

## 🚀 Deployment

1. Fork this repository
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Deploy!

## 📱 Progressive Web App

This portfolio is PWA-ready. To enable:

1. Update `manifest.json`
2. Add your icons
3. Configure service worker

## 🔍 SEO & Social Media Preview

- Update `astro.config.mjs` with your site details
- Customize `src/components/Head.astro`
- Add meta descriptions to content

### OpenGraph Image

![Portfolio Preview](/public/og-image-02.png)

The default OpenGraph image (1200x630px) provides social media preview for:
- LinkedIn shares
- Twitter cards
- Discord embeds
- Facebook previews

To customize:
```bash
# Replace the default OG image
1. Add your image to /public/
2. Update Head.astro meta tags:

<meta property="og:image" content="https://www.ryanpaul.dev/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

## 📈 Analytics

Vercel Analytics is pre-configured. To use:

1. Enable in Vercel dashboard
2. Add tracking ID to `.env`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT

## 🙏 Acknowledgments

- Astro team for the framework
- Tailwind for the styling system
- Vercel for hosting