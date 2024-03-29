import styled from 'styled-components';

import { theme } from '../../design-system/tokens.js';
import BaseButton from './BaseButton.jsx';

const RectButton = styled(BaseButton)`
  height: 35px;
  width: 140px;
  padding: 10px 20px
  box-sizing: border-box;
`;
export default RectButton;

export const PrimaryRecButton = styled(RectButton)`
  background-color: ${theme.buttons.background.primary};
  color: ${theme.buttons.text.primary};
`;
