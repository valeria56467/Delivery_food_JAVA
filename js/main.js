const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//day 1
//реализация авторизации

console.log(document.querySelector('.button-auth'))

const buttouAuth = document.querySelector('.button-auth')
console.log(buttouAuth)