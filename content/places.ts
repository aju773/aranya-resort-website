import type { StaticImageData } from 'next/image';
import soochipara_falls from '@/public/images/places/soochipara-falls.jpg';
import kanthanpara_waterfalls from '@/public/images/places/kanthanpara-waterfalls.jpg';
import neelimala_viewpoint from '@/public/images/places/neelimala-viewpoint.jpg';
import chembra_peak from '@/public/images/places/chembra-peak.jpg';
import karapuzha_dam from '@/public/images/places/karapuzha-dam.jpg';
import heritage_museum from '@/public/images/places/heritage-museum.jpg';
import edakkal_caves from '@/public/images/places/edakkal-caves.jpg';
import thusharagiri_falls from '@/public/images/places/thusharagiri-falls.jpg';
import pookode_lake from '@/public/images/places/pookode-lake.jpg';
import lakkidi_viewpoint from '@/public/images/places/lakkidi-viewpoint.jpg';
import jain_temple from '@/public/images/places/jain-temple.jpg';
import karalad_lake from '@/public/images/places/karalad-lake.jpg';

export type Place = { name: string; km: number; image: StaticImageData; alt: string };

const all: Place[] = [
  { name: 'Soochipara Falls', km: 1.8, image: soochipara_falls, alt: 'Soochipara Falls tumbling down a rock face in the forest' },
  { name: 'Kanthanpara Waterfalls', km: 1.9, image: kanthanpara_waterfalls, alt: 'Water cascading over rocks at Kanthanpara Waterfalls' },
  { name: 'Neelimala Viewpoint', km: 6.8, image: neelimala_viewpoint, alt: 'Misty tea-covered hills in Wayanad' },
  { name: 'Chembra Peak', km: 9, image: chembra_peak, alt: 'Chembra Peak rising over the Wayanad hills' },
  { name: 'Karapuzha Dam', km: 10.2, image: karapuzha_dam, alt: 'Karapuzha Dam and its reservoir in Wayanad' },
  { name: 'Heritage Museum', km: 11.2, image: heritage_museum, alt: 'Old artefacts displayed at the Wayanad Heritage Museum' },
  { name: 'Edakkal Caves', km: 13.2, image: edakkal_caves, alt: 'Ancient rock engravings inside Edakkal Caves' },
  { name: 'Thusharagiri Falls', km: 14, image: thusharagiri_falls, alt: 'Thusharagiri Falls flowing through green forest' },
  { name: 'Pookode Lake', km: 15.7, image: pookode_lake, alt: 'Calm water and green banks at Pookode Lake' },
  { name: 'Lakkidi Viewpoint', km: 16.6, image: lakkidi_viewpoint, alt: 'Green mountain slopes seen from Lakkidi Viewpoint' },
  { name: 'Ancient Jain Temple', km: 17.3, image: jain_temple, alt: 'Front of the ancient Jain Temple at Sulthan Bathery' },
  { name: 'Karalad Lake', km: 35, image: karalad_lake, alt: 'Karalad Lake with hills beyond' },
];

export const places: Place[] = [...all].sort((a, b) => a.km - b.km);
export const closestPlaces = places.slice(0, 4);
export const distanceLabel = (place: Place) => `~${place.km} km from Aranya`;
export const placesCopy = {
  seeAll: `See all ${places.length} places`,
  homeLabel: 'Beyond Aranya',
  homeHeading: 'Waterfalls, peaks and lakes close by.',
  credit: 'Photos: Wikimedia Commons contributors. Full credits in docs/photo-credits.md.',
};
