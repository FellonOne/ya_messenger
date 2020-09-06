import { isEmpty } from "../Validator/Util.mjs";

export class FormControl {
  constructor(formElement, fields) {
    this.formElement = formElement;
    this.fields = fields;

    this._eventSubmitFunction = this._eventSubmitFunction.bind(this);
    this._eventFocusFunction = this._eventFocusFunction.bind(this);
    this._eventBlurFunction = this._eventBlurFunction.bind(this);

    this.subscribers = [];
    this.subscribersOnFocus = [];
    this.subscribersOnBlur = [];
  }

  init(eventName = "submit") {
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

  _focus() {
    this.fields.forEach((key) => {
      this.formElement[key].addEventListener("focus", this._eventFocusFunction);
    });

    return this;
  }

  _blur() {
    this.fields.forEach((key) => {
      this.formElement[key].addEventListener("blur", this._eventBlurFunction);
    });

    return this;
  }

  _eventBlurFunction(event) {
    this.emitAllOnBlur(event);
  }

  _eventFocusFunction(event) {
    this.emitAllOnFocus(event);
  }

  _eventSubmitFunction(event) {
    event.preventDefault();

    const submitter = event.submitter;
    if (isEmpty(submitter.dataset.submit)) return;

    const form = event.target;
    const result = {};

    this.fields.forEach((key) => {
      result[key] = form[key].value;
    });

    this.emitAll(result);
  }

  /**
   * Отправляем данные формы подписчикам
   * @param data
   */
  emitAll(data) {
    this.subscribers.forEach((fn) => fn(data, this.formElement));
  }

  /**
   * Отправляем Event всем подписчикам на событие blur
   * элементов формы
   * @param {Event} ev
   */
  emitAllOnBlur(ev) {
    this.subscribersOnBlur.forEach((fn) => fn(ev, this.formElement));
  }

  /**
   * Отправляем Event всем подписчикам на событие focus
   * элементов формы
   * @param {Event} ev
   */
  emitAllOnFocus(ev) {
    this.subscribersOnFocus.forEach((fn) => fn(ev, this.formElement));
  }

  /**
   * Подписываем подписку на событие submit формы
   * @param fn
   */
  subscribe(fn) {
    this.subscribers.push(fn);
    return this;
  }

  /**
   * Подписываем подписку на событие submit формы
   * @param fn
   */
  subscribeSubmit(fn) {
    this.subscribers.push(fn);
    return this;
  }

  /**
   * Подписываем подписку на событие onFocus
   * каждого элемента
   * @param fn
   */
  subscribeOnFocus(fn) {
    this.subscribersOnFocus.push(fn);
    return this;
  }

  /**
   * Подписываем подписку на событие onBlur
   * каждого элемента
   * @param fn
   */
  subscribeOnBlur(fn) {
    this.subscribersOnBlur.push(fn);
    return this;
  }

  /**
   * Отписываем функцию от подписки
   * @param fn
   */
  unsubscribe(fn) {
    this.subscribers = this.subscribers.filter((f) => f !== fn);
    this.subscribeOnBlur = this.subscribeOnBlur.filter((f) => f !== fn);
    this.subscribeOnFocus = this.subscribeOnFocus.filter((f) => f !== fn);

    return this;
  }
}
