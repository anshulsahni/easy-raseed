import React, { useState } from 'react';
import { Input as AntInput } from 'antd';

import ErrorMsg from './_elements/ErrorMsg.js';
import FieldWrapper from './_elements/FieldWrapper.js';
import Label from './_elements/Label.js';

export default function TextInput({ value, validate, name, label, ...props }) {
  const [error, setError] = useState('');

  const onBlur = (event) => {
    setError(validate(event.target.value));
  };

  return (
    <FieldWrapper>
      {label && <Label htmlFor={name}>{label}</Label>}

      <AntInput defaultValue={value} id={name} name={name} onBlur={validate && onBlur} {...props} />

      {error && <ErrorMsg>{error}</ErrorMsg>}
    </FieldWrapper>
  );
}
