export { range as arrayRange } from 'lodash';
export { flatten as arrayFlatten } from 'lodash';

export function arrayReduce(array = [], iterator, initialValue) {
  return array.reduce(iterator, initialValue);
}

export function arrayMap(array = [], iterator) {
  return array.map(iterator);
}
