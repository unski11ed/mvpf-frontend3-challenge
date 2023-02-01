import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';
import { Box } from '../box';

const AvatarWrap = styled(Box)(
  ({
    theme: {
      components: { avatar: avatarTheme },
    },
  }) => `
  background-color: ${avatarTheme.background};
  width: ${avatarTheme.size};
  height: ${avatarTheme.size};
  color: ${avatarTheme.textColor};
  border-radius: ${avatarTheme.radius};
  font-size: ${avatarTheme.fontSize};
  font-weight: ${avatarTheme.fontWeight};
  display: flex;
  align-items: center;
  justify-content: center;
`
);

export interface AvatarProps extends StylableComponentProps {
  name: string;
}
export const Avatar = ({ name }: AvatarProps) => {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

  return <AvatarWrap>{initials}</AvatarWrap>;
};
