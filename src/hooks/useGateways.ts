import fetch from 'cross-fetch';
import { useQuery } from 'react-query';

import config from '@app/config';
import { Gateway } from '@app/types';

export const fetchGateways = (): Promise<Gateway[]> =>
  fetch(config.gatewaysApiUrl)
    .then((res) => res.json())
    .then((res) => res.data);

export const useGateways = () => useQuery('gateways', fetchGateways);
