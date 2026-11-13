import type { Metadata } from 'next';
import { home } from '@/content/home';
import { location } from '@/content/location';

export const metadata: Metadata = { title: location.title, description: location.description };

export default function Location() {
  return <main id="main">
    <section className="section location-intro">
      <p className="eyebrow">{location.eyebrow}</p>
      <h1>{location.heading}</h1>
      <p className="lede">{location.introduction}</p>
      <div className="location-grid">
        <div className="location-address"><h2>{location.addressHeading}</h2>
          <address>Aranya<br />{home.address.map(line => <span key={line}>{line}<br /></span>)}</address>
          <div className="location-actions"><a className="button" href={location.mapUrl}>{location.mapLabel} ↗</a><a className="text-link" href={location.directionsUrl}>{location.directionsLabel} ↗</a></div>
        </div>
        <div><h2>{location.arrivalHeading}</h2><p>{location.arrival}</p><a className="text-link" href={`tel:${location.phone}`}>{location.phoneLabel}</a><p className="location-route-note">{location.routeNote}</p></div>
      </div>
    </section>
    <section className="section faq-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading">{location.faqHeading}</h2>
      <div className="faq-list">{location.faqs.map(faq => <details key={faq.question}>
        <summary>{faq.question}</summary>
        <div className="faq-answer"><p>{faq.answer}</p></div>
      </details>)}</div>
    </section>
  </main>;
}
