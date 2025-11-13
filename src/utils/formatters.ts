import { format, formatDistanceToNow } from 'date-fns';

export const dateFormatters = {
  standard: (date: string | Date) => format(new Date(date), 'MMM dd, yyyy'),
  withTime: (date: string | Date) => format(new Date(date), 'MMM dd, yyyy HH:mm'),
  timeAgo: (date: string | Date) => formatDistanceToNow(new Date(date), { addSuffix: true }),
  full: (date: string | Date) => format(new Date(date), 'PPpp')
};

export const textFormatters = {
  truncate: (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },
  capitalize: (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
  titleCase: (text: string) => text.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
};
