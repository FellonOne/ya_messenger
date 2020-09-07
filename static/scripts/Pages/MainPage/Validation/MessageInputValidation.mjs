export function messageInputValidation(formValidation, ev) {
  const input = ev.target;
  const form = input.form;

  const res = formValidation({
    [input.name]: input.value,
  });

  if (res.hasError) {
    console.log(res.errors);
  }
}
