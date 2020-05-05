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

//console.log(document.querySelector('.button-auth'));

const buttouAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth'); // объявляем константой кнопку "закрытия" окна авторизации
const logInForm = document.querySelector('#logInForm'); //получение элемента формы авторизации
const loginInput = document.querySelector('#login');

let login = ''; //создаем переменную для проверки авторизации по которой у нас будет идти проверка
               //console.dir(modalAuth);

function toggleModalAuth() { //функция вызова окна авторизации
  modalAuth.classList.toggle('is-open')
}
/*buttouAuth.addEventListener('click', function () {
  console.log('Hello');
});*/


                                              //buttouAuth.removeEventListener('click', toggleModalAuth) функция удаления
function authorized() {
  console.log('Авторизован');

}
 function notAuthorized() {
  console.log('Не авторизован');

  function logIn (event) {
    event.preventDefault() //не работает
    console.log('Логин');
    console.log(loginInput.value)
  }

   buttouAuth.addEventListener('click', toggleModalAuth); //установка события по клику мышки - открытия окна
   closeAuth.addEventListener('click', toggleModalAuth); // установка события - закрытия окна по знаку "Х"
   logInForm.addEventListener('submin', logIn)
 }

if (login) {
  authorized();
  } else {
  notAuthorized();
}