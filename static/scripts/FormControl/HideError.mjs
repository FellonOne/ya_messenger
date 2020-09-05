export function hideError(formElement, className, includesOnly = null) {
  for (const elem of formElement.querySelectorAll(`.${className}`)) {
    if (
      includesOnly === null ||
      (elem &&
        [...elem.classList].join("").includes(`${includesOnly}__text-error`))
    )
      elem.textContent = "";
  }
}
