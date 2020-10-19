type BaseAPIResult = {
  state: boolean;
  errors: { message: string; field?: string }[];
};

export class BaseAPI {
  /**
   }
   * Отправляем ошибку
   * @private
   */
  protected responseError(
    field = 'default',
    message = 'Уууппсс, что-то пошло не так',
  ): BaseAPIResult {
    return {
      state: false,
      errors: [{ field, message }],
    };
  }

  /**
   * Парсим ошибку и отпавряем
   * @param result
   * @private
   */
  protected parseErrorAndResponse(result: XMLHttpRequest): BaseAPIResult {
    const response = JSON.parse(result.response);
    return {
      state: false,
      errors: [{ message: response.reason }],
    };
  }
}
