'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gallery, galleryGroups, galleryPhotos, type GalleryPhoto } from '@/content/gallery';

function Photograph({ photo, full = false }: { photo: GalleryPhoto; full?: boolean }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="photo-error">{gallery.unavailable}</span> :
    <Image src={photo.image} alt={photo.alt} fill sizes={full ? '100vw' : '(max-width: 760px) 100vw, 50vw'} onError={() => setFailed(true)} />;
}

export function Gallery() {
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const index = selected ? galleryPhotos.indexOf(selected) : -1;
  const isOpen = selected !== null;

  useEffect(() => {
    if (!isOpen) return;
    const viewer = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    viewer?.showModal();
    return () => {
      viewer?.close();
      document.body.style.overflow = overflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  function move(direction: number) {
    const photo = galleryPhotos[(index + direction + galleryPhotos.length) % galleryPhotos.length];
    if (photo) setSelected(photo);
  }

  return <>
    {galleryGroups.map(group => <section className="gallery-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-heading`}>
      <h2 id={`${group.id}-heading`}>{group.title}</h2>
      <div className="gallery-grid">{group.photos.map(photo => <figure key={photo.image.src}>
        <a className="gallery-thumbnail" style={{ aspectRatio: `${photo.image.width} / ${photo.image.height}` }} href={photo.image.src} aria-label={`View ${photo.alt}`} onClick={event => {
          event.preventDefault();
          trigger.current = event.currentTarget;
          setSelected(photo);
        }}><Photograph photo={photo} /><span className="photo-open" aria-hidden="true">View photo ↗</span></a>
        <figcaption>{photo.alt}</figcaption>
      </figure>)}</div>
    </section>)}
    <dialog ref={dialog} className="gallery-viewer" aria-label="Photo viewer" aria-describedby="viewer-caption" onCancel={event => { event.preventDefault(); setSelected(null); }} onClose={() => setSelected(null)} onKeyDown={event => {
      if (event.key === 'Tab') {
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
      }
    }}>
      {selected && <>
        <div className="viewer-toolbar"><span aria-live="polite" aria-atomic="true">{index + 1} / {galleryPhotos.length}</span><button autoFocus onClick={() => setSelected(null)}>{gallery.close} ×</button></div>
        <div className="viewer-photo" onTouchStart={event => {
          const point = event.touches[0];
          touch.current = event.touches.length === 1 && point ? { x: point.clientX, y: point.clientY } : null;
        }} onTouchEnd={event => {
          const end = event.changedTouches[0];
          if (touch.current && end) {
            const dx = end.clientX - touch.current.x;
            const dy = end.clientY - touch.current.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
          }
          touch.current = null;
        }} onTouchCancel={() => { touch.current = null; }}>
          <Photograph key={selected.image.src} photo={selected} full />
        </div>
        <p id="viewer-caption" aria-live="polite">{selected.alt}</p>
        <div className="viewer-controls"><button onClick={() => move(-1)}>← {gallery.previous}</button><a href={selected.image.src}>Open original</a><button onClick={() => move(1)}>{gallery.next} →</button></div>
      </>}
    </dialog>
  </>;
}
