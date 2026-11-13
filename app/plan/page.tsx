import { Suspense } from 'react';
import { bookingUrl } from '@/content/stay';
import type { Metadata } from 'next';
import { StayPlanner } from '@/components/stay-planner';
import { plan } from '@/content/plan';
export const metadata: Metadata = { title: 'Plan your stay | Aranya', description: 'Gather your stay preferences, then continue to the booking site to book.' };
export default function Plan() {
  return <main id="main" className="section plan-page"><p className="eyebrow">Time for Wayanad</p><h1>Plan your stay.</h1><p className="lede">{plan.introduction}</p><Suspense fallback={<p>Loading planner. <a className="text-link" href={bookingUrl}>Continue directly to the booking site</a>.</p>}><StayPlanner /></Suspense></main>;
}
