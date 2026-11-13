import Link from 'next/link';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { Header } from '@/components/header';
import { home } from '@/content/home';
import './globals.css';
const heading = Cormorant_Garamond({ subsets: ['latin'], weight: ['500'], style: ['normal', 'italic'], variable: '--font-heading', display: 'swap' });
const body = Manrope({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body', display: 'swap' });
const ogTitle = 'Aranya · A home in the hills of Wayanad';
const origin = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');
const ogImage = { url: '/og-image.jpg', width: 1200, height: 630, alt: 'The Aranya house among coconut palms' };
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: home.title,
  description: home.description,
  robots: { index: false, follow: false },
  openGraph: { type: 'website', siteName: 'Aranya', title: ogTitle, description: home.description, url: '/', images: [ogImage] },
  twitter: { card: 'summary_large_image', title: ogTitle, description: home.description, images: [ogImage.url] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${heading.variable} ${body.variable}`}><a className="skip-link" href="#main">Skip to content</a><Header />{children}<footer className="site-footer"><Link className="wordmark" href="/">aranya<span>{home.tagline}</span></Link><p>{home.shortAddress}</p><a href={home.official}>{home.officialLabel} ↗</a><small>{home.conceptNote}</small></footer></body></html>;
}
