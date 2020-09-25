export function queryStringify(data = {}) {
    let resString = "?";
    if (typeof data !== "object")
        return "";
    const entries = Object.entries(data);
    if (entries.length === 0)
        return "";
    entries.forEach(([key, value], i, arr) => {
        if (Array.isArray(value)) {
            resString += `${key}=${value.join(",")}`;
        }
        else {
            resString += `${key}=${value}`;
        }
        if (i + 1 !== arr.length)
            resString += `&`;
    });
    return resString;
}
//# sourceMappingURL=queryStringify.js.map