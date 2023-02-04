import React from 'react';
import styled from '@emotion/styled';

import { ReportFiltersState, StylableComponentProps } from '@app/types';
import { useGateways } from '@app/hooks/useGateways';
import { useProjects } from '@app/hooks/useProjects';
import { Box, Form, Field, Select, DateInput, Button } from '@app/components';

const FiltersWrap = styled(Box)`
  display: flex;
  align-items: center;
  > * + * {
    margin-left: ${({ theme }) => theme.spacing(2)};
  }
`;

export interface ReportsFiltersProps extends StylableComponentProps {
  initialFilters: ReportFiltersState;
  onChange: (filters: ReportFiltersState) => void;
}

export const ReportFilters = ({
  initialFilters,
  onChange,
  ...stylableProps
}: ReportsFiltersProps) => {
  const { data: gateways } = useGateways();
  const { data: projects } = useProjects();

  return (
    <Form<ReportFiltersState> initialData={initialFilters} onSubmit={onChange}>
      <FiltersWrap {...stylableProps}>
        <Field name="projectId">
          {(fieldProps) => (
            <Select {...fieldProps}>
              <option value="">All Projects</option>
              {projects?.map(({ projectId, name }) => (
                <option value={projectId} key={projectId}>
                  {name}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field name="gatewayId">
          {(fieldProps) => (
            <Select {...fieldProps}>
              <option value="">All Gateways</option>
              {gateways?.map(({ gatewayId, name }) => (
                <option value={gatewayId} key={gatewayId}>
                  {name}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field name="from">
          {(fieldProps) => (
            <DateInput
              {...fieldProps}
              minDate="2021-01-01"
              maxDate="2021-12-31"
            />
          )}
        </Field>
        <Field name="to">
          {(fieldProps) => (
            <DateInput
              {...fieldProps}
              minDate="2021-01-01"
              maxDate="2021-12-31"
            />
          )}
        </Field>

        <Button type="submit">Generate Report</Button>
      </FiltersWrap>
    </Form>
  );
};
