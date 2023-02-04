import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';

const StyledH1 = styled.h1(
  ({ theme: { typography } }) => `
  font-size: ${typography.h1.fontSize};
  font-weight: ${typography.h1.fontWeight};
  line-height: ${typography.h1.lineHeight};
  margin-bottom: 0.5rem;
  margin-top: 0;
`
);

const StyledH4 = styled.h4(
  ({ theme: { typography } }) => `
  font-size: ${typography.h4.fontSize};
  font-weight: ${typography.h4.fontWeight};
  line-height: ${typography.h4.lineHeight};
  margin-bottom: 0.5rem;
  margin-top: 0;
`
);

const StyledSubtitle = styled.p(
  ({ theme: { typography } }) => `
  font-weight: ${typography.subtitle.fontWeight};
  line-height: ${typography.subtitle.lineHeight};
  color: ${typography.subtitle.color};
  margin-top: 0;
  margin-bottom: 1rem;
`
);

const StyledBody = styled.span(
  ({ theme: { typography } }) => `
  font-weight: inherit;
  line-height: ${typography.body.lineHeight};
`
);

export interface TypographyProps extends StylableComponentProps {
  children?: React.ReactNode | string;
  type?: 'body' | 'h1' | 'h4' | 'subtitle' | 'paragraph';
}

export const Typography = ({ type, ...childProps }: TypographyProps) => {
  switch (type) {
    case 'h1':
      return <StyledH1 {...childProps} />;
    case 'h4':
      return <StyledH4 {...childProps} />;
    case 'subtitle':
      return <StyledSubtitle {...childProps} />;
    case 'body':
    default:
      return <StyledBody {...childProps} />;
  }
};
