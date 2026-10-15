// @ts-check
import { defineConfig } from 'astro/config';

// Where the site is served from.
// GitHub Pages (current):  SITE = 'https://mahdirizk2.github.io', BASE = '/isa-website'
// Custom domain (later):   SITE = 'https://isahlulbayt.com',      BASE = '/'
// See docs/DECISIONS.md (D-012) and README.md › Deploying.
const SITE = 'https://mahdirizk2.github.io';
const BASE = '/isa-website';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'ignore',
  // Keep single spaces between inline elements (Astro 7 defaults to 'jsx', which drops them).
  compressHTML: true,
  build: {
    format: 'directory',
    // The CSS is small; inlining it avoids a render-blocking request.
    inlineStylesheets: 'always',
  },
});
