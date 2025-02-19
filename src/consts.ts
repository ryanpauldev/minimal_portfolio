import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Ryan Paul",
  EMAIL: "ryan.r.paul22@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "This is my portfolio. See my work experience, my recent projects, and my blog",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/ryan-paul-dev/",
    ICON: "/icons/linkedin.svg", // Path to downloaded LinkedIn SVG
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/ryanpauldev",
    ICON: "/icons/github.svg", // Path to downloaded GitHub SVG
  },
  {
    NAME: "Email",
    HREF: "mailto:ryan.r.paul22@gmail.com",
    ICON: "/icons/email.svg", // Path to downloaded Email SVG
  },
];