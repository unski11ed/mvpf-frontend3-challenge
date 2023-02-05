import { rest } from 'msw';

import { Project, ServerResponse } from '@app/types';
import config from '@app/config';

import projectsFixture from '../fixtures/projects.json';

const handlers = [
  rest.get<ServerResponse<Project[]>>(
    config.projectsApiUrl,
    async (req, res, ctx) => {
      return res(ctx.json(projectsFixture));
    }
  ),
];

export default handlers;
