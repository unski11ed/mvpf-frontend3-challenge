import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';

const StyledH1 = styled.h1(
  ({ theme: { typography } }) => `
  font-size: ${typography.h1.fontSize};
  font-weight: ${typography.h1.fontWeight};
  font-weight: ${typography.h1.color};
  line-height: ${typography.h1.lineHeight};
`
);

const StyledSubtitle = styled.p(
  ({ theme: { typography } }) => `
  font-weight: ${typography.subtitle.fontWeight};
  font-weight: ${typography.subtitle.color};
  line-height: ${typography.subtitle.lineHeight};
  color: ${typography.subtitle.color}
  margin-bottom: 0;
`
);

const StyledBody = styled.span(
  ({ theme: { typography } }) => `
  font-weight: ${typography.body.fontWeight};
  line-height: ${typography.body.lineHeight};
`
);

export interface TypographyProps extends StylableComponentProps {
  children?: React.ReactNode | string;
  type?: 'body' | 'h1' | 'subtitle' | 'paragraph';
}

export const Typography = ({ type, ...childProps }: TypographyProps) => {
  switch (type) {
    case 'h1':
      return <StyledH1 {...childProps} />;
    case 'subtitle':
      return <StyledSubtitle {...childProps} />;
    case 'body':
    default:
      return <StyledBody {...childProps} />;
  }
};
