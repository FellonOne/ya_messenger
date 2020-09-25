export function isEqual(a, b) {
    if (a === b)
        return true;
    const isObject = (arg) => typeof arg === "object" && arg !== null && "toString" in arg;
    if ((isObject(a) && !isObject(b)) || (!isObject(a) && isObject(b)))
        return false;
    if (isObject(a) && isObject(b)) {
        let good = true;
        for (const [key, val] of Object.entries(a)) {
            if (!good)
                break;
            if (typeof b === "object" && b !== null && !b.hasOwnProperty(key)) {
                good = false;
                break;
            }
            if (isObject(val) && isObject(b)) {
                good = isEqual(val, b[key]);
            }
            else {
                good = val === b[key];
            }
        }
        return good;
    }
    return a === b;
}
//# sourceMappingURL=isEqual.js.map