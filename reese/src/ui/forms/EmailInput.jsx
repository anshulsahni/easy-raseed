import React from 'react';

import TextInput from '../forms/TextInput.jsx';

export default function EmailInput(props) {
  return (
    <TextInput
      label="Email"
      addonBefore="@"
      {...props}
    />
  )
}
