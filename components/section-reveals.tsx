'use client';
import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SectionReveals({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]', scope.current).forEach(section => {
        gsap.fromTo(section, { y: 12 }, {
          y: 0, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 92%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-stagger]', scope.current).forEach(group => {
        gsap.fromTo(Array.from(group.children), { y: 16, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1, clearProps: 'transform,opacity',
          scrollTrigger: { trigger: group, start: 'top 90%', once: true },
        });
      });
    });
    media.add('(prefers-reduced-motion: no-preference) and (min-width: 761px)', () => {
      gsap.utils.toArray<HTMLElement>('[data-wipe]', scope.current).forEach(photo => {
        gsap.fromTo(photo, { clipPath: 'inset(0 0 100% 0)' }, {
          clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power2.out', clearProps: 'clipPath',
          scrollTrigger: { trigger: photo, start: 'top 88%', once: true },
        });
      });
    });
    return () => media.revert();
  }, { scope });
  return <div ref={scope}>{children}</div>;
}
