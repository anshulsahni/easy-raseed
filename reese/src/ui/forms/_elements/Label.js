import styled from 'styled-components';

import { theme } from '../../../design-system/tokens.js';

const Label = styled.label`
  color: ${theme.forms.text.primary};
  font-size: 14px;
  display: block;
  margin-bottom: 2px;
  ${(props) => (props.inline ? 'display: inline-block;' : '')}
`;

export default Label;
