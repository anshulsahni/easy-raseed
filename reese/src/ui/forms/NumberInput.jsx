import React, { useState } from 'react';
import styled from 'styled-components';
import {
  InputNumber as AntNumberInput,
} from 'antd';

import { theme } from '../../design-system/tokens.js';

import Label from './_elements/Label.js';
import ErrorMsg from './_elements/ErrorMsg.js';
import FieldWrapper from './_elements/FieldWrapper.js';

import 'antd/dist/antd.css';

let StyledInput;

export default function NumberInput({
  value,
  validate,
  name,
  label,
}) {
  const [error, setError] = useState('');

  const onBlur = (event) => {
    if (validate) {
      setError(validate(event.target.value));
    }
  };

  return (
    <FieldWrapper>
      {label && (
        <Label htmlFor={name}>
          {label}
        </Label>
      )}

      <AntNumberInput
        min={0}
        step={1000}
        onBlur={onBlur}
        defaultValue={value}
        name={name}
        id={name}
        size="large"
        style={{ width: '100%' }}
      />

      {error && <ErrorMsg>{error}</ErrorMsg>}
    </FieldWrapper>

  )
}

StyledInput = styled.input`
  width: 100%;
  border-style: none;
  border-bottom: 1px solid ${theme.forms.border.primary};
`;
