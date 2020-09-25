import { queryStringify } from "./queryStringify.js";
const METHODS = {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE",
};
export class Fetch {
    // Инъекция объекта для управления запросами
    constructor(API = XMLHttpRequest) {
        this.API = API;
        this.get = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.GET }), options.timeout);
        };
        this.put = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.PUT }), options.timeout);
        };
        this.post = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.POST }), options.timeout);
        };
        this.delete = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.DELETE }), options.timeout);
        };
        this.request = (url, options = {}, timeout = 5000) => {
            return new Promise((resolve, reject) => {
                const xhr = new this.API();
                if (!options.method)
                    throw Error("method is required");
                if (options.method === METHODS.GET) {
                    const customUrl = `${url}${queryStringify(options.data)}`;
                    console.log(customUrl);
                    xhr.open(options.method, customUrl);
                }
                else {
                    xhr.open(options.method, url);
                }
                let good = true;
                if (options.method === METHODS.GET)
                    xhr.send();
                else
                    xhr.send(JSON.stringify(options.data));
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
}
//# sourceMappingURL=Fetch.js.map