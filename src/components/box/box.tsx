import React from 'react';

import StylableComponent from '@app/types/stylableComponent';

// Note: Just to abstract away the html components, and use the
// projects atomic components
export interface BoxProps extends StylableComponent {
  children: React.ReactNode;
}

export const Box = ({ ...props }: BoxProps) => <div {...props} />;
