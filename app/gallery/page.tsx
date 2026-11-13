import type { Metadata } from 'next';
import { Gallery } from '@/components/gallery';
import { gallery, galleryGroups } from '@/content/gallery';
export const metadata: Metadata = { title: gallery.title, description: gallery.description };
export default function GalleryPage() {
  return <main id="main" className="section gallery-page">
    <p className="eyebrow">Aranya in photographs</p><h1>{gallery.heading}</h1>
    <p className="lede">{gallery.introduction}</p><p>{gallery.hint}</p>
    <nav className="experience-index" aria-label="Photo subjects">{galleryGroups.map(group => <a className="text-link" key={group.id} href={`#${group.id}`}>{group.title}</a>)}</nav>
    <Gallery />
  </main>;
}
