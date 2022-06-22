import axios, { AxiosError, AxiosResponse } from 'axios';

type ResponseError = Omit<AxiosError, 'response'> & {
  response: AxiosResponse<{ error: string }>
};

const isResponseError = (err: unknown | ResponseError): err is ResponseError => Boolean(
  err instanceof AxiosError
    && err.response
    && err.response.data.error,
);

export const formatError = (err: unknown): string => {
  if (isResponseError(err)) {
    return err.response.data.error;
  } if (err instanceof Error) {
    return err.message;
  }
  return 'Error in API service.';
};

const API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL;

if (API_SERVER_URL === undefined) {
  throw new Error('env.local.REACT_APP_API_SERVER_URL is not setuped');
}

const ApiService = axios.create({
  baseURL: API_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export default ApiService;
