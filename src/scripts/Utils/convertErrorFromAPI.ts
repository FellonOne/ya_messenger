/**
 * Конвертируем ошибки с апи, в формат приложения
 * @param data
 */
export function convertErrorFromAPI(
  data: Array<{ field?: string; message: string }>,
): { [key: string]: string } {
  const result: { [key: string]: string } = {};

  data.forEach(({ field, message }) => {
    if (field) {
      result[field] = message;
    } else {
      result['default'] = message;
    }
  });

  return result;
}
