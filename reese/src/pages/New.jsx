import React, { useState } from "react";
import styled from 'styled-components';

import CreateReceipt from '../ui/receipt/Create.jsx';
import WriteTenant from '../ui/tenant/Write.jsx';
import WriteOwner from '../ui/owner/Write.jsx';
import Form from '../ui/forms/Form.jsx';
import { PrimaryRoundButton } from '../ui/buttons/RoundButton.jsx';
import { PrimarySubmitButton } from '../ui/forms/SubmitButton.jsx';
import { Page } from '../ui/layout/grid.js';

import { arrayRange } from '../utils/array.js';
import { getNewValues } from '../ui/forms/Form.jsx';

let AddBtnWrapper;
let CreateReceiptWrapper;

export default function NewPage() {
  const [receiptsCount, setReciptsCount] = useState(1);
  const [extraValues, setExtraValues] = useState({});

  function onAdd() {
    setReciptsCount(receiptsCount+1);
  }

  function onExtraValueChange(newValue, name) {
    const newExtraValues = getNewValues(extraValues, name, newValue);
    setExtraValues({...newExtraValues});
  }

  function onSubmit(_, values) {
    console.log({
      ...values,
      ...extraValues,
    });
  }

  return (
    <Page>
      <Form onSubmit={onSubmit}>
        <WriteTenant/>
        <WriteOwner/>
        {arrayRange(receiptsCount).map(index => (
          <CreateReceiptWrapper
            key={`${index}`}
          >
            <CreateReceipt
              onExtraValueChange={onExtraValueChange}
              index={index}
            />
          </CreateReceiptWrapper>
        ))}

        <AddBtnWrapper>
          <PrimaryRoundButton
            text="Add"
            onClick={onAdd}
          />
        </AddBtnWrapper>

        <PrimarySubmitButton
          type="submit"
          text="Create"
          pendingText="Creating..."
          onClick={(event) => { console.log(event) }}
        />
      </Form>
    </Page>
  );
}

AddBtnWrapper = styled.div`
  text-align: right;
  margin-top: 10px;
`;

CreateReceiptWrapper = styled.div`
  margin-top: 10px;
`;
