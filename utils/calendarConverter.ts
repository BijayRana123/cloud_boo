import NepaliDate from 'nepali-date-converter';

export const calendarConverter = {
  toBS: (date: Date): string => {
    const nepaliDate = new NepaliDate(date);
    return nepaliDate.format('YYYY-MM-DD');
  },

  toAD: (bsDate: string): Date => {
    const [year, month, day] = bsDate.split('-').map(Number);
    const nepaliDate = new NepaliDate(year, month - 1, day);
    return nepaliDate.toJsDate();
  },

  formatBS: (date: Date): string => {
    const nepaliDate = new NepaliDate(date);
    return nepaliDate.format('MMMM DD, YYYY');
  },

  formatAD: (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },
}; 