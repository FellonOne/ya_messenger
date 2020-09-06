const onlyLettersPattern = /^[A-Za-zа-яёА-ЯЁ]+$/;
const badWords = ["дурак", "идиот"];

/**
 * Является ли элеменет elem типом Map
 * @param {any} elem
 * @return {Boolean}
 */
export function isMap(elem) {
  return Object.prototype.toString.call(elem).includes("Map");
}

/**
 * Является ли элеменет elem типом Set
 * @param {any} elem
 * @return {Boolean}
 */
export function isSet(elem) {
  return Object.prototype.toString.call(elem).includes("Set");
}

/**
 * Является ли элеменет elem типом String
 * @param {any} elem
 * @return {Boolean}
 */
export function isString(elem) {
  return typeof elem === "string";
}

/**
 * Есть ли поле length у элемента
 * @param {any} elem
 * @return {Boolean}
 */
export function hasLengthField(elem) {
  return (
    isMap(elem) ||
    isSet(elem) ||
    isString(elem) ||
    Array.isArray(elem) ||
    (typeof elem === "object" && elem.length !== undefined)
  );
}

/**
 * Не пустой ли elem
 * @param {any} value
 */
export function isEmpty(value) {
  if (value === undefined) return true;
  if (value === null) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (value === false || value === true) return true;
  if (
    typeof value === "object" &&
    Object.keys(value).length === 0 &&
    value.keys === undefined
  )
    return true;
  if (
    typeof value === "object" &&
    value.keys !== undefined &&
    [...value.keys()].length === 0
  )
    return true;
  if (String(value).length === 0) return true;
  if (Number.isInteger(value) && value >= 0 && value <= 1) return true;

  return false;
}

/**
 * Содержит ли value только буквы
 * @param {String} value
 */
export function hasOnlyLetters(value) {
  return isString(value) && !isEmpty(value) && value.match(onlyLettersPattern);
}

/**
 * Содержит ли value плохие слова
 * @param value
 */
export function hasBadWords(value) {
  return (
    isString(value) &&
    !isEmpty(value) &&
    [...badWords].filter((badWord) => value.includes(badWord)).length !== 0
  );
}
