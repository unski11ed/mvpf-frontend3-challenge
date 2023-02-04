import fetch from 'cross-fetch';
import { useQuery } from 'react-query';

import config from '@app/config';
import { Project } from '@app/types';

export const fetchProjects = (): Promise<Project[]> =>
  fetch(config.projectsApiUrl)
    .then((res) => res.json())
    .then((res) => res.data);

export const useProjects = () => useQuery('projects', fetchProjects);
