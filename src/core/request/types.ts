export enum MochiRequestMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  patch = 'patch',
}

export type MochiRequest = {
  url: string;
  method: MochiRequestMethod;
  options?: Partial<MochiRequestOptions>;
};

export type MochiRequestOptions = {
  headers?: Record<string, string>;
  body?: string | object;
  timeout?: number;
};

export type MochiResponse = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  request: MochiRequest;
} & MochiResponseFormat;

export type MochiResponseFormat = {
  data: () => ArrayBuffer;
  json: <T = unknown>() => T;
  text: () => string;
};

export type MochiRequestFunction = {
  (url: string, options?: MochiRequestOptions): Promise<MochiResponse>;
};

export type MochiRequestClient = Record<
  MochiRequestMethod,
  MochiRequestFunction
>;
