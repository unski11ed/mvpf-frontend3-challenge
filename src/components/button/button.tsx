import styled from '@emotion/styled';

import { UnstyledButtonProps, UnstyledButton } from '../unstyledButton';

export interface ButtonProps extends UnstyledButtonProps {}

export const Button = styled(UnstyledButton)(
  ({ theme }) => `
  background-color: ${theme.components.button.backgroundColor};
  padding: ${theme.components.button.padding};
  color: ${theme.components.button.color};
  border-radius: ${theme.components.button.radius};

  :hover {
    background-color: ${theme.components.button.backgroundColorHighlight}';
  }
`
);
