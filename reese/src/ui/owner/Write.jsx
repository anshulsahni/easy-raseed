import React from 'react';
import styled from 'styled-components';

import TextInput from '../forms/TextInput.jsx';
import FieldGroup from '../forms/_elements/FieldGroup.js';
import EmailInput from '../forms/EmailInput.jsx';
import CheckboxInput from '../forms/CheckboxInput.jsx';

import { theme } from '../../design-system/tokens.js';
import FielGroup from '../forms/_elements/FieldGroup.js';

let WriteOwnerWrapper;

export default function WriteOwner(values = {}) {
  return (
    <WriteOwnerWrapper>
      <h3>Owner Details</h3>
      <FielGroup>

        <TextInput
          name="owner.name"
          value={values.name}
          label="Name"
        />

        <TextInput
          name="owner.pan"
          value={values.pan}
          label="PAN No."
        />

      </FielGroup>

      <FieldGroup>
        <EmailInput
          value={values.email}
          name="owner.email"
        />

        <CheckboxInput
          name="owner.sendEmail"
          label="Send Email"
        />
      </FieldGroup>
    </WriteOwnerWrapper>
  )
}

WriteOwnerWrapper = styled.div`
  border: 1px solid ${theme.borders.secondary};
  margin-top: 5px;
  padding: 20px;
`;
