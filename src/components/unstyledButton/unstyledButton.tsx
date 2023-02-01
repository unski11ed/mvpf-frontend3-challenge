import React from 'react';

import styled from '@emotion/styled';

export interface UnstyledButtonProps
  extends React.HTMLProps<HTMLButtonElement> {}

const Button = styled.button`
  background: none;
  appearance: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const UnstyledButton = (props: UnstyledButtonProps) => (
  <Button type="button" {...props} />
);
