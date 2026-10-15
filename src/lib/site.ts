import content from '../data/content.json';

/** True while running `npm run dev`. Placeholders for missing details only show in dev. */
export const isDev = import.meta.env.DEV;

/**
 * Builds a link to a page on this site, respecting the base path
 * (the site is served from /isa-website/ on GitHub Pages).
 * Pass paths like '/', '/events', '/join'.
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\/|\/$/g, '');
  if (!clean) return `${base}/`;
  return clean.includes('.') ? `${base}/${clean}` : `${base}/${clean}/`;
}

/** The current page's path without the base, e.g. '/events'. */
export function pagePath(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const rest = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return `/${rest.replace(/^\/|\/$/g, '')}`;
}

export const links = content.links;
export const mailto = `mailto:${content.links.email}`;

export const nav = [
  { href: '/events', label: 'Events' },
  { href: '/programs', label: 'Programs' },
  { href: '/photos', label: 'Photos' },
  { href: '/about', label: 'About' },
] as const;
