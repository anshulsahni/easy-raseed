export const isNull = value => value === null;

// TODO: fix this function for array value
// it should return false for but it return true
export const isObject = value => !isNull(value) && typeof value === 'object';
