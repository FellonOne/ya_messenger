import { queryStringify } from "./queryStringify";

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

export type CustomObject = { [key: string]: unknown };

type FetchOptions = {
  timeout?: number;
  method?: string;
  data?: CustomObject;
};

export class Fetch {
  // Инъекция объекта для управления запросами
  constructor(private API: new () => XMLHttpRequest = XMLHttpRequest) {}

  public get = (url: string, options: FetchOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  public put = (url: string, options: FetchOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  public post = (url: string, options: FetchOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  public delete = (url: string, options: FetchOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  private request = (
    url: string,
    options: FetchOptions = {},
    timeout = 5000
  ) => {
    return new Promise((resolve, reject) => {
      const xhr = new this.API();
      if (!options.method) throw Error("method is required");

      if (options.method === METHODS.GET) {
        const customUrl = `${url}${queryStringify(options.data)}`;

        console.log(customUrl);
        xhr.open(options.method, customUrl);
      } else {
        xhr.open(options.method, url);
      }

      let good = true;

      if (options.method === METHODS.GET) xhr.send();
      else xhr.send(JSON.stringify(options.data));

      const rejectTimeOut = setTimeout(() => {
        good = false;
        reject({
          error: "timeout",
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
    });
  };
}
