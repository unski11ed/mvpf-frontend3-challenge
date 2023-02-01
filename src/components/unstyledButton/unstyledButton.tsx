import React from 'react';

import styled from '@emotion/styled';

export interface UnstyledButtonProps
  extends React.HTMLProps<HTMLButtonElement> {}

export const UnstyledButton = styled.button`
  background: none;
  appearance: none;
  border: none;
  outline: none;
  cursor: pointer;
`;
