import styled from 'styled-components';
import { theme } from '../../design-system/tokens.js';

import BaseButton from './BaseButton.jsx';

const RoundButton = styled(BaseButton)`
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;

export const PrimaryRoundButton = styled(RoundButton)`
  background-color: ${theme.buttons.background.primary};
  color: ${theme.buttons.text.primary};
`;
