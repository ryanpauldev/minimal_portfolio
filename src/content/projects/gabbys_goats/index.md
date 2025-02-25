---
title: "Gabby's GOATS (Giving Others Assistance to Serve)"
description: "Fundraising platform for a charitable organization"
date: "Feb 1 2025"
demoURL: "https://gabbys-goats.vercel.app/"
repoURL: "https://github.com/ryanpauldev/gabbys_goats"
---

## Overview

Gabby's GOATS is a heartfelt foundation dedicated to honoring the legacy of Gabrielle Kraft Buckman by supporting those who selflessly serve others. The platform enables donations, shares Gabby's inspiring story, and connects with the community through various features.

<a href="https://gabbys-goats.vercel.app/" target="_blank">
  <img src="/gabbys-goats.png" alt="Gabby's GOATS (Giving Others Assistance To Serve)" />
</a>

### Tech Stack

- Next.js 14 (React Framework)
- TypeScript
- Tailwind CSS
- Clover Payment SDK
- Particles.js
- AOS (Animate On Scroll)
- HTTPS Local Development

## Implementation Steps

### 1. Project Setup

```bash
# Initialize Next.js project with TypeScript
npx create-next-app@latest gabbys_goats --typescript --tailwind
cd gabbys_goats

# Install additional dependencies
npm install @headlessui/react aos @tsparticles/react @tsparticles/slim
```

### 2. Core Features

#### Responsive Navigation
- Custom header component with mobile menu
- Smooth scrolling navigation
- Dynamic active state handling

#### Image Optimization
```typescript
// Implement image optimization script
const sharp = require('sharp');

// Process images for optimal loading
await sharp(inputPath)
  .webp({ quality: 85 })
  .resize({
    width: 900,
    height: 757,
    fit: 'inside',
    withoutEnlargement: true
  })
  .toFile(webpOutput);
```

#### Animated Sections
- AOS integration for scroll animations
- Custom transition effects
- Lazy loading components

### 3. Advanced Features

#### Background Particles
```typescript
// Implement interactive background
const BackgroundParticles = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        // Particle configuration
      }}
    />
  );
};
```

#### YouTube Video Optimization
```typescript
// Create lightweight facade component
const YouTubeFacade = ({ videoId, title }: YouTubeFacadeProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // Implement click-to-load functionality
};
```

#### HTTPS Development Environment
```javascript
// Configure local HTTPS server
const httpsOptions = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
};

createServer(httpsOptions, (req, res) => {
  // Server configuration
});
```

### 4. Performance Optimization

- Implemented lazy loading for images and components
- Optimized fonts with proper preloading
- Configured metadata for SEO
- Added responsive image sizing
- Implemented WebP image format

### 5. Payment Integration

- Integrated Clover Payment SDK
- Implemented secure payment processing
- Added custom amount input validation
- Created success/error handling states

### 6. Deployment

- Configured Vercel deployment
- Set up environment variables
- Implemented proper build optimization
- Added custom domain configuration

## Project Structure

```
gabbys_goats/
├── app/
│   ├── (default)/
│   ├── api/
│   └── layout.tsx
├── components/
│   ├── ui/
│   └── [feature components]
├── public/
│   └── images/
└── scripts/
    └── optimize-images.js
```

## Key Learnings

1. Performance optimization techniques
2. Secure payment processing implementation
3. Advanced animation integration
4. Responsive design patterns
5. Image optimization strategies
6. SEO best practices

## Future Enhancements

- Newsletter integration
- Admin dashboard
- Donation tracking
- Event management
- Volunteer coordination

The project successfully combines modern web technologies with optimized performance to create an engaging and functional charitable platform.
