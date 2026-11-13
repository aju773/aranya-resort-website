import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { rooms, stay } from '@/content/stay';
import bedroom from '@/public/images/bedroom.jpg';
export const metadata: Metadata = { title: stay.title, description: stay.description };
export default function Stay() {
  return <main id="main">
    <section className="section stay-intro"><p className="eyebrow">Stay at Aranya</p><h1>{stay.heading}</h1><p className="lede">{stay.introduction}</p>
      <figure className="stay-photo"><Image src={bedroom} alt="A made-up king bed with bedside lamps in an Aranya bedroom" sizes="90vw" preload placeholder="blur" /><figcaption>An Aranya bedroom, made up and waiting.</figcaption></figure>
    </section>
    <section className="section room-section" aria-labelledby="compare"><p className="eyebrow">Find your room</p><h2 id="compare">Two ways to settle in.</h2><p className="room-source">{stay.roomsNote}</p>
      <div className="room-grid">{rooms.map(room => <article className="room-card" key={room.slug}><p className="eyebrow">Private room · 2 adults</p><h3>{room.name}</h3><p>{room.description}</p><dl><div><dt>Bed</dt><dd>{room.bed}</dd></div><div><dt>Size</dt><dd>400 sq ft</dd></div><div><dt>Outlook</dt><dd>{room.view}</dd></div><div><dt>Private</dt><dd>Attached bathroom and balcony</dd></div></dl><Link className="text-link" href={`/stay/${room.slug}`}>Explore {room.name} <span aria-hidden="true">↗</span></Link></article>)}</div>
          </section>
    <section className="section location"><h2>A shared home, a private retreat.</h2><Link className="button" href="/plan">Plan your stay ↗</Link><p>{stay.meals}</p><Link className="text-link" href="/#location">Find Aranya <span aria-hidden="true">↗</span></Link></section>
  </main>;
}
