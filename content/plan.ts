import { rooms } from '@/content/stay';

export const plan = {
  storageKey: 'aranya-plan-v1',
  sampleNightly: 8000,
  requests: ['Prefer a quiet room', 'Discuss vegetarian meal preferences'],
  introduction: 'Gather your preferences for one room, then carry them to the booking site.',
  capacity: 'Rooms sleep up to 2 adults. Travelling with children? Check extra-bed options on the booking site.',
  handoff: 'No reservation has been created. Prices here are illustrative only. The booking site determines actual rates, taxes, inclusions, policies and availability. Re-enter all dates, guests, room choices and requests there; selections do not transfer.',
  requestNote: 'Optional notes for your hosts. No names or contact details needed.',
};
export type PlanDraft = { arrival: string; departure: string; adults: string; children: string; room: string; requests: string[] };
export const emptyPlan: PlanDraft = { arrival: '', departure: '', adults: '2', children: '0', room: '', requests: [] };
export function today() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function isDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
export function planErrors(draft: PlanDraft) {
  const errors: Partial<Record<keyof PlanDraft, string>> = {};
  if (!isDate(draft.arrival) || draft.arrival < today()) errors.arrival = 'Choose an arrival date today or later.';
  if (!isDate(draft.departure) || draft.departure <= draft.arrival) errors.departure = 'Choose a departure after arrival.';
  if (!/^[12]$/.test(draft.adults)) errors.adults = 'Choose 1 or 2 adults for this single-room preview. For larger groups, check rooms on the booking site.';
  if (!/^\d+$/.test(draft.children) || !Number.isSafeInteger(Number(draft.children))) errors.children = 'Enter a whole number of children, 0 or more.';
  if (!rooms.some(room => room.slug === draft.room)) errors.room = 'Choose a room preference.';
  return errors;
}
export function restorePlan(value: unknown): PlanDraft | null {
  if (!value || typeof value !== 'object' || !('version' in value) || value.version !== 1 || !('draft' in value)) return null;
  const draft = value.draft;
  if (!draft || typeof draft !== 'object' || !('arrival' in draft) || typeof draft.arrival !== 'string' || !('departure' in draft) || typeof draft.departure !== 'string' || !('adults' in draft) || typeof draft.adults !== 'string' || !('children' in draft) || typeof draft.children !== 'string' || !('room' in draft) || typeof draft.room !== 'string' || !('requests' in draft) || !Array.isArray(draft.requests)) return null;
  const result = { arrival: draft.arrival, departure: draft.departure, adults: draft.adults, children: draft.children, room: draft.room, requests: draft.requests.filter((item): item is string => typeof item === 'string' && plan.requests.includes(item)) };
  const errors = planErrors(result);
  return { ...result, arrival: errors.arrival ? '' : result.arrival, departure: errors.departure ? '' : result.departure, adults: errors.adults ? emptyPlan.adults : result.adults, children: errors.children ? emptyPlan.children : result.children, room: errors.room ? '' : result.room };
}
