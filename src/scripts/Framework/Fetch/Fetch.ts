import { queryStringify } from './queryStringify';

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export type CustomObject = { [key: string]: unknown };

type FetchOptions = {
  timeout?: number;
  method?: string;
  isFormData?: boolean;
  data?: CustomObject | FormData;
  header?: CustomObject;
};

class _Fetch {
  private static instance: _Fetch;
  // Инъекция объекта для управления запросами
  constructor(private API: new () => XMLHttpRequest = XMLHttpRequest) {
    if (_Fetch && _Fetch.instance) {
      return _Fetch.instance;
    }
    _Fetch.instance = this;
  }

  public setApi(api: new () => XMLHttpRequest = XMLHttpRequest): this {
    this.API = api;
    return this;
  }

  public get = (url: string, options: FetchOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  public put = (url: string, options: FetchOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  public post = (url: string, options: FetchOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  public delete = (url: string, options: FetchOptions = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  private request = (url: string, options: FetchOptions = {}, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      try {
        const xhr = new this.API();
        if (!options.method) throw Error('method is required');

        if (options.method === METHODS.GET) {
          const customUrl = `${url}${queryStringify(options.data as CustomObject)}`;
          xhr.open(options.method, customUrl);
        } else {
          xhr.open(options.method, url);
        }

        if (options.header) {
          Object.keys(options.header).forEach((key) => {
            if (options && options.header)
              xhr.setRequestHeader(key, String(options.header[key]) as string);
          });
        }

        if (xhr.setRequestHeader && !options.isFormData) {
          xhr.setRequestHeader('content-type', 'application/json');
        }

        xhr.withCredentials = true;

        let good = true;

        if (options.method === METHODS.GET) xhr.send();
        else {
          if (!options.isFormData) xhr.send(JSON.stringify(options.data));
          else xhr.send(options.data as FormData);
        }

        const rejectTimeOut = setTimeout(() => {
          good = false;
          reject({
            error: 'timeout',
          });
        }, timeout);

        xhr.onload = () => {
          if (good) {
            clearTimeout(rejectTimeOut);
            resolve(xhr);
          }
        };
        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;
      } catch (error) {
        reject(error);
      }
    });
  };
}

export const Fetch = new _Fetch();
