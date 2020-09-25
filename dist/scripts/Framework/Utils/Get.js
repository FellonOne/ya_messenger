import { isObject } from "./isObject.js";
/**
 * Ищет в obj елемент по пути path
 * прим: obj = {a: {b: { c: 1 }}} path = "a.b.c" => вернет 1
 * @param {CustomObject} obj
 * @param {string} path
 * @param {unknown} defaultValue
 */
export function Get(obj, path, defaultValue = undefined) {
    if (!path) {
        throw Error(`Empty path in Get method`);
    }
    const keys = path.split(".");
    if (!isObject(obj))
        return defaultValue;
    let result = obj;
    for (let key of keys) {
        result = result[key];
        if (result === undefined) {
            return defaultValue;
        }
    }
    return result || defaultValue;
}
//# sourceMappingURL=Get.js.map