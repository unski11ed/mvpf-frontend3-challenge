import gatewaysHandler from './gateways';
import projectsHandler from './projects';
import paymentsHandler from './payments';

export default [...gatewaysHandler, ...projectsHandler, ...paymentsHandler];
