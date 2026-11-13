import Link from 'next/link';
import Image from 'next/image';
import { Hero } from '@/components/hero';
import { SectionReveals } from '@/components/section-reveals';
import { Testimonials } from '@/components/testimonials';
import { home, homeDiscovery as copy, homeReviews, rating, reviewsLink } from '@/content/home';
import { closestPlaces, distanceLabel, placesCopy } from '@/content/places';
import { rooms } from '@/content/stay';
import { galleryGroups } from '@/content/gallery';
import yard from '@/public/images/house.jpg';
import bedroom from '@/public/images/bedroom.jpg';
import dining from '@/public/images/meal.jpg';

export default function Home() {
  return <main id="main">
    <Hero />
    <SectionReveals>
      <section className="introduction section" id="introduction" aria-labelledby="welcome-heading">
        <div className="intro-copy">
          <p className="eyebrow">{home.welcomeLabel}</p>
          <h2 id="welcome-heading" data-reveal>{home.welcome}</h2>
          <p>{home.introduction}</p><p>{home.details}</p>
          <Link className="text-link" href="/location">{home.directions} <span aria-hidden="true">↗</span></Link>
          <p className="concept-note">{home.conceptNote}</p>
        </div>
        <figure className="intro-photo"><Image src={yard} alt={home.houseAlt} sizes="(max-width: 760px) 100vw, 46vw" placeholder="blur" /><figcaption>{home.photoCaption}</figcaption></figure>
      </section>
      <section className="section home-rooms" aria-labelledby="rooms-heading">
        <p className="eyebrow">{copy.roomsLabel}</p><h2 id="rooms-heading" data-reveal>{copy.roomsHeading}</h2>
        <p className="lede">{copy.roomsIntro}</p>
        <div className="home-room-layout">
          <figure className="home-room-photo" data-wipe><Image src={bedroom} alt="A made-up king bed with bedside lamps in an Aranya bedroom" sizes="(max-width: 760px) 100vw, 50vw" placeholder="blur" /><figcaption>{copy.roomsNote}</figcaption></figure>
          <div data-stagger>{rooms.map(room => <article className="room-card" key={room.slug}><p className="eyebrow">{room.bed}</p><h3>{room.name}</h3><p>{room.description}</p><Link className="text-link" href={`/stay/${room.slug}`}>{copy.roomDetailAction}<span className="sr-only">: {room.name}</span> <span aria-hidden="true">↗</span></Link></article>)}</div>
        </div>
        <Link className="text-link" href="/stay">{copy.roomAction} <span aria-hidden="true">↗</span></Link>
      </section>
      <section className="section introduction home-experiences" aria-labelledby="experiences-heading">
        <figure className="intro-photo" data-wipe><Image src={dining} alt="A vegetarian Kerala feast served on a banana leaf" sizes="(max-width: 760px) 100vw, 46vw" placeholder="blur" /></figure>
        <div><p className="eyebrow">{copy.experiencesLabel}</p><h2 id="experiences-heading" data-reveal>{copy.experiencesHeading}</h2><p>{copy.experiencesIntro}</p><Link className="text-link" href="/experiences">{copy.experiencesAction} <span aria-hidden="true">↗</span></Link></div>
      </section>
      <section className="section home-places" aria-labelledby="places-heading">
        <p className="eyebrow">{placesCopy.homeLabel}</p><h2 id="places-heading" data-reveal>{placesCopy.homeHeading}</h2>
        <ul className="place-grid" data-stagger>{closestPlaces.map(place => <li className="place-card" key={place.name}><Image src={place.image} alt={place.alt} sizes="(max-width: 760px) 90vw, 30vw" placeholder="blur" /><h3>{place.name}</h3><p>{distanceLabel(place)}</p></li>)}</ul>
        <Link className="text-link" href="/experiences#nearby">{placesCopy.seeAll} <span aria-hidden="true">↗</span></Link>
      </section>
      <section className="section home-story" aria-labelledby="story-heading">
        <p className="eyebrow">{copy.storyLabel}</p><h2 id="story-heading" data-reveal>{copy.storyHeading}</h2><p className="lede">{copy.story}</p>
      </section>
      <section className="section home-reviews" id="reviews" aria-labelledby="reviews-heading">
        <p className="eyebrow">{copy.reviewsLabel}</p><h2 id="reviews-heading" data-reveal>{copy.reviewsHeading}</h2>
        <p className="lede">{copy.reviewsNote}</p>
        <div className="rating-badge">
          <p className="rating-headline"><strong>{rating.score} {rating.label}</strong> · {rating.count} {rating.source} ratings (sample)</p>
          <ul>{rating.categories.map(category => <li key={category.name}>{category.name} {category.score}</li>)}</ul>
        </div>
        <Testimonials reviews={homeReviews} />
        <a className="text-link" href={reviewsLink.href}>{reviewsLink.label} <span aria-hidden="true">↗</span></a>
      </section>
      <section className="section" aria-labelledby="gallery-heading">
        <p className="eyebrow">{copy.galleryLabel}</p><h2 id="gallery-heading" data-reveal>{copy.galleryHeading}</h2>
        <div className="home-gallery">{galleryGroups.map(group => <Link key={group.id} href={`/gallery#${group.id}`}><figure><Image src={group.photos[0].image} alt={group.photos[0].alt} sizes="(max-width: 760px) 100vw, 30vw" placeholder="blur" /><figcaption>{group.title} <span aria-hidden="true">↗</span></figcaption></figure></Link>)}</div>
        <Link className="text-link" href="/gallery">{copy.galleryAction} <span aria-hidden="true">↗</span></Link>
      </section>
      <section className="location section" id="location" aria-labelledby="location-heading">
        <p className="eyebrow">{home.locationLabel}</p><h2 id="location-heading" data-reveal>{home.locationHeading}</h2>
        <p>{home.address.map(line => <span key={line}>{line}<br /></span>)}</p><p>{copy.practical}</p>
        <div className="home-actions"><Link className="text-link" href="/location">{copy.practicalAction} <span aria-hidden="true">↗</span></Link><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Wayanad+Kerala+India">{home.mapLabel} <span aria-hidden="true">↗</span></a></div>
      </section>
      <section className="section home-closing" aria-labelledby="closing-heading">
        <p className="eyebrow">{copy.closingLabel}</p><h2 id="closing-heading" data-reveal>{copy.closingHeading}</h2><p className="lede">{copy.closing}</p><Link className="button" href="/plan">{copy.closingAction} <span aria-hidden="true">↗</span></Link>
      </section>
    </SectionReveals>
  </main>;
}
