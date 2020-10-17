export function hideError(
  formElement: HTMLFormElement,
  className: string,
  includesOnly: string | null = null,
): void {
  for (const elem of formElement.querySelectorAll(`.${className}`)) {
    if (
      includesOnly === null ||
      (elem && [...elem.classList].join('').includes(`${includesOnly}__text-error`))
    )
      elem.textContent = '';
  }
}
