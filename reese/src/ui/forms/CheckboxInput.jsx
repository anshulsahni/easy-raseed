import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';

import FieldWrapper from './_elements/FieldWrapper.js';
import Label from './_elements/Label.js';

export default function CheckboxInput({ value, name, label, ...props }) {
  return (
    <FieldWrapper>
      <AntCheckbox id={name} defaultChecked={value} name={name} {...props}>
        <Label htmlFor={name} inline>
          {label}
        </Label>
      </AntCheckbox>
    </FieldWrapper>
  );
}
