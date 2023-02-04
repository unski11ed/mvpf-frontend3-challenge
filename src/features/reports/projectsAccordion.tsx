import React, { useState } from 'react';

import { Gateway, Payment, Project, StylableComponentProps } from '@app/types';
import { Accordion, AccordionItem } from '@app/components';
import { SummaryHeader } from './summaryHeader';
import { AccordionPaymentsTable } from './accordionPaymentsTable';
import filteredPayments from './filteredPayments';

export interface ProjectsAccordionProps extends StylableComponentProps {
  payments: Payment[];
  projects: Project[];
  gateways: Gateway[];
  gatewayId?: string;
}

export const ProjectsAccordion = ({
  payments,
  projects,
  gateways,
  gatewayId,
  ...styleProps
}: ProjectsAccordionProps) => {
  const [openProjectId, setOpenProjectId] = useState(
    projects[0]?.projectId ?? ''
  );

  return (
    <Accordion
      activeId={openProjectId}
      onActiveIdChange={setOpenProjectId}
      {...styleProps}
    >
      {projects.map((project) => {
        const projectPayments =
          filteredPayments(payments, { projectId: project.projectId }) ?? [];

        return projectPayments.length > 0 ? (
          <AccordionItem
            key={project.projectId}
            id={project.projectId}
            title={
              <SummaryHeader
                title={project.name}
                total={projectPayments.reduce(
                  (acc, payment) => acc + payment.amount,
                  0
                )}
              />
            }
          >
            <AccordionPaymentsTable
              gateways={gateways}
              payments={projectPayments}
              gatewayId={gatewayId}
            />
          </AccordionItem>
        ) : null;
      })}
    </Accordion>
  );
};
