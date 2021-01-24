export const isNull = value => value === null;

export const isObject = value => !isNull(value) && typeof value === 'object';
