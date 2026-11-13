'use client';
import { useRef, type KeyboardEvent } from 'react';

type Review = { author: string; trip: string; quote: string };

export function Testimonials({ reviews }: { reviews: Review[] }) {
  const track = useRef<HTMLUListElement>(null);
  const move = (direction: 1 | -1) => {
    const node = track.current;
    if (!node) return;
    const card = node.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(node).columnGap || '0') : node.clientWidth;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollBy({ left: direction * step, behavior: reduce ? 'auto' : 'smooth' });
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  };
  return <div className="testimonials" role="group" aria-roledescription="carousel" aria-label="Guest testimonials">
    <ul className="testimonial-track" data-track ref={track} tabIndex={0} aria-label="Testimonials, use arrow keys to browse" onKeyDown={onKey}>
      {reviews.map((review, index) => <li className="testimonial-card" key={review.author} role="group" aria-roledescription="slide" aria-label={`Testimonial ${index + 1} of ${reviews.length}`}>
        <figure>
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote><p>{review.quote}</p></blockquote>
          <figcaption>{review.author}{review.trip ? <span> · {review.trip}</span> : null}</figcaption>
        </figure>
      </li>)}
    </ul>
    <div className="testimonial-controls">
      <button type="button" onClick={() => move(-1)} aria-label="Previous testimonial"><span aria-hidden="true">←</span></button>
      <button type="button" onClick={() => move(1)} aria-label="Next testimonial"><span aria-hidden="true">→</span></button>
    </div>
  </div>;
}
