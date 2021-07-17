import React, { useState } from 'react';
import styled from 'styled-components';

import CreateReceipt from '../ui/receipt/Create.jsx';
import WriteTenant from '../ui/tenant/Write.jsx';
import WriteOwner from '../ui/owner/Write.jsx';
import Form, { getNewValues } from '../ui/forms/Form.jsx';
import { PrimaryRoundButton } from '../ui/buttons/RoundButton.js';
import { PrimarySubmitButton } from '../ui/forms/SubmitButton.jsx';
import { Page } from '../ui/layout/grid.js';

import { arrayRange, arrayMap, arrayFlatten } from '../utils/array.js';
import { objectMerge } from '../utils/object.js';
import { addPeriod, getYMDFormat, endOfPeriod } from '../utils/date.js';
import { addReceipt } from '../utils/api.js';

const AddBtnWrapper = styled.div`
  text-align: right;
  margin-top: 10px;
`;

const CreateReceiptWrapper = styled.div`
  margin-top: 10px;
`;

export default function NewPage() {
  const [receiptsCount, setReciptsCount] = useState(1);
  const [extraValues, setExtraValues] = useState({});

  function onAdd() {
    setReciptsCount(receiptsCount + 1);
  }

  function onExtraValueChange(newValue, name) {
    const newExtraValues = getNewValues(extraValues, name, newValue);
    setExtraValues({ ...newExtraValues });
  }

  function onSubmit(_, values) {
    const receiptsData = arrayMap(arrayRange(receiptsCount), (_val, index) =>
      objectMerge(values.receipts[index], extraValues.receipts[index]),
    );

    return addReceipt({
      ...values,
      receipts: getReceiptsFromRawData(receiptsData),
    });
  }

  return (
    <Page>
      <Form onSubmit={onSubmit}>
        <WriteTenant />
        <WriteOwner />
        {arrayRange(receiptsCount).map((index) => (
          <CreateReceiptWrapper key={`${index}`}>
            <CreateReceipt onExtraValueChange={onExtraValueChange} index={index} />
          </CreateReceiptWrapper>
        ))}

        <AddBtnWrapper>
          <PrimaryRoundButton text="Add" onClick={onAdd} />
        </AddBtnWrapper>

        <PrimarySubmitButton
          type="submit"
          text="Create"
          pendingText="Creating..."
          onClick={onSubmit}
        />
      </Form>
    </Page>
  );
}

const periodEntityMap = {
  monthly: 'months',
  quaterly: 'quarters',
  yearly: 'years',
};

function getReceiptsFromRawData(receiptsData) {
  return arrayFlatten(
    arrayMap(receiptsData, ({ dateRange: { startDate, endDate }, ...restData }) =>
      getReceipts({ startDate, endDate, ...restData }),
    ),
  );
}

function getReceipts({ startDate, endDate, period, amount }) {
  const periodEntity = periodEntityMap[period];
  startDate = startDate.startOf(periodEntity);
  endDate = endDate.endOf(periodEntity);
  const numberOfReceipts = endDate.diff(startDate, periodEntity) + 1;

  return arrayMap(arrayRange(numberOfReceipts), (receiptNumber) => {
    const currStartDate = addPeriod(startDate, receiptNumber, periodEntity);

    return {
      amount: Number(amount),
      startDate: getYMDFormat(currStartDate),
      endDate: getYMDFormat(endOfPeriod(currStartDate, periodEntity)),
    };
  });
}
