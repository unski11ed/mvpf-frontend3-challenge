export default {
  reportsApiUrl: `${process.env.NEXT_PUBLIC_API_URL as string}/report`,
  projectsApiUrl: `${process.env.NEXT_PUBLIC_API_URL as string}/projects`,
  gatewaysApiUrl: `${process.env.NEXT_PUBLIC_API_URL as string}/gateways`,
  apiMocking: !!process.env.NEXT_PUBLIC_API_MOCKING,
};
