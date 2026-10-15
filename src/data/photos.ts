// Every photo on the site lives in src/assets/photos and is listed here once.
// To swap a photo: drop the new .jpg into src/assets/photos, then change the
// file name below (or the `id` a page uses). See README.md › Photos.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });

function file(id: string): ImageMetadata {
  const match = files[`../assets/photos/${id}.jpg`];
  if (!match) throw new Error(`Photo "${id}.jpg" not found in src/assets/photos`);
  return match.default;
}

export interface Photo {
  id: string;
  src: ImageMetadata;
  alt: string;
  /** Shown under the photo on /photos. Leave null to show nothing. */
  caption: string | null;
}

// Gallery order on /photos. Other pages pick photos by id with `photo()`.
const list: Array<Omit<Photo, 'src'>> = [
  { id: 'IMG_4335', alt: 'ISA members gathered around a campfire at night', caption: null },
  { id: 'adc8466d', alt: 'ISA members smiling together indoors', caption: null },
  { id: '4db790e4', alt: 'ISA members together outdoors on a fall day', caption: null },
  { id: 'IMG_2628', alt: 'ISA members on an evening walk under the trees', caption: null },
  { id: '3f3fdbc7', alt: 'ISA members on the porch of a farm during a fall outing', caption: null },
  { id: 'DSCF2344', alt: 'A large group of ISA members posing together at an event', caption: null },
  { id: 'DSCF2397', alt: 'ISA members gathered on an outdoor terrace at dusk', caption: null },
  { id: 'DSCF2331', alt: 'Two ISA members sharing a meal', caption: null },
  { id: 'P1090361', alt: 'ISA members at dinner after a Thursday program', caption: null },
  { id: 'P1090378', alt: 'An ISA member at a program night', caption: null },
  { id: '8b4e641d', alt: 'ISA members at a farm on a fall outing', caption: null },
  { id: 'IMG_7767', alt: 'ISA members on a hike in the woods', caption: null },
  { id: 'IMG_7514', alt: 'Hand-painted bookmarks from an ISA craft night', caption: null },
  { id: 'IMG_9246', alt: 'Two ISA members walking through a field at sunset', caption: null },
  { id: '62c62466', alt: 'ISA members painting at a craft night', caption: null },
  { id: 'ba459ede', alt: 'ISA members by a river on an autumn walk', caption: null },
  { id: '100_2894', alt: 'A speaker addressing ISA members in a lecture room', caption: null },
  { id: 'IMG_2637', alt: 'Two ISA members taking a selfie outdoors', caption: null },
  { id: 'IMG_2641', alt: 'ISA members walking through tall grass at dusk', caption: null },
];

export const gallery: Photo[] = list.map((p) => ({ ...p, src: file(p.id) }));

export function photo(id: string): Photo {
  const found = gallery.find((p) => p.id === id);
  if (!found) throw new Error(`Photo "${id}" is not listed in src/data/photos.ts`);
  return found;
}
