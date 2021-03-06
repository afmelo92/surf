/* eslint-disable @typescript-eslint/no-empty-interface */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {
  url?: string;
}

export interface Response<T = unknown> extends AxiosResponse<T> {}

export type RequestError<T = unknown> = AxiosError<T>;

export class Request {
  constructor(private request = axios) {}

  public get<T>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
    return this.request.get<T, Response<T>>(url, config);
  }

  public static isRequestError(error: AxiosError): boolean {
    return !!(error.response && error.response.status);
  }
}
