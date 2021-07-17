import React, { useState } from 'react';
import { Select as AntSelect } from 'antd';

import ErrorMsg from './_elements/ErrorMsg.js';
import FieldWrapper from './_elements/FieldWrapper.js';
import Label from './_elements/Label.js';

const AntOption = AntSelect.Option;

export default function Dropdown({
  value,
  validate,
  name,
  label,
  options = [],
  ...props
}) {
  const [error, setError] = useState('');

  const onBlur = (event) => {
    if (validate) {
      setError(validate(event.target.value))
    }
  };

  return (
    <FieldWrapper>
      {label && (
        <Label htmlFor={name}>
          {label}
        </Label>
      )}

      <AntSelect
        defaultValue={value}
        name={name}
        id={name}
        style={{ width: '100%' }}
        size="large"
        onBlur={onBlur}
        {...props}
      >
        {options.map((option, index) => (
          <AntOption
            value={option.value}
            key={`${option.value}_${index}`}
          >
            {option.label}
          </AntOption>
        ))}
      </AntSelect>

      {error && <ErrorMsg>{error}</ErrorMsg>}
    </FieldWrapper>

  );
}
