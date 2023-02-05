import { rest } from 'msw';

import { Gateway, ServerResponse } from '@app/types';
import config from '@app/config';

import gatewaysFixture from '../fixtures/gateways.json';

const handlers = [
  rest.get<ServerResponse<Gateway[]>>(
    config.gatewaysApiUrl,
    async (req, res, ctx) => {
      return res(ctx.json(gatewaysFixture));
    }
  ),
];

export default handlers;
