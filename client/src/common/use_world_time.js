import { useEffect, useState } from 'react';

export const ZONES = [
  { id: 'dubai', city: 'Dubai', tz: 'Asia/Dubai' },
  { id: 'london', city: 'London', tz: 'Europe/London' },
  { id: 'india', city: 'Delhi', tz: 'Asia/Kolkata' },
];

function timeIn(tz) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: tz,
  }).format(new Date());
}

/**
 * Live time for each studio city.
 *
 * Ticks on the minute boundary rather than every 60s from mount, so the
 * displayed minute changes when the clock changes, not up to 59s late.
 */
export default function useWorldTime() {
  const [times, setTimes] = useState(() =>
    ZONES.map((z) => ({ ...z, time: timeIn(z.tz) }))
  );

  useEffect(() => {
    let timeout;

    function schedule() {
      const now = new Date();
      const msToNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      timeout = setTimeout(() => {
        setTimes(ZONES.map((z) => ({ ...z, time: timeIn(z.tz) })));
        schedule();
      }, msToNextMinute);
    }

    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return times;
}
