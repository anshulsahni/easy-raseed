import dayjs from 'dayjs';
import MinMax from 'dayjs/plugin/minMax.js';
import AppError, { INVALID_LOGIC_ERROR } from '../error/app-error.js';
import { arrayMap } from './array.js';

import { splitString, trimString } from './string.js';

dayjs.extend(MinMax);

export const monthList = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

export const MMMDateFormat = 'YYYY/MMM/DD';

export const dateObjFromInput = (inputDateString) => dayjs(inputDateString, 'YYYY/MM/DD');

export const getYMD = (dateObj) => dateObj.format('YYYY/MM/DD');

export const addPeriod = (date, quantity, period) => date.add(quantity, period);

export const minDate = (...dateObjs) => dayjs.min(...dateObjs);

export const getFirstDateOfMonth = (month, year) => dayjs(`${year}/${month}/01`, MMMDateFormat);

export const getLastDateOfMonth = (month, year) => getFirstDateOfMonth(month, year).endOf('month');

export const numberOfMonths = (startDate, endDate) => endDate.diff(startDate, 'month') + 1;

export const getMonthsBetween = (startDate, endDate, months = []) => {
  if (endDate.diff(startDate, 'month') < 0) {
    return months;
  }
  months.push(startDate.format('MMM').toLowerCase());
  return getMonthsBetween(startDate.add(1, 'month'), endDate, months);
};

export const getMonthNYear = (monthString) => arrayMap(splitString(monthString, ','), trimString);

export const getMonthFromIndex = (index) => {
  const month = monthList[index];

  if (month) {
    return month;
  }
  throw new AppError(INVALID_LOGIC_ERROR, 'Invalid month index passed');
};
