import Payment from './payment';

export type Project = {
  projectId: string;
  userIds: string[];
  rule: string;
  gatewayIds: string[];
  structure: string;
  industry: string;
  website: string;
  description: string;
  image: string;
  name: string;
};

export type ProjectWithPayments = Project & {
  payments: Payment[];
};
