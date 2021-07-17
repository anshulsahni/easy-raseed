import React, { useState } from 'react';

import { isPromise, isObjectOrArray, isLikeNumber } from '../../utils/types.js';
import { stringSplit } from '../../utils/string.js';
import { deepCloneObject } from '../../utils/object.js';

const contextIntitVal = {
  pending: true,
};

export const FormContext = React.createContext(contextIntitVal);

export default function Form({ children, onSubmit, initialValues = {} }) {
  const [values, setValues] = useState(initialValues);
  const [pending, setPending] = useState(false);

  function onChange(event) {
    const { name, value, checked, type, id } = event.target;

    const fieldName = name || id;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues((oldValues) => getNewValues(oldValues, fieldName, fieldValue));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = onSubmit(event, values);
    if (isPromise(result)) {
      setPending(true);

      result.finally(() => {
        setPending(false);
      });
    }

    return result;
  }

  return (
    <FormContext.Provider value={{ pending }}>
      <form onSubmit={handleSubmit} onChange={onChange}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export function getNewValues(oldValues = {}, fieldName = '', fieldValue) {
  const fieldNameParts = stringSplit(fieldName, '.');

  const newValues = deepCloneObject(oldValues);
  const lastPart = toNumberIfLikeNumber(fieldNameParts.pop());

  let values = newValues;
  let part = fieldNameParts.shift();
  while (part) {
    part = toNumberIfLikeNumber(part);

    if (!isObjectOrArray(values[part])) {
      values[part] = isLikeNumber(fieldNameParts[0]) ? [] : {};
    }
    values = values[part];

    part = fieldNameParts.shift();
  }

  values[lastPart] = fieldValue;

  return { ...newValues };
}

function toNumberIfLikeNumber(value) {
  return isLikeNumber(value) ? Number(value) : value;
}
