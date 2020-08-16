 // Демонстрация верстки левого меню мессенджера!
 const button = document.querySelector(".contacts-controls__menu");
 const backdrop = document.querySelector(".backdrop");
 const nav = document.querySelector(".left-menu");
 const closeButton = document.querySelector(".left-menu__close-button");

 const closeNavAndButton = () => {
   nav.classList.remove("left-menu_open");
   backdrop.classList.remove("backdrop_open");
   closeButton.classList.remove("left-menu__close-button_open");
 };

 const openNavAndButton = () => {
   nav.classList.toggle("left-menu_open");
   backdrop.classList.add("backdrop_open");
   closeButton.classList.add("left-menu__close-button_open");
 };

 closeButton.addEventListener("click", () => {
   closeNavAndButton();
 });

 button.addEventListener("click", () => {
   openNavAndButton();
 });

 backdrop.addEventListener("click", () => {
   closeNavAndButton();
 });