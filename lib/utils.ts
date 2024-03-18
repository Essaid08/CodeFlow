import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDiff = now.getTime() - createdAt.getTime();

  if (timeDiff < 0) {
    // Handle future dates
    return 'Just now';
  }

  // Calculate seconds, minutes, hours, and days difference
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDiff < minute) {
    const seconds = Math.floor(timeDiff / 1000);
    return `${seconds} ${seconds !== 1 ? 'seconds' : 'second'} ago`;
  } else if (timeDiff < hour) {
    const minutes = Math.floor(timeDiff / minute);
    return `${minutes} ${minutes !== 1 ? 'minutes' : 'minute'} ago`;
  } else if (timeDiff < day) {
    const hours = Math.floor(timeDiff / hour);
    return `${hours} ${hours !== 1 ? 'hours' : 'hour'} ago`;
  } else if (timeDiff < week) {
    const days = Math.floor(timeDiff / day);
    return `${days} ${days !== 1 ? 'days' : 'day'} ago`;
  } else if (timeDiff < month) {
    const weeks = Math.floor(timeDiff / week);
    return `${weeks} ${weeks !== 1 ? 'weeks' : 'week'} ago`;
  } else if (timeDiff < year) {
    const months = Math.floor(timeDiff / month);
    return `${months} ${months !== 1 ? 'months' : 'month'} ago`;
  } else {
    const years = Math.floor(timeDiff / year);
    return `${years} ${years !== 1 ? 'years' : 'year'} ago`;
  }
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
  } else {
      return num ? num.toString() : '0';
  }
};

