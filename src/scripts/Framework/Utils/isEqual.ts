/**
 * Глубокое сравнение двух объектов
 * @param a
 * @param b
 */
type CustomObject = {
  [key: string]: unknown;
};

export function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  const isObject = (arg: unknown): arg is CustomObject =>
    typeof arg === 'object' && arg !== null && 'toString' in arg;

  if ((isObject(a) && !isObject(b)) || (!isObject(a) && isObject(b))) return false;

  if (isObject(a) && isObject(b)) {
    let good = true;

    for (const [key, val] of Object.entries(a)) {
      if (!good) break;

      if (typeof b === 'object' && b !== null && !b.hasOwnProperty(key)) {
        good = false;
        break;
      }

      if (isObject(val) && isObject(b)) {
        good = isEqual(val, b[key]);
      } else {
        good = val === b[key];
      }
    }

    return good;
  }

  return a === b;
}
