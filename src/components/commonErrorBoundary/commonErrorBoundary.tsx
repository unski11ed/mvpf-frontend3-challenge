import React from 'react';
import styled from '@emotion/styled';

import { Box } from '../box';
import { Typography } from '../typography';

const ErrorContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ErrorBox = styled(Box)`
  text-align: center;
  max-width: 470px;
`;

export interface CommonErrorBoundaryProps {
  children: React.ReactNode;
}

export class CommonErrorBoundary extends React.Component<
  CommonErrorBoundaryProps,
  { errorMessage: string | null }
> {
  constructor(props: CommonErrorBoundaryProps) {
    super(props);

    this.state = { errorMessage: null };
  }

  static getDerivedStateFromError(error: any) {
    return { errorMessage: error.message as string };
  }

  render() {
    const { errorMessage } = this.state;
    const { children } = this.props;
    if (errorMessage) {
      return (
        <ErrorContainer>
          <ErrorBox>
            <Typography type="h1">OOPS, something went wrong</Typography>
            <Typography type="subtitle">
              There was some unexpected problem, please try to refresh page, or
              contact support if the problem persists.
            </Typography>
            <Typography type="subtitle">Details: {errorMessage}</Typography>
          </ErrorBox>
        </ErrorContainer>
      );
    }
    return children;
  }
}
