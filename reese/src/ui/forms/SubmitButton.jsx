import React, { useContext } from 'react';
import styled from 'styled-components';


import { theme } from '../../design-system/tokens.js';
import { FormContext } from '../forms/Form.jsx';
import RecButton from '../buttons/RectButton.jsx';

function SubmitButton({
  className,
  onClick,
  pendingText,
  text,
  ...props
}) {
  const { pending } = useContext(FormContext);
  return (
    <RecButton
      text={pending ? pendingText : text}
      className={className}
      type="submit"
      {...props}
    />
  )
}

export const PrimarySubmitButton = styled(SubmitButton)`
  background-color: ${theme.buttons.background.primary};
  color: ${theme.buttons.text.primary};
`;
