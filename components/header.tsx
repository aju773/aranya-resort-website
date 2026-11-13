'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { home, navigation } from '@/content/home';

export function Header() {
  const pathname = usePathname();
  const isCurrent = (href: string) => href === pathname || (href === '/stay' && pathname.startsWith('/stay/'));
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);
  function closeMenu() { setOpen(false); }
  return <><header className="site-header">
    <Link className="wordmark" href="/" aria-label="Aranya home" onClick={closeMenu}>aranya<span>{home.tagline}</span></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.filter(item => item.href !== '/plan').map(item => <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>{item.label}</Link>)}</nav>
    <Link className="header-action" href="/plan">Plan your stay <span aria-hidden="true">↗</span></Link>
    <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '×' : '+'}</span></button>
    <nav ref={menu} id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation" hidden={!open} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget) && event.relatedTarget !== toggle.current) setOpen(false);
    }}>{navigation.map(item => <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined} onClick={closeMenu}>{item.label}<span aria-hidden="true">↗</span></Link>)}</nav>
  </header>{!pathname.startsWith('/plan') && !pathname.startsWith('/gallery') && !open && <Link className="mobile-plan" href="/plan">Plan your stay <span aria-hidden="true">↗</span></Link>}</>;
}
