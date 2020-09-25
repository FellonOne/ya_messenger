export function Trim(str, pattern = null) {
    if (pattern === null)
        return str.trim();
    const badLetters = new Set(pattern);
    const redFunc = () => {
        let flag = false;
        return (str, letter) => {
            if (!flag && badLetters.has(letter)) {
                return str;
            }
            else {
                flag = true;
                str.push(letter);
                return str;
            }
        };
    };
    const res = str.split("").reduce(redFunc(), []);
    return res
        .reduceRight(redFunc(), [])
        .reverse()
        .join("");
}
//# sourceMappingURL=Trim.js.map