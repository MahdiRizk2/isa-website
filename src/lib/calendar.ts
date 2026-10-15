// Reads the ISA Google Calendar at build time and turns it into the event
// lists the site shows. The site is static, so events only change when the
// site rebuilds (every 12 hours via .github/workflows/deploy.yml, or on any push).
//
// Organizer notes (also in README.md › Events):
// - Anything on the public calendar can appear on the site: title, location,
//   and the first line of the description. Keep private details out of events.
// - A leading "ISA " in a title is dropped ("ISA Book Club" shows as "Book Club").
// - Titles containing "Dua and Discussion" or "Kumayl" count as the Thursday
//   program and are always shown first-class in "This week".
import ical from 'node-ical';
import type { VEvent } from 'node-ical';
import content from '../data/content.json';
import fallbackEvents from '../data/events.json';

export const TIME_ZONE = 'America/Detroit';
const LOOKAHEAD_DAYS = 90;
const WEEK_DAYS = 7;
const THIS_WEEK_MAX = 3;
const DAY_MS = 24 * 60 * 60 * 1000;

export type Cadence = 'Weekly' | 'Biweekly' | 'Monthly';

export interface CalendarEvent {
  /** Stable id used for the per-event .ics file name. */
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  /** Short place name: the part of the location before the first comma. */
  place: string | null;
  /** Full location string, used in the .ics file. */
  location: string | null;
  /** First line of the description, shortened. */
  note: string | null;
  description: string | null;
  cadence: Cadence | null;
  featured: boolean;
}

export interface MonthGroup {
  label: string;
  events: CalendarEvent[];
}

export interface CalendarData {
  /** Every upcoming event in the next 90 days, in date order. */
  events: CalendarEvent[];
  /** Up to three events for the "This week" panels. */
  thisWeek: CalendarEvent[];
  /** True when nothing is on in the next 7 days and `thisWeek` holds the next upcoming events instead. */
  thisWeekIsLater: boolean;
  /** Everything not shown in `thisWeek`, grouped by month. */
  comingUp: MonthGroup[];
  weekStart: Date;
  source: 'calendar' | 'fallback';
}

interface FallbackEvent {
  title: string;
  start: string;
  end?: string;
  location?: string;
  description?: string;
  allDay?: boolean;
}

let cached: Promise<CalendarData> | undefined;

/** Loads the calendar once per build and shares the result across pages. */
export function getCalendar(): Promise<CalendarData> {
  cached ??= load();
  return cached;
}

async function load(): Promise<CalendarData> {
  const now = new Date();
  const until = new Date(now.getTime() + LOOKAHEAD_DAYS * DAY_MS);

  let events: CalendarEvent[] = [];
  let source: CalendarData['source'] = 'calendar';
  try {
    events = await fromFeed(content.links.calendar_ical, now, until);
  } catch (error) {
    console.warn(`[calendar] Could not read the calendar feed, using src/data/events.json instead: ${String(error)}`);
  }
  if (events.length === 0) {
    events = fromFallback(fallbackEvents as FallbackEvent[], now, until);
    source = 'fallback';
  }
  events.sort((a, b) => a.start.getTime() - b.start.getTime());

  const weekEnd = new Date(now.getTime() + WEEK_DAYS * DAY_MS);
  const inWeek = events.filter((e) => e.start < weekEnd);
  const thisWeekIsLater = inWeek.length === 0;
  const thisWeek = pickThisWeek(thisWeekIsLater ? events : inWeek);
  const rest = events.filter((e) => !thisWeek.includes(e));

  return { events, thisWeek, thisWeekIsLater, comingUp: groupByMonth(rest), weekStart: now, source };
}

async function fromFeed(url: string, from: Date, to: Date): Promise<CalendarEvent[]> {
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const parsed = ical.sync.parseICS(await response.text());

  const events: CalendarEvent[] = [];
  for (const item of Object.values(parsed)) {
    if (!item || item.type !== 'VEVENT') continue;
    const base = item as VEvent;
    const cadence = cadenceOf(base);
    const instances = ical.expandRecurringEvent(base, { from, to, expandOngoing: true });
    for (const instance of instances) {
      const ev = instance.event;
      if (text(ev.status)?.toUpperCase() === 'CANCELLED') continue;
      events.push(
        makeEvent({
          uid: text(base.uid) ?? '',
          title: text(instance.summary) ?? 'ISA event',
          start: instance.start,
          end: instance.end ?? instance.start,
          allDay: instance.isFullDay,
          location: text(ev.location),
          description: text(ev.description),
          cadence,
        }),
      );
    }
  }
  return events;
}

function fromFallback(list: FallbackEvent[], from: Date, to: Date): CalendarEvent[] {
  return list
    .map((e) => {
      const start = new Date(e.start);
      return makeEvent({
        uid: `${e.title}-${e.start}`,
        title: e.title,
        start,
        end: e.end ? new Date(e.end) : start,
        allDay: Boolean(e.allDay),
        location: e.location ?? null,
        description: e.description ?? null,
        cadence: null,
      });
    })
    .filter((e) => e.end >= from && e.start <= to);
}

function makeEvent(raw: {
  uid: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  location: string | null;
  description: string | null;
  cadence: Cadence | null;
}): CalendarEvent {
  const title = raw.title.replace(/^ISA[:\s]+(?!x\b)/i, '').trim() || raw.title;
  const location = clean(raw.location);
  const description = clean(raw.description);
  const place = location ? location.split(',')[0]!.trim() : null;
  const firstLine = description?.split('\n').map((l) => l.trim()).find(Boolean) ?? null;
  const note = firstLine && firstLine !== place ? shorten(firstLine, 90) : null;
  return {
    id: `${ymd(raw.start)}-${hash(raw.uid + raw.start.toISOString())}`,
    title,
    start: raw.start,
    end: raw.end,
    allDay: raw.allDay,
    place,
    location,
    note,
    description,
    cadence: raw.cadence,
    featured: /dua\s*(and|&)?\s*discussion|kumayl/i.test(title),
  };
}

/** Up to three events in date order, always keeping the featured program if it is on. */
function pickThisWeek(candidates: CalendarEvent[]): CalendarEvent[] {
  const picked = candidates.slice(0, THIS_WEEK_MAX);
  const featured = candidates.find((e) => e.featured);
  if (!featured || picked.includes(featured)) return picked;
  return [...candidates.filter((e) => e !== featured).slice(0, THIS_WEEK_MAX - 1), featured].sort(
    (a, b) => a.start.getTime() - b.start.getTime(),
  );
}

function groupByMonth(events: CalendarEvent[]): MonthGroup[] {
  const groups: MonthGroup[] = [];
  for (const event of events) {
    const label = formatMonth(event.start);
    const last = groups.at(-1);
    if (last && last.label === label) last.events.push(event);
    else groups.push({ label, events: [event] });
  }
  return groups;
}

function cadenceOf(event: VEvent): Cadence | null {
  if (!event.rrule) return null;
  const rule = String(event.rrule.toString());
  const interval = Number(/INTERVAL=(\d+)/.exec(rule)?.[1] ?? '1');
  if (/FREQ=WEEKLY/.test(rule)) return interval === 1 ? 'Weekly' : interval === 2 ? 'Biweekly' : null;
  if (/FREQ=MONTHLY/.test(rule) && interval === 1) return 'Monthly';
  return null;
}

// node-ical returns some properties as { val, params } objects.
function text(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value === 'object' && 'val' in value) return text((value as { val: unknown }).val);
  const s = String(value).trim();
  return s || null;
}

function clean(value: string | null): string | null {
  if (!value) return null;
  const s = value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();
  return s || null;
}

function shorten(s: string, max: number): string {
  return s.length <= max ? s : `${s.slice(0, max - 1).trimEnd()}…`;
}

function hash(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

// ---------- Formatting (always in Ann Arbor time, whatever machine builds the site) ----------

const fmt = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, ...options });
const weekdayFmt = fmt({ weekday: 'short' });
const dayFmt = fmt({ day: 'numeric' });
const monthFmt = fmt({ month: 'long', year: 'numeric' });
const monthDayFmt = fmt({ month: 'short', day: 'numeric' });
const timeFmt = fmt({ hour: 'numeric', minute: '2-digit' });
const isoDayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit' });

export const formatWeekday = (d: Date) => weekdayFmt.format(d);
export const formatDay = (d: Date) => dayFmt.format(d);
export const formatMonthDay = (d: Date) => monthDayFmt.format(d);
export function formatMonth(d: Date): string {
  return monthFmt.format(d);
}
export function formatTime(event: CalendarEvent): string {
  return event.allDay ? 'All day' : timeFmt.format(event.start);
}
function ymd(d: Date): string {
  return isoDayFmt.format(d).replaceAll('-', '');
}

// ---------- .ics export for "Add to calendar" ----------

export function toICS(event: CalendarEvent): string {
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, (c) => `\\${c}`);
  const date = (d: Date) => isoDayFmt.format(d).replaceAll('-', '');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Islamic Society of Ahlulbayt//Website//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}@isahlulbayt`,
    `DTSTAMP:${stamp(new Date())}`,
    ...(event.allDay
      ? [`DTSTART;VALUE=DATE:${date(event.start)}`, `DTEND;VALUE=DATE:${date(event.end)}`]
      : [`DTSTART:${stamp(event.start)}`, `DTEND:${stamp(event.end)}`]),
    `SUMMARY:${escape(event.title)}`,
    ...(event.location ? [`LOCATION:${escape(event.location)}`] : []),
    ...(event.description ? [`DESCRIPTION:${escape(event.description)}`] : []),
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}

// iCalendar lines must be folded at 75 octets.
function fold(line: string): string {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const parts: string[] = [];
  let current = '';
  let size = 0;
  for (const ch of line) {
    const n = new TextEncoder().encode(ch).length;
    if (size + n > (parts.length === 0 ? 75 : 74)) {
      parts.push(current);
      current = '';
      size = 0;
    }
    current += ch;
    size += n;
  }
  parts.push(current);
  return parts.join('\r\n ');
}
