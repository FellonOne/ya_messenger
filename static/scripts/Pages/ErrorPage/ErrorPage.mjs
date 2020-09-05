import { ErrorPageTemplate } from "./ErrorPage.tmpl.mjs";

const errorPageTypeData = {
  404: {
    errorCode: "404",
    errorMessage: "Такой страницы не <br>существует :(",
  },
  504: {
    errorCode: "504",
    errorMessage: "Oooopps, что-то пошло не<br> так",
  },
};

export function RenderErrorPage(errorPageType) {
  const data = errorPageTypeData[errorPageType];

  const Template = Handlebars.compile(ErrorPageTemplate);
  const root = document.querySelector(".messenger");

  root.innerHTML = Template(data);
}
