import React from 'react';
import styled from 'styled-components';

import TextInput from '../forms/TextInput.jsx';
import EmailInput from '../forms/EmailInput.jsx';
import CheckboxInput from '../forms/CheckboxInput.jsx';
import FieldGroup from '../forms/_elements/FieldGroup.js';

import { theme } from '../../design-system/tokens.js';

const WriteTenantWrapper = styled.div`
  border: 1px solid ${theme.borders.secondary};
  margin-top: 5px;
  padding: 20px;
`;

export default function WriteTenant(values = {}) {
  return (
    <WriteTenantWrapper>
      <h3>Tenant Details</h3>
      <TextInput name="tenant.name" value={values.name} label="Name" />

      <FieldGroup>
        <EmailInput value={values.email} name="tenant.email" />

        <CheckboxInput name="tenant.sendEmail" label="Send Email" />
      </FieldGroup>
    </WriteTenantWrapper>
  );
}
