import React from 'react';
import styled from 'styled-components';

const StyledBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
`;

export default function BaseButton({ onClick, text = 'Submit', type = 'button', className }) {
  return (
    <StyledBtn onClick={onClick} className={className} type={type}>
      {text}
    </StyledBtn>
  );
}
