import { FetchResponse } from "./types";

const baseUrl = process.env.REACT_APP_STUDY_MATE_API_BASE_URL;

export const createFetchResponse = async <T>(response: Response): Promise<FetchResponse<T>> => ({
  ...response,
  data: await response.json() as unknown as T,
});

const get = (url: RequestInfo | URL, init?: RequestInit) => {
  return fetch(`${baseUrl}${url}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
};

const post = (url: RequestInfo | URL, data: string, init?: RequestInit) => {
  return fetch(`${baseUrl}${url}`, {
    method: 'post',
    body: JSON.stringify(data),
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
};

const put = (url: RequestInfo | URL, data: string, init?: RequestInit) => {
  return fetch(`${baseUrl}${url}`, {
    method: 'put',
    body: JSON.stringify(data),
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
};

const deletee = (url: RequestInfo | URL, init?: RequestInit) => {
  return fetch(`${baseUrl}${url}`, {
    method: 'delete',
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
};

export const api = { get, put, post, delete: deletee };
