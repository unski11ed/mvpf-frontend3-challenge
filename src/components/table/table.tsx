import React from 'react';
import styled from '@emotion/styled';

import { StylableComponentProps } from '@app/types';

export interface TableProps extends StylableComponentProps {
  children: React.ReactNode;
}

export const Table = styled.table(
  ({ theme }) => `
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: ${theme.components.table.cellPadding};
    text-align: center;
    border: none;

    :first-of-type {
      text-align: left;
    }
    :last-of-type {
      text-align: right;
    }
  }
  th {
    font-weight: normal;
    background-color: ${theme.components.table.headBackground};
  }
  tr:nth-of-type(odd) {
    background-color: ${theme.components.table.oddRowBackground};
  }
  tr:nth-of-type(even) {
    background-color: ${theme.components.table.evenRowBackground};
  }
`
);
