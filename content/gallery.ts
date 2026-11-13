import garden from '@/public/images/house.jpg';
import view from '@/public/images/hills-view.jpg';
import pool from '@/public/images/pool.jpg';
import bedroom from '@/public/images/bedroom.jpg';
import seating from '@/public/images/sitting-room.jpg';
import porch from '@/public/images/veranda.jpg';
import dining from '@/public/images/dining.jpg';
import antiques from '@/public/images/courtyard.jpg';

export const gallery = {
  title: 'Gallery | Aranya Homestay, Wayanad',
  description: 'Explore photographs of Aranya: the house, hill views, bedrooms and shared spaces. Open any photograph for a closer look.',
  heading: 'A closer look.',
  introduction: 'The house, the rooms, and the hills beyond. A small selection of photographs from Aranya.',
  hint: 'Open a photograph to explore. Use the arrows or swipe left and right in the viewer.',
  close: 'Close viewer', previous: 'Previous photo', next: 'Next photo',
  unavailable: 'Photograph unavailable. Try another photo or open the original.',
};
export const galleryGroups = [
  { id: 'house-and-hills', title: 'House & hills', photos: [
    { image: garden, alt: 'Two-storey Aranya house with a red-tiled roof among coconut palms' },
    { image: view, alt: 'Tea-covered hills disappearing into mist' },
    { image: pool, alt: 'Curving pool beside the house, shaded by coconut palms' },
  ] },
  { id: 'bedrooms', title: 'Inside the rooms', photos: [
    { image: bedroom, alt: 'Bedroom with a made-up king bed and bedside lamps' },
    { image: seating, alt: 'Sitting room with a wooden daybed, armchair and tall windows' },
  ] },
  { id: 'shared-spaces', title: 'Spaces to gather', photos: [
    { image: porch, alt: 'Red-pillared veranda with chairs under a tiled roof' },
    { image: dining, alt: 'Bright living and dining room with a wooden table' },
    { image: antiques, alt: 'Tiled-roof wing of the house around a sandy courtyard' },
  ] },
];
export const galleryPhotos = galleryGroups.flatMap(group => group.photos);
export type GalleryPhoto = (typeof galleryPhotos)[number];
