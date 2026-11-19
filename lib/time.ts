/**
 * Accurate Time & Calendar Math for KAUSEEN
 * Timezone: Asia/Kolkata (+05:30)
 * Start Date: 2020-11-23T00:00:00+05:30
 * Sixth Anniversary: 2026-11-23T00:00:00+05:30
 */

export interface RelationshipDuration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

export type CounterMode = 'before' | 'anniversary' | 'after';

export const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
export const START_DATE_ISO = "2020-11-23T00:00:00+05:30";
export const ANNIVERSARY_DATE_ISO = "2026-11-23T00:00:00+05:30";

/**
 * Returns a Date object shifted into Asia/Kolkata representation
 */
export function getNowInIST(timeTravelMode?: CounterMode | null): Date {
  if (timeTravelMode === 'before') {
    // 2 days before 6th anniversary
    return new Date("2026-11-21T14:30:00+05:30");
  }
  if (timeTravelMode === 'anniversary') {
    // The exact 6th anniversary day
    return new Date("2026-11-23T12:00:00+05:30");
  }
  if (timeTravelMode === 'after') {
    // 6 months after 6th anniversary
    return new Date("2027-05-23T10:15:30+05:30");
  }
  return new Date();
}

/**
 * Accurately compute calendar-based difference between two dates in Asia/Kolkata
 */
export function computeCalendarDifference(from: Date, to: Date): RelationshipDuration {
  let start = new Date(from.getTime());
  let end = new Date(to.getTime());

  if (start > end) {
    [start, end] = [end, start];
  }

  // Calculate year, month, day borrowing correctly
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  let hours = end.getHours() - start.getHours();
  let minutes = end.getMinutes() - start.getMinutes();
  let seconds = end.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    // Borrow days from previous month
    const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += previousMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    totalDays: Math.max(0, totalDays),
  };
}

/**
 * Determine current counter state
 */
export function getCounterState(now: Date): {
  mode: CounterMode;
  elapsedFromStart: RelationshipDuration;
  countdownToAnniversary: RelationshipDuration;
} {
  const startDate = new Date(START_DATE_ISO);
  const anniversaryDate = new Date(ANNIVERSARY_DATE_ISO);

  // Anniversary day range in IST (full 24 hours of 2026-11-23)
  const anniversaryStart = new Date("2026-11-23T00:00:00+05:30");
  const anniversaryEnd = new Date("2026-11-23T23:59:59+05:30");

  let mode: CounterMode = 'before';
  if (now >= anniversaryStart && now <= anniversaryEnd) {
    mode = 'anniversary';
  } else if (now > anniversaryEnd) {
    mode = 'after';
  } else {
    mode = 'before';
  }

  const elapsedFromStart = computeCalendarDifference(startDate, now);
  const countdownToAnniversary = computeCalendarDifference(now, anniversaryDate);

  return {
    mode,
    elapsedFromStart,
    countdownToAnniversary,
  };
}
