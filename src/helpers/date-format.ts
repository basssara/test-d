import { parseISO, format as dateFormat } from 'date-fns';

export const formatDate = (date: Date, format: string): string => {
  return dateFormat(parseISO(new Date(date).toISOString()), format);
};
