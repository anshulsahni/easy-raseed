export const addPeriod = (momentDate, quantity, period) => momentDate.clone().add(quantity, period);

export const getYMDFormat = (momentDate) => momentDate.format('YYYY/MM/DD');

export const endOfPeriod = (momentDate, period) => momentDate.clone().endOf(period);
