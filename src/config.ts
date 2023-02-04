import urlJoin from 'url-join';

export default {
  reportsApiUrl: urlJoin(process.env.NEXT_PUBLIC_API_URL as string, 'report'),
  projectsApiUrl: urlJoin(
    process.env.NEXT_PUBLIC_API_URL as string,
    'projects'
  ),
  gatewaysApiUrl: urlJoin(
    process.env.NEXT_PUBLIC_API_URL as string,
    'gateways'
  ),
};
