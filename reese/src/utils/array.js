export { range as arrayRange } from 'lodash';

export function arrayReduce(array = [], iterator, initialValue) {
  return array.reduce(iterator, initialValue);
}
