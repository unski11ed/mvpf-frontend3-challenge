import React from 'react';
import { Global, css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';

import { Box } from '../box/box';

const LayoutWrap = styled(Box)(
  ({ theme }) => `
  height: 100vh;
  max-width: 100vw;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: ${theme.components.appBar.height} auto;
  grid-template-areas:
    'navbar navbar'
    'sidebar content';

  ${theme.breakpoints.down('md')} {
    grid-template-columns: auto;
    grid-template-areas:
      'navbar'
      'content';
  }
`
);

export interface MainLayoutProps extends StylableComponentProps {
  children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  const theme = useTheme();

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            background: ${theme.palette.background.default};
            color: ${theme.palette.text.default};
            font-family: ${theme.typography.fontFamily};
            font-size: ${theme.typography.fontSize};
            margin: 0;
            padding: 0;
          }
        `}
      />
      <LayoutWrap {...props} />
    </>
  );
};
