'use client';
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { home } from '@/content/home';
import hero from '@/public/images/hills-view.jpg';

gsap.registerPlugin(useGSAP);
export function Hero() {
  const scope = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.hero-image', { scale: 1.035 }, { scale: 1, duration: 1.1, ease: 'power2.out' });
      gsap.fromTo('.hero-line', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.12, delay: 0.1, clearProps: 'transform,opacity' });
    });
    return () => media.revert();
  }, { scope });
  return <section ref={scope} className="hero" aria-labelledby="hero-heading">
    <Image className="hero-image" src={hero} alt={home.heroAlt} fill sizes="100vw" preload placeholder="blur" />
    <div className="hero-shade" />
    <div className="hero-content"><p className="eyebrow">{home.location}</p><h1 id="hero-heading"><span className="hero-line">{home.heading}</span>{' '}<span className="hero-line"><em>{home.headingAccent}</em></span></h1><p className="hero-caption">{home.heroCaption}</p><a className="button button-light" href="#introduction">{home.stepInside} <span aria-hidden="true">↗</span></a></div>
    <div className="hero-bottom"><span>{home.heroFootnote}</span><a href="#introduction">{home.explore} <span aria-hidden="true">↓</span></a></div>
  </section>;
}
