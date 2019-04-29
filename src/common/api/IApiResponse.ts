import IApiErrorResponse from './IApiErrorResponse';

export default interface IApiResponse<T = void> {
  data?: T;
  error?: IApiErrorResponse;
}
