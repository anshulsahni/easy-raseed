import styled from 'styled-components';

import { theme } from '../../../design-system/tokens.js';

const ErrorMsg = styled.span`
  color: ${theme.forms.text.negative};
  font-size: 12px;
`;

export default ErrorMsg;
