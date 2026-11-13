import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { places, distanceLabel, placesCopy } from '@/content/places';
import { experiences } from '@/content/experiences';
import { SectionReveals } from '@/components/section-reveals';
import table from '@/public/images/meal.jpg';
import kitchen from '@/public/images/banana-leaf-meal.jpg';
import pool from '@/public/images/hills-view.jpg';

export const metadata: Metadata = { title: experiences.title, description: experiences.description };

export default function Experiences() {
  return <main id="main">
    <section className="section experience-intro">
      <p className="eyebrow">{experiences.labels.eyebrow}</p>
      <h1>{experiences.heading}</h1>
      <p className="lede">{experiences.introduction}</p>
      <nav className="experience-index" aria-label="Explore experiences">
        <a className="text-link" href="#food">{experiences.labels.food}</a>
        <a className="text-link" href="#onsite">{experiences.labels.onsite}</a>
        <a className="text-link" href="#nearby">{experiences.labels.nearby}</a>
      </nav>
      <figure className="experience-cover"><Image src={table} alt="A vegetarian Kerala feast served on a banana leaf" sizes="90vw" preload placeholder="blur" /><figcaption>{experiences.labels.coverCaption}</figcaption></figure>
    </section>
    <SectionReveals>
      <section id="food" className="section experience-split" aria-labelledby="food-heading">
        <div><p className="eyebrow">{experiences.labels.foodEyebrow}</p><h2 id="food-heading" data-reveal>{experiences.food.heading}</h2><p>{experiences.food.description}</p><p>{experiences.food.practical}</p><p>{experiences.food.kitchen}</p>
        </div>
        <figure><Image src={kitchen} alt="Rice, curries and pappadam laid out on a banana leaf" sizes="(max-width: 760px) 90vw, 42vw" placeholder="blur" /><figcaption>{experiences.labels.kitchenCaption}</figcaption></figure>
      </section>
      <section id="onsite" className="section experience-home" aria-labelledby="onsite-heading">
        <p className="eyebrow">{experiences.labels.onsiteEyebrow}</p><h2 id="onsite-heading" data-reveal>{experiences.labels.onsiteHeading}</h2>
        <figure className="experience-cover"><Image src={pool} alt="Tea-covered hills disappearing into mist" sizes="90vw" placeholder="blur" /><figcaption>{experiences.labels.poolCaption}</figcaption></figure>
        <div className="room-grid">{experiences.onsite.map(item => <article key={item.heading}><h3>{item.heading}</h3><p>{item.description}</p></article>)}</div>
      </section>
      <section id="nearby" className="section experience-nearby" aria-labelledby="nearby-heading">
        <p className="eyebrow">{experiences.labels.nearbyEyebrow}</p><h2 id="nearby-heading" data-reveal>{experiences.labels.nearbyHeading}</h2>
        <p className="lede">{experiences.outings}</p>
        <ul className="place-grid">{places.map(place => <li className="place-card" key={place.name}><Image src={place.image} alt={place.alt} sizes="(max-width: 760px) 90vw, 30vw" placeholder="blur" /><h3>{place.name}</h3><p>{distanceLabel(place)}</p></li>)}</ul>
        <p className="experience-travel">{experiences.travelNote}</p>
        <p className="place-credit">{placesCopy.credit}</p>
      </section>
    </SectionReveals>
    <section className="section location"><h2>{experiences.labels.closing}</h2><Link className="button" href="/stay">{experiences.labels.rooms} <span aria-hidden="true">↗</span></Link></section>
  </main>;
}
