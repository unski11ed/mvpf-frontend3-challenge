import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';
import { Box, Typography, Avatar } from '@app/components';

// NOTE: Normally this should be logged in user data fetched from server
// so it should techincally be a feature, not a dumb component
const NAME = 'John Doe';

const LoggedInUserWrap = styled(Box)`
  display: flex;
  align-items: center;
  > * + * {
    margin-left: ${({ theme }) => theme.spacing(1.5)};
  }
`;

export interface LoggedInUserProps extends StylableComponentProps {}

export const LoggedInUser = (styleProps: LoggedInUserProps) => (
  <LoggedInUserWrap {...styleProps}>
    <Avatar name={NAME} />
    <Typography>{NAME}</Typography>
  </LoggedInUserWrap>
);
