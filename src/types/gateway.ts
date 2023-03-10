import { Project, ProjectWithPayments } from './project';

export type Gateway = {
  gatewayId: string;
  userIds: string[];
  name: string;
  type: string;
  apiKey: string;
  secondaryApiKey: string;
  description: string;
};

export type GatewayWithProjects<TProject = Project | ProjectWithPayments> =
  Gateway & {
    projects: TProject[];
  };
