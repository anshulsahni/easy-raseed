import React from 'react';
import styled from 'styled-components';

import TextInput from '../forms/TextInput.jsx';
import FieldGroup from '../forms/_elements/FieldGroup.js';
import EmailInput from '../forms/EmailInput.jsx';
import CheckboxInput from '../forms/CheckboxInput.jsx';

import { theme } from '../../design-system/tokens.js';

const WriteOwnerWrapper = styled.div`
  border: 1px solid ${theme.borders.secondary};
  margin-top: 5px;
  padding: 20px;
`;

export default function WriteOwner(values = {}) {
  return (
    <WriteOwnerWrapper>
      <h3>Owner Details</h3>
      <FieldGroup>

        <TextInput
          name="landlord.name"
          value={values.name}
          label="Name"
        />

        <TextInput
          name="landlord.pan"
          value={values.pan}
          label="PAN No."
        />

      </FieldGroup>

      <FieldGroup>
        <EmailInput
          value={values.email}
          name="landlord.email"
        />

        <CheckboxInput
          name="landlord.sendEmail"
          label="Send Email"
        />
      </FieldGroup>
    </WriteOwnerWrapper>
  )
}
