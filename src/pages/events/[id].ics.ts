// One downloadable .ics file per upcoming event, for the "Add to calendar" links.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCalendar, toICS, type CalendarEvent } from '../../lib/calendar';

export const getStaticPaths = (async () => {
  const { events } = await getCalendar();
  return events.map((event) => ({ params: { id: event.id }, props: { event } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ event: CalendarEvent }> = ({ props }) =>
  new Response(toICS(props.event), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
