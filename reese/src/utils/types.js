import isObject from 'lodash/isObject';
import toNumber from 'lodash/toNumber';
import isNaN from 'lodash/isNaN';

export const isPromise = (obj) => obj instanceof Promise;

export const isArray = (value) => Array.isArray(value);

export const isObjectOrArray = (value) => isObject(value) || isArray(value);

export const isLikeNumber = (value) => !isNaN(toNumber(value));
