import React, { useState } from 'react';
import { Gateway, Payment, StylableComponentProps } from '@app/types';
import { Accordion, AccordionItem } from '@app/components';

import { SummaryHeader } from './summaryHeader';
import { AccordionPaymentsTable } from './accordionPaymentsTable';

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
      {gateways.map((gateway) => (
        <AccordionItem
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
            payments={payments}
            projectId={projectId}
            gatewayId={gateway.gatewayId}
          />
        </AccordionItem>
      ))}
    </Accordion>
  );
};
