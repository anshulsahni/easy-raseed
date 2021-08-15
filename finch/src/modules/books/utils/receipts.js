import { arrayMap, flattenArray } from '../../../helpers/array.js';
import {
  getFirstDateOfMonth,
  getLastDateOfMonth,
  getMonthNYear,
  getMonthsBetween,
} from '../../../helpers/time.js';

const typePeriodMap = {
  monthly: getMonthlyReceipts,
  quarterly: getQuarterlyReceipts,
  yearly: getYearlyReceipts,
};

export function getReceipts(rentalData) {
  return flattenArray(
    arrayMap(rentalData, ({ type, ...otherReceiptDetails }) =>
      typePeriodMap[type](otherReceiptDetails),
    ),
  );
}

function getMonthlyReceipts({ startMonth: startMonthNYear, endMonth: endMonthNYear, amount }) {
  const startDate = getFirstDateOfMonth(startMonthNYear);
  const endDate = getFirstDateOfMonth(endMonthNYear);

  const [, startYear] = getMonthNYear(startMonthNYear);
  const [, endYear] = getMonthNYear(endMonthNYear);

  return arrayMap(getMonthsBetween(startDate, endDate), (month) => {
    return {
      startDate: getFirstDateOfMonth(`${month}, ${startYear}`),
      endDate: getLastDateOfMonth(`${month}, ${endYear}`),
      amount,
    };
  });
}

function getQuarterlyReceipts() {}

function getYearlyReceipts() {}
