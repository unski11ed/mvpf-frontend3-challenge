import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';
import { Box } from '../box';
import { UnstyledButton } from '../unstyledButton';

const AccordionItemWrap = styled(Box)`
  + * {
    margin-top: ${({ theme }) => theme.components.accordion.itemsGap};
  }
`;

const AccordionItemTitle = styled(UnstyledButton)(
  ({ theme }) => `
  border-radius: ${theme.components.accordion.itemRadius};
  background: ${theme.components.accordion.itemBackground};
  font-weight: ${theme.components.accordion.itemFontWeight};
  font-size: ${theme.components.accordion.itemFontSize};
  padding: ${theme.components.accordion.itemPadding};
  display: block;
  width: 100%;
  text-align: left;
`
);

const AccordionItemContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<{ collapsed?: boolean }>(
  ({ collapsed, theme }) => `
  margin-top: ${theme.components.accordion.contentMargin};
  margin-bottom: calc(${theme.components.accordion.contentMargin} - ${
    theme.components.accordion.itemsGap
  });
  display: ${collapsed ? 'none' : 'block'};
`
);

export interface AccordionItemProps extends StylableComponentProps {
  children: React.ReactNode;
  title: React.ReactNode | string;
  id: string;
  onSelected?: (id: string) => void;
  collapsed?: boolean;
}

export const AccordionItem = ({
  children,
  title,
  id,
  onSelected,
  collapsed,
  ...styleProps
}: AccordionItemProps) => (
  <AccordionItemWrap {...styleProps}>
    <AccordionItemTitle
      onClick={() => {
        if (onSelected) {
          onSelected(id);
        }
      }}
    >
      {title}
    </AccordionItemTitle>
    <AccordionItemContent collapsed={collapsed}>
      {children}
    </AccordionItemContent>
  </AccordionItemWrap>
);
