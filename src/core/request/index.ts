import {
  MochiRequestClient,
  MochiRequestMethod,
  MochiRequestOptions,
  MochiResponse,
  MochiResponseFormat,
} from './types';

export * from './types';

// Binding

declare global {
  type BindingResponse = {
    url?: string;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    expectedContentLength: number;
    data?: ArrayBuffer;
    dataText?: string;
    mimeType?: string;
    textEncodingName?: string;
  };

  const __request__: {
    buildRequest(
      url: string,
      method: string,
      options?: MochiRequestOptions
    ): Promise<BindingResponse>;
  };
}

const create = (): MochiRequestClient => {
  const request: MochiRequestClient = {} as MochiRequestClient;

  for (const method of Object.values(MochiRequestMethod)) {
    request[method] = async (url, options): Promise<MochiResponse> => {
      if (options?.body) {
        const body = options.body;
        if (typeof body !== 'string') {
          options.body = JSON.stringify(body);
        }
      }

      const _response = await __request__.buildRequest(url, method, options);
      const responseFormat: MochiResponseFormat = {
        data: function (): ArrayBuffer {
          return _response.data ?? new ArrayBuffer(0);
        },
        json: function <T = unknown>(): T {
          const json = this.text();
          return JSON.parse(json) as T;
        },
        text: function (): string {
          return _response.dataText ?? '';
        },
      };
      return {
        status: _response.status,
        statusText: _response.statusText,
        headers: _response.headers,
        request: {
          url: url,
          method: method,
          options: options,
        },
        ...responseFormat,
      };
    };
  }

  return request;
};

export const request = create();
