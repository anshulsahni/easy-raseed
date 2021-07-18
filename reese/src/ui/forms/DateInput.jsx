import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';

import Label from './_elements/Label.js';
import FieldWrapper from './_elements/FieldWrapper.js';

const AntDateRangePicker = AntDatePicker.RangePicker;

export function QuarterInput(props) {
  return _DateInput({
    picker: 'quarter',
    ...props,
  });
}

export function MonthInput(props) {
  return _DateInput({
    picker: 'month',
    ...props,
  });
}

export function YearInput(props) {
  return _DateInput({
    picker: 'year',
    ...props,
  });
}

function _DateInput({ type, validate, name, label, ...props }) {
  return (
    <FieldWrapper>
      {label && <Label htmlFor={name}>{label}</Label>}

      <AntDateRangePicker name={name} id={name} style={{ width: '100%' }} size="large" {...props} />
    </FieldWrapper>
  );
}
