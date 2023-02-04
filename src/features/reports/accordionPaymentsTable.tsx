import styled from '@emotion/styled';

import { PaymentsTable, PaymentsTableProps } from './paymentsTable';

export type AccordionPaymentsTableProps = PaymentsTableProps;

export const AccordionPaymentsTable = styled(PaymentsTable)(
  ({ theme }) => `
  margin-left: calc(${theme.spacing(3)} - ${theme.spacing(1)});
  margin-right: calc(${theme.spacing(3)} - ${theme.spacing(1)});
  max-height: calc(100vh - 480px);
  overflow: auto;

  thead {
    position: sticky;
    top: 0;
  }
`
);
