import React, { useState } from 'react';
import styled from 'styled-components';

import NumberInput from '../forms/NumberInput.jsx';
import Dropdown from '../forms/Dropdown.jsx'
import { MonthInput, QuarterInput, YearInput } from '../forms/DateInput.jsx';
import FieldGroup from '../forms/_elements/FieldGroup.js';
import { Container } from '../layout/grid';

var StyledDiv;

const DEFAULT_PERIOD = 'monthly';

const getRentInputLabel = (period) => {
  const label = 'Rent Amount';

  switch (period) {
    case 'monthly':
      return label + '(Per Month)';
    case 'quaterly':
      return label + '(Per Quarter)';
    case 'yearly':
      return label + '(Per Year)';
    default:
      return label;
  }
}

const periodOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quaterly', label: 'Quaterly' },
  { value: 'yearly', label:'Yearly' },
];

export default function WriteReceipt({
  index,
  onExtraValueChange,
}) {
  const [period, setPeriod] = useState('monthly');
  const [dateRange, setDateRange] = useState([]);

  const periodFieldName = `receipts.${index}.period`;
  const dateRangeFieldName = `receipts.${index}.dateRange`;

  function onPeriodChangeInternal(newPeriod) {
    setPeriod(newPeriod);
    onExtraValueChange(newPeriod, periodFieldName);
  }

  function onDateRangeChange([startDate, endDate]){
    setDateRange([startDate, endDate]);
    onExtraValueChange({startDate, endDate}, dateRangeFieldName);
  }

  return (
    <StyledDiv>
        <Container>
          <FieldGroup>
            <Dropdown
              options={periodOptions}
              onChange={onPeriodChangeInternal}
              value={period}
              label="Select Rental Period"
              name={periodFieldName}
            />

            <NumberInput
              label={getRentInputLabel(period)}
              name={`receipts.${index}.amount`}
            />

          </FieldGroup>

          {renderDateSelect({
            period,
            dateRangeFieldName,
            onDateRangeChange,
            dateRange,
          })}
        </Container>
    </StyledDiv>
  );
}

function renderDateSelect({
  period,
  dateRangeFieldName,
  onDateRangeChange,
  dateRange,
}) {
  let SelectDateComponent;
  switch(period) {
    case 'monthly':
      SelectDateComponent=MonthInput;
      break;
    case 'quaterly':
      SelectDateComponent=QuarterInput;
      break;
    case 'yearly':
      SelectDateComponent=YearInput;
      break;
  }

  return  (
    <SelectDateComponent
      name={dateRangeFieldName}
      onChange={onDateRangeChange}
      label="Select Period"
      value={dateRange}
    />
  );
}

StyledDiv = styled.div`
  border: 1px solid black;
  padding: 20px;
`;
