import qs from "query-string";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Timestamp } from "firebase/firestore";
import { Conversation } from "@/types";
import { LastUpdateRange } from "@/constants";

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formUrlQuery = ({
  params,
  key,
  value,
}: UrlQueryParams): string => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams): string => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};

export const getTimestamp = (createdAt: {
  seconds: number;
  nanoseconds: number;
}): string => {
  const currentDate = new Date();
  const createdAtDate = new Date(
    createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000,
  );

  const timeDifference = currentDate.getTime() - createdAtDate.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years}y ago`;
  } else if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes} min ago`;
  } else {
    return `${seconds} sec ago`;
  }
};

export const sortConversations = (a: Conversation, b: Conversation) => {
  if (
    a.marked_starred &&
    !a.all_messages_read &&
    (!b.marked_starred || b.all_messages_read)
  )
    return -1;
  if (
    b.marked_starred &&
    !b.all_messages_read &&
    (!a.marked_starred || a.all_messages_read)
  )
    return 1;

  if (a.marked_starred && !b.marked_starred) return -1;
  if (b.marked_starred && !a.marked_starred) return 1;

  if (!a.all_messages_read && b.all_messages_read) return -1;
  if (!b.all_messages_read && a.all_messages_read) return 1;

  return b.last_updated.toMillis() - a.last_updated.toMillis();
};

export const defaultLastUpdateRanges: Record<
  LastUpdateRange,
  { start: Timestamp; end: Timestamp }
> = {
  [LastUpdateRange.HOURS_24]: {
    start: Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000)),
    end: Timestamp.now(),
  },
  [LastUpdateRange.HOURS_24_TO_72]: {
    start: Timestamp.fromDate(new Date(Date.now() - 72 * 60 * 60 * 1000)),
    end: Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000)),
  },
  [LastUpdateRange.UP_2_WEEKS]: {
    start: Timestamp.fromDate(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)),
    end: Timestamp.fromDate(new Date(Date.now() - 72 * 60 * 60 * 1000)),
  },
  [LastUpdateRange.ALL_TIME]: {
    start: Timestamp.fromDate(new Date(0)),
    end: Timestamp.fromDate(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)),
  },
};
