export const formatDateForQuery = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
