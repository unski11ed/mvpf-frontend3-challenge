import React, { useState } from 'react';
import { Gateway, Payment, StylableComponentProps } from '@app/types';
import { Accordion, AccordionItem } from '@app/components';

import { SummaryHeader } from './summaryHeader';
import { AccordionPaymentsTable } from './accordionPaymentsTable';
import filteredPayments from './filteredPayments';

export interface GatewayAccordionProps extends StylableComponentProps {
  payments: Payment[];
  gateways: Gateway[];
  projectId?: string;
}

export const GatewayAccordion = ({
  payments,
  gateways,
  projectId,
  ...styleProps
}: GatewayAccordionProps) => {
  const [openGatewayId, setOpenGatewayId] = useState(
    gateways[0]?.gatewayId ?? ''
  );

  return (
    <Accordion
      activeId={openGatewayId}
      onActiveIdChange={setOpenGatewayId}
      {...styleProps}
    >
      {gateways.map((gateway) => {
        const gatewayPayments =
          filteredPayments(payments, {
            projectId,
            gatewayId: gateway.gatewayId,
          }) ?? [];

        return gatewayPayments.length > 0 ? (
          <AccordionItem
            data-testid="report-payment-accordion-item"
            key={gateway.gatewayId}
            id={gateway.gatewayId}
            title={
              <SummaryHeader
                title={gateway.name}
                total={payments
                  .filter(
                    (payment) =>
                      payment.gatewayId === gateway.gatewayId &&
                      payment.projectId === projectId
                  )
                  .reduce((acc, payment) => acc + payment.amount, 0)}
              />
            }
          >
            <AccordionPaymentsTable
              gateways={gateways}
              payments={gatewayPayments}
              projectId={projectId}
              gatewayId={gateway.gatewayId}
            />
          </AccordionItem>
        ) : null;
      })}
    </Accordion>
  );
};
