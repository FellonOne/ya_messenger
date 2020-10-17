/**
 * Является ли obj объектом
 * @param {unknown} obj
 */
export function isObject(obj: unknown): boolean {
  return typeof obj === 'object' && obj !== null;
}
