export function Trim(str: string, pattern: string | null = null): string {
  if (pattern === null) return str.trim();

  const badLetters = new Set(pattern);
  const redFunc = () => {
    let flag = false;

    return (str: string[], letter: string) => {
      if (!flag && badLetters.has(letter)) {
        return str;
      } else {
        flag = true;
        str.push(letter);
        return str;
      }
    };
  };

  const res = str.split('').reduce(redFunc(), [] as string[]);
  return res
    .reduceRight(redFunc(), [] as string[])
    .reverse()
    .join('');
}
