export class FormControl {
  private subscribers: Function[] = [];
  private subscribersOnFocus: Function[] = [];
  private subscribersOnBlur: Function[] = [];

  constructor(private formElement: HTMLFormElement, private fields: string[]) {
    this._eventSubmitFunction = this._eventSubmitFunction.bind(this);
    this._eventFocusFunction = this._eventFocusFunction.bind(this);
    this._eventBlurFunction = this._eventBlurFunction.bind(this);

    this.subscribers = [];
    this.subscribersOnFocus = [];
    this.subscribersOnBlur = [];
  }

  /**
   * Уничтожаем всех подписчиков
   */
  public destroy(): void {
    this.formElement.removeEventListener("submit", this._eventSubmitFunction);
    this.fields.forEach((field) => {
      this.formElement[field].removeEventListener(
        "focus",
        this._eventFocusFunction
      );
      this.formElement[field].removeEventListener(
        "blur",
        this._eventBlurFunction
      );
    });
  }

  /**
   * Инициализируем управление формой
   * @param eventName
   */
  public init(eventName = "submit") {
    switch (eventName) {
      case "submit": {
        this.formElement.addEventListener(eventName, this._eventSubmitFunction);
        break;
      }

      default: {
        this.formElement.addEventListener(eventName, this._eventSubmitFunction);
        break;
      }
    }

    this._focus();
    this._blur();

    return this;
  }

  private _focus() {
    this.fields.forEach((key) => {
      this.formElement[key].addEventListener("focus", this._eventFocusFunction);
    });

    return this;
  }

  private _blur() {
    this.fields.forEach((key) => {
      this.formElement[key].addEventListener("blur", this._eventBlurFunction);
    });

    return this;
  }

  private _eventBlurFunction(event: Event) {
    this.emitAllOnBlur(event);
  }

  private _eventFocusFunction(event: Event) {
    this.emitAllOnFocus(event);
  }

  private _eventSubmitFunction(event: Event) {
    event.preventDefault();

    const form: HTMLFormElement = event.target as HTMLFormElement;
    if (form === null) return;

    const result: {
      [key: string]: string;
    } = {};

    this.fields.forEach((key: string) => {
      result[key] = form[key].value;
    });

    this.emitAll(result);
  }

  /**
   * Отправляем данные формы подписчикам
   * @param data
   */
  private emitAll(data: unknown) {
    this.subscribers.forEach((fn: Function) => fn(data, this.formElement));
  }

  /**
   * Отправляем Event всем подписчикам на событие blur
   * элементов формы
   * @param {Event} ev
   */
  private emitAllOnBlur(ev: Event) {
    this.subscribersOnBlur.forEach((fn: Function) => fn(ev, this.formElement));
  }

  /**
   * Отправляем Event всем подписчикам на событие focus
   * элементов формы
   * @param {Event} ev
   */
  private emitAllOnFocus(ev: Event) {
    this.subscribersOnFocus.forEach((fn: Function) => fn(ev, this.formElement));
  }

  /**
   * Подписываем подписку на событие submit формы
   * @param fn
   */
  public subscribe(fn: Function) {
    this.subscribers.push(fn);
    return this;
  }

  /**
   * Подписываем подписку на событие submit формы
   * @param fn
   */
  subscribeSubmit(fn: Function) {
    this.subscribers.push(fn);
    return this;
  }

  /**
   * Подписываем подписку на событие onFocus
   * каждого элемента
   * @param fn
   */
  subscribeOnFocus(fn: Function) {
    this.subscribersOnFocus.push(fn);
    return this;
  }

  /**
   * Подписываем подписку на событие onBlur
   * каждого элемента
   * @param fn
   */
  subscribeOnBlur(fn: Function) {
    this.subscribersOnBlur.push(fn);
    return this;
  }

  /**
   * Отписываем функцию от подписки
   * @param fn
   */
  unsubscribe(fn: Function) {
    this.subscribers = this.subscribers.filter((f) => f !== fn);
    this.subscribersOnBlur = this.subscribersOnBlur.filter((f) => f !== fn);
    this.subscribersOnFocus = this.subscribersOnFocus.filter((f) => f !== fn);

    return this;
  }
}
