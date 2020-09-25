export function isEmpty(arg) {
    if (arg === null || arg === undefined || !arg)
        return true;
    if (Array.isArray(arg) && arg.length === 0)
        return true;
    if (typeof arg === "string" && arg.length === 0)
        return true;
    if (typeof arg === "object" && arg && Object.keys(arg).length < 1)
        return true;
    return false;
}
//# sourceMappingURL=isEmpty.js.map