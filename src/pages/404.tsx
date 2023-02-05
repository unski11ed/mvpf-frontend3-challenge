import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import { Box } from '@app/components';

const PageWrap = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function NotFound() {
  return (
    <PageWrap>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Go back home</Link>
    </PageWrap>
  );
}
