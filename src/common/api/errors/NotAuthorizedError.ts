import { ApiError } from './ApiError';

export class NotAuthorizedError extends ApiError {
  constructor() {
    super('Not authorized', 401);
  }
}
