import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';

import { ReportFiltersState, StylableComponentProps } from '@app/types';
import { useGateways } from '@app/hooks/useGateways';
import { useProjects } from '@app/hooks/useProjects';
import { Box, Form, Field, Select, DateInput, Button } from '@app/components';

const FiltersWrap = styled(Box)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  > * + * {
    margin-left: ${theme.spacing(2)};
  }
  ${theme.breakpoints.down('sm')} {
    flex-wrap: wrap;
    margin: 0 -${theme.spacing(1)};

    > * {
      padding: ${theme.spacing(1)};
      flex-basis: calc(50% - ${theme.spacing(2)});

      + * {
        margin-left: 0;
      }
    }
  }
`
);

const ButtonWrap = styled(Box)`
  > * {
    width: 100%;
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
  const { t } = useTranslation('reports');
  const { data: gateways } = useGateways();
  const { data: projects } = useProjects();

  const changeHandler = (filters: ReportFiltersState) => {
    const { from, to, ...other } = filters;
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      if (toDate < fromDate) {
        return {
          from,
          ...other,
        };
      }
    }
    return filters;
  };

  return (
    <Form<ReportFiltersState>
      initialData={initialFilters}
      onSubmit={onChange}
      onChange={changeHandler}
      data-testid="report-filters"
    >
      <FiltersWrap {...stylableProps}>
        <Field name="projectId">
          {(fieldProps) => (
            <Select {...fieldProps}>
              <option value="">{t('filters.allProjects')}</option>
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
              <option value="">{t('filters.allGateways')}</option>
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
              placeholder={t('filters.fromDatePh')}
              selectedTemplate={(value) =>
                `${t('filters.fromSelected')} ${value}`
              }
              minDate="2021-01-01"
              maxDate="2021-12-31"
            />
          )}
        </Field>
        <Field name="to">
          {(fieldProps, formData) => (
            <DateInput
              {...fieldProps}
              placeholder={t('filters.toDatePh')}
              selectedTemplate={(value) =>
                `${t('filters.toSelected')} ${value}`
              }
              minDate={formData.from ? formData.from : '2021-12-01'}
              maxDate="2021-12-31"
            />
          )}
        </Field>

        <ButtonWrap>
          <Button type="submit">{t('filters.apply')}</Button>
        </ButtonWrap>
      </FiltersWrap>
    </Form>
  );
};
