import staffRouter from './api/contexts/staff/router';
import authRouter, { authenticated } from './api/contexts/auth/index';

export default function routes(app) {
  app.use('/api/v1/staff', authenticated, staffRouter);
  app.use('/api/v1/auth', authRouter);
}
