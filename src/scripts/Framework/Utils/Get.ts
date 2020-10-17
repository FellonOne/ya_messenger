import { isObject } from './isObject';

type CustomObject = {
  [key: string]: unknown;
};

/**
 * Ищет в obj елемент по пути path
 * прим: obj = {a: {b: { c: 1 }}} path = "a.b.c" => вернет 1
 * @param {CustomObject} obj
 * @param {string} path
 * @param {unknown} defaultValue
 */
export function Get(obj: CustomObject, path: string, defaultValue: unknown = undefined): unknown {
  if (!path) {
    throw Error(`Empty path in Get method`);
  }

  const keys = path.split('.');
  if (!isObject(obj)) return defaultValue;

  let result: CustomObject = obj;

  for (const key of keys) {
    result = result[key] as CustomObject;

    if (result === undefined) {
      return defaultValue;
    }
  }

  return result || defaultValue;
}
