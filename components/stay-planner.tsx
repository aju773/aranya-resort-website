'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useSearchParams } from 'next/navigation';
import { bookingUrl, rooms } from '@/content/stay';
import { emptyPlan, plan, planErrors, restorePlan, today, type PlanDraft } from '@/content/plan';

const subscribe = () => () => {};
function loadPlan(room: string | null) {
  let draft = emptyPlan;
  let notice = '';
  try {
    const stored = sessionStorage.getItem(plan.storageKey);
    if (stored) {
      const restored = restorePlan(JSON.parse(stored));
      if (restored) draft = restored;
      notice = 'Saved preferences checked. Please review dates and guest counts before continuing.';
    }
  } catch { notice = 'Preferences could not be restored. You can still plan here; saving may be unavailable.'; }
  if (rooms.some(item => item.slug === room) && room) draft = { ...draft, room };
  return { draft, notice };
}
export function StayPlanner() {
  const room = useSearchParams().get('room');
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  return hydrated ? <Planner roomPreference={room} /> : <p>Loading stay planner. JavaScript is needed for this preview. You can also <a className="text-link" href={bookingUrl}>continue directly to the booking site</a>.</p>;
}
function Planner({ roomPreference }: { roomPreference: string | null }) {
  const [initial] = useState(() => loadPlan(roomPreference));
  const [draft, setDraft] = useState(initial.draft);
  const [notice, setNotice] = useState(initial.notice);
  const [step, setStep] = useState<'preferences' | 'review'>('preferences');
  const [errors, setErrors] = useState<ReturnType<typeof planErrors>>({});
  useEffect(() => {
    try { sessionStorage.setItem(plan.storageKey, JSON.stringify({ version: 1, draft: initial.draft })); }
    catch { /* Keep initial preferences usable in memory. Edits report saving failures. */ }
  }, [initial]);
  const heading = useRef<HTMLHeadingElement>(null);
  const errorSummary = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const back = () => setStep(window.location.hash === '#review' && Object.keys(planErrors(draft)).length === 0 ? 'review' : 'preferences');
    window.addEventListener('popstate', back);
    return () => window.removeEventListener('popstate', back);
  }, [draft]);
  useEffect(() => { heading.current?.focus(); }, [step]);
  useEffect(() => { if (Object.keys(errors).length) errorSummary.current?.focus(); }, [errors]);
  function update(next: PlanDraft) {
    if (next.room !== draft.room) {
      const url = new URL(window.location.href);
      if (url.searchParams.has('room')) {
        url.searchParams.set('room', next.room);
        history.replaceState(null, '', url);
      }
    }
    setDraft(next);
    setErrors({});
    try { sessionStorage.setItem(plan.storageKey, JSON.stringify({ version: 1, draft: next })); }
    catch { setNotice('Saving is unavailable. Your preferences remain here until you leave or refresh this page.'); }
  }
  function edit() {
    history.pushState(null, '', '#preferences');
    setStep('preferences');
  }
  const room = rooms.find(room => room.slug === draft.room);
  const nights = (Date.parse(draft.departure) - Date.parse(draft.arrival)) / 86400000;
  const money = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  return <div className="planner">
    <p className="eyebrow">{step === 'preferences' ? '1. Your preferences' : '2. Review and continue'}</p>
    <h2 ref={heading} tabIndex={-1}>{step === 'preferences' ? 'A little planning.' : 'Your stay, at a glance.'}</h2>
    {notice && <p role="status" className="planner-note">{notice}</p>}
    {step === 'preferences' ? <form noValidate onSubmit={event => {
      event.preventDefault();
      const nextErrors = planErrors(draft);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length) return;
      update(draft);
      history.pushState(null, '', '#review');
      setStep('review');
    }}>
      {Object.keys(errors).length > 0 && <div className="planner-errors" role="alert" tabIndex={-1} ref={errorSummary}><p>Please check your preferences.</p><ul>{Object.entries(errors).map(([field, message]) => <li key={field}><a href={`#${field}`}>{message}</a></li>)}</ul></div>}
      <fieldset><legend>Dates</legend><div className="planner-grid">{(['arrival', 'departure'] satisfies (keyof PlanDraft)[]).map(field => <div key={field}><label htmlFor={field}>{field === 'arrival' ? 'Arrival' : 'Departure'}</label><input id={field} type="date" min={today()} value={draft[field]} aria-invalid={!!errors[field]} aria-describedby={errors[field] ? `${field}-error` : undefined} onChange={event => update({ ...draft, [field]: event.target.value })} />{errors[field] && <span id={`${field}-error`}>{errors[field]}</span>}</div>)}</div></fieldset>
      <fieldset><legend>Guests · one room</legend><div className="planner-grid">{(['adults', 'children'] satisfies (keyof PlanDraft)[]).map(field => <div key={field}><label htmlFor={field}>{field === 'adults' ? 'Adults' : 'Children'}</label><input id={field} type="number" min={field === 'adults' ? 1 : 0} max={field === 'adults' ? 2 : undefined} step="1" value={draft[field]} aria-invalid={!!errors[field]} aria-describedby={`capacity${errors[field] ? ` ${field}-error` : ''}`} onChange={event => update({ ...draft, [field]: event.target.value })} />{errors[field] && <span id={`${field}-error`}>{errors[field]}</span>}</div>)}</div><p id="capacity">{plan.capacity}</p></fieldset>
      <fieldset><legend>Room preference</legend><label htmlFor="room">Room</label><select id="room" value={draft.room} aria-invalid={!!errors.room} aria-describedby={errors.room ? 'room-error' : undefined} onChange={event => update({ ...draft, room: event.target.value })}><option value="">Choose a room</option>{rooms.map(room => <option key={room.slug} value={room.slug}>{room.name}</option>)}</select>{errors.room && <p id="room-error">{errors.room}</p>}</fieldset>
      <fieldset><legend>Optional requests</legend><p>{plan.requestNote}</p>{plan.requests.map(request => <label className="request-option" key={request}><input type="checkbox" checked={draft.requests.includes(request)} onChange={event => update({ ...draft, requests: event.target.checked ? [...draft.requests, request] : draft.requests.filter(item => item !== request) })} />{request}</label>)}</fieldset>
      <button className="button" type="submit">Review preferences</button>
    </form> : <section aria-label="Review preferences"><dl className="plan-summary"><div><dt>Dates</dt><dd>{draft.arrival} to {draft.departure} · {nights} {nights === 1 ? 'night' : 'nights'}</dd></div><div><dt>Guests</dt><dd>{draft.adults} adults · {draft.children} children · one room</dd></div><div><dt>Room preference</dt><dd>{room?.name}</dd></div><div><dt>Optional requests</dt><dd>{draft.requests.join(', ') || 'None'}</dd></div></dl>
      {Number(draft.children) > 0 && <p>{plan.capacity}</p>}
      <div className="sample-price"><h3>Sample price · illustrative only</h3><p>{nights} nights × {money(plan.sampleNightly)} per room/night = {money(nights * plan.sampleNightly)}</p><p>A sample amount only. Taxes, fees and meals are not included.</p></div>
      <button type="button" className="text-link" onClick={edit}>Back / edit preferences</button><p>{plan.handoff}</p>
      <a className="button" href={bookingUrl} referrerPolicy="no-referrer" onClick={event => {
        const nextErrors = planErrors(draft);
        if (Object.keys(nextErrors).length) { event.preventDefault(); setErrors(nextErrors); edit(); }
      }}>Continue to the booking site <span aria-hidden="true">↗</span></a>
    </section>}
  </div>;
}
