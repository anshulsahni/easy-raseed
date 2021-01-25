import forOwn from 'lodash.forown';
import omit from 'lodash.omit';

import { isObject } from './type.js'

export const omitRecursive = (object, props = []) => {
  let newObject = omit(object, props);
  forOwn(newObject, (value, key) => {
    if (isObject(value)) {
      newObject[key] = omit(value, props);
    }
  });

  return newObject;
}
