import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';
import { Box } from '../box';

import type { AccordionItemProps } from './accordionItem';

const AccordionWrap = styled(Box)``;

export interface AccordionProps extends StylableComponentProps {
  children: React.ReactNode;
  activeId: string;
  onActiveIdChange: (newId: string) => void;
}

export const Accordion = ({
  activeId,
  children,
  onActiveIdChange,
  ...otherProps
}: AccordionProps) => {
  const extendedChildren = React.Children.toArray(children)
    .filter<React.ReactElement<AccordionItemProps>>(React.isValidElement)
    .map((child) =>
      React.cloneElement(child, {
        collapsed: activeId !== child.props.id,
        onSelected: onActiveIdChange,
      })
    );
  return <AccordionWrap {...otherProps}>{extendedChildren}</AccordionWrap>;
};
