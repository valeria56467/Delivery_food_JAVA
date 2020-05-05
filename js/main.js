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

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth'); // объявляем константой кнопку "закрытия" окна авторизации
const logInForm = document.querySelector('#logInForm'); //получение элемента формы авторизации
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');





let login = localStorage.getItem('gloDelivery'); //создаем переменную для проверки авторизации по которой у нас будет идти проверка, придаем ей значение сохранения


function toggleModalAuth() { //функция вызова окна авторизации
  modalAuth.classList.toggle('is-open')
}



function authorized() {
    function logOut () { //эта функция обнуляет наш логин
        login = null;
        localStorage.removeItem('gloDelivery');
        buttonAuth.style.display = ''; //отображаем кнопку "Войти"
        userName.style.display = ""; //скрываем имя пользователя
        buttonOut.style.display = ""; //скрываем кнопку Выход
        buttonOut.removeEventListener('click', logOut)
        checkAuth();
    }

  console.log('Авторизован');
  userName.textContent = login //свойство которое содержит текст данного элемента, мыы можем не только получать но и записывать
 // мы можем менять стили css, у примеру -  buttonAuth.style.backgroundColor = 'red'  это изменение фона кнопки "Войти"
    buttonAuth.style.display = 'none'; //скрываем отображение кнопки "Войти", когда вход уже осуществлен
    userName.style.display = "inline"; //показываем имя пользователя
    buttonOut.style.display = "block";//показываем кнопку "Выход"
    buttonOut.addEventListener('click', logOut) //на кнопку "Выход" добавляем событие
}

 function notAuthorized() {
  console.log('Не авторизован');
  function logIn (event) {
    event.preventDefault();
    login = loginInput.value;
      toggleModalAuth();
      if (login === "") {
          alert("Введите имя пользователя");
      }
      else {
          localStorage.setItem('gloDelivery', login); //сохраняем имя пользователя, что бы не надо было вводить после перезагрузки страницы
          buttonAuth.removeEventListener('click', toggleModalAuth); //установка события по клику мышки - открытия окна
          closeAuth.removeEventListener('click', toggleModalAuth); // установка события - закрытия окна по знаку "Х"
          logInForm.removeEventListener('submit', logIn);
          logInForm.reset (); //очищаем окно ввода логина
          checkAuth();
      }

  }

   buttonAuth.addEventListener('click', toggleModalAuth);
   closeAuth.addEventListener('click', toggleModalAuth); // установка события - закрытия окна по знаку "Х"
   logInForm.addEventListener('submit', logIn);

 }

 function checkAuth() {
     if (login) {
         authorized();
     } else {
         notAuthorized();
     }

 }

 checkAuth();

