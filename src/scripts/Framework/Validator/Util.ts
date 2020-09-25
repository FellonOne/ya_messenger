import { isEmpty } from "../Utils/isEmpty";

const onlyLettersPattern = /^[A-Za-zа-яёА-ЯЁ]+$/;
const badWords = ["дурак", "идиот"];

/**
 * Является ли элеменет elem типом Map
 * @param {unknown} elem
 * @return {boolean}
 */
export function isMap(elem: unknown): boolean {
  return Object.prototype.toString.call(elem).includes("Map");
}

/**
 * Является ли элеменет elem типом Set
 * @param {unknown} elem
 * @return {boolean}
 */
export function isSet(elem: unknown): boolean {
  return Object.prototype.toString.call(elem).includes("Set");
}

/**
 * Является ли элеменет elem типом String
 * @param {unknown} elem
 * @return {boolean}
 */
export function isString(elem: unknown): boolean {
  return typeof elem === "string";
}

/**
 * Есть ли поле length у элемента
 * @param {unknown} elem
 * @return {boolean}
 */
export function hasLengthField(elem: unknown): boolean {
  return (
    isMap(elem) ||
    isSet(elem) ||
    isString(elem) ||
    Array.isArray(elem) ||
    (typeof elem === "object" && elem !== null && "length" in elem)
  );
}

/**
 * Содержит ли value только буквы
 * @param {String} value
 */
export function hasOnlyLetters(value: string) {
  return isString(value) && !isEmpty(value) && value.match(onlyLettersPattern);
}

/**
 * Содержит ли value плохие слова
 * @param value
 */
export function hasBadWords(value: unknown) {
  return (
    isString(value) &&
    !isEmpty(value) &&
    [...badWords].filter((badWord) => (value as string).includes(badWord))
      .length !== 0
  );
}
