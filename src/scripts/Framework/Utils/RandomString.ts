const alphabet = ["a", "b", "c", "d", "f", "e", "g", "h", "k", "l"];

/**
 * Возвращает рандомную строку
 */
export function GetRandomString(): string {
  const str = [],
    rand = (Math.trunc(Math.random() * 1000000000) + 987654321) % 1000000000;

  for (const num of String(rand) + String(Date.now())) {
    if (Math.random() <= 0.75) str.push(alphabet[Number(num)]);
  }

  return `id_${str.join("")}`;
}
