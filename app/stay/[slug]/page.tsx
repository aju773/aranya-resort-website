import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { rooms, stay } from '@/content/stay';
import { home } from '@/content/home';
import bedroom from '@/public/images/sitting-room.jpg';
export function generateStaticParams() { return rooms.map(room => ({ slug: room.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find(room => room.slug === slug);
  return { title: room ? `${room.name} | Stay at Aranya` : 'Room not found | Aranya', description: room?.description };
}
export default async function Room({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = rooms.find(room => room.slug === slug);
  if (!room) notFound();
  return <main id="main"><section className="section stay-intro"><Link className="text-link" href="/stay">← Compare rooms</Link><p className="eyebrow">Your stay at Aranya</p><h1>{room.name}</h1><p className="lede">{room.description}</p>
    <div className="room-detail-grid"><figure className="stay-photo"><Image src={bedroom} alt="Sitting room with a wooden daybed, armchair and tall windows" sizes="(max-width: 760px) 90vw, 52vw" preload placeholder="blur" /><figcaption>A quiet corner at Aranya, with light through tall windows.</figcaption></figure><div className="room-facts"><h2>At a glance</h2><dl><div><dt>Bed</dt><dd>{room.bed}</dd></div><div><dt>Room size</dt><dd>400 sq ft</dd></div><div><dt>View</dt><dd>{room.view}</dd></div><div><dt>Guests</dt><dd>{stay.capacity}</dd></div></dl></div></div>
    <div className="room-grid practical-details"><section><h2>Your private space</h2><ul>{stay.privateDetails.map(item => <li key={item}>{item}</li>)}</ul></section><section><h2>Shared at the homestay</h2><ul>{stay.sharedDetails.map(item => <li key={item}>{item}</li>)}</ul></section></div>
    <h2>Meals and inclusions</h2><p className="lede">{stay.meals}</p>    </section><section className="section location booking-section"><p className="eyebrow">Considering {room.name}?</p><h2>Make time for Wayanad.</h2><p>Gather your dates and preferences first. {home.bookingLine}</p><Link className="button" href={`/plan?room=${room.slug}`}>Plan a stay in {room.name} <span aria-hidden="true">↗</span></Link></section></main>;
}
