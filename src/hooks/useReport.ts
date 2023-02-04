import fetch from 'cross-fetch';
import { useQuery } from 'react-query';

import config from '@app/config';
import { Payment, ReportFiltersState } from '@app/types';

export const fetchReport = (filters: ReportFiltersState): Promise<Payment[]> =>
  fetch(config.reportsApiUrl, {
    method: 'POST',
    body: JSON.stringify(filters),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);

export const useReport = (filters: ReportFiltersState) =>
  useQuery(['payments', filters], () => fetchReport(filters));
