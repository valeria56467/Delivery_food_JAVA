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
//day 2
const cardsRestaurants = document.querySelector('.cards-restaurants'); //задаем переменну в виде карточек
const containerPromo = document.querySelector('.container-promo'); //используем для закрытия контенера "Promo"
const restaurants = document.querySelector('.restaurants'); //для закрытия "restaurants"
const menu = document.querySelector('.menu'); // для отображения "Меню"
const logo = document.querySelector('.logo');



let login = localStorage.getItem('gloDelivery'); //создаем переменную для проверки авторизации по которой у нас будет идти проверка, придаем ей значение сохранения


function toggleModalAuth() { //функция вызова окна авторизации
    modalAuth.classList.toggle('is-open')
    loginInput.style.borderColor = ''
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
    if (loginInput.value.length) {
        login = loginInput.value;
        localStorage.setItem('gloDelivery', login); //сохраняем имя пользователя, что бы не надо было вводить после перезагрузки страницы
        toggleModalAuth();
        buttonAuth.removeEventListener('click', toggleModalAuth); //установка события по клику мышки - открытия окна
        closeAuth.removeEventListener('click', toggleModalAuth); // установка события - закрытия окна по знаку "Х"
        logInForm.removeEventListener('submit', logIn);
        logInForm.reset (); //очищаем окно ввода логина
        checkAuth();
    }
     else {loginInput.style.borderColor = 'red'

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


//day2

 function createCardRestaurant() { //создаем функицию генерирования карточки товара
     const card = `
        <a class="card card-restaurant">
                <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">Тануки</h3>
                        <span class="card-tag tag">60 мин</span>
                    </div>
                <div class="card-info">
                    <div class="rating">
                        4.5
                    </div>
                     <div class="price">От 1 200 ₽</div>
                     <div class="category">Суши, роллы</div>
                </div>
            </div>
        </a>
        `;
     cardsRestaurants.insertAdjacentHTML('beforeend', card); //так как необходимо вставлять верстку на страницу - используем метод .insertAdjacentHTML, мы указываем куда вставит и что вствить -

 }

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();
createCardRestaurant();

function createCardGood () {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
	<img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
		<div class="card-text">
			<div class="card-heading">
				<h3 class="card-title card-title-reg">Пицца Классика</h3>
			</div>
			<div class="card-info">
				<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
					грибы.
				</div>
			</div>
			<div class="card-buttons">
				<button class="button button-primary button-add-cart">
					<span class="button-card-text">В корзину</span>
					<span class="button-cart-svg"></span>
				</button>
			<strong class="card-price-bold">510 ₽</strong>
		    </div>
		</div>
    `;
    console.log(card);

}


//Объект event -  это объект события, который создается только во время событии
function openGoods(event) { //создаем функцию - обработчик событий, которую будем запускать при клике по карточке cardsRestaurants.addEventListener('click')
    const target = event.target; //сохраняем в переменную, что бы сократить запись, сам таргет нам нужен что бы определять в какой конкретно карточке мы кликнули
    const restaurant = target.closest('.card-restaurant') //метод поднимается выше  по элементам, пока не найдет  элемент с заданным селектором
    //console.log('restaurant: ', restaurant)
    if (restaurant) { //когда проходит клик по карточке с рестораном мы
        containerPromo.classList.add('hide');//скрываем отображение блока "Промо"
        restaurants.classList.add('hide'); //скрываем отображение блока выбора ресторана
        menu.classList.remove('hide'); //показываем блок с блюдами выбранного ресторана
               }
    createCardGood ();

}


cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function () { //при клике на "лого возвращаем блок промо и рестораны
    containerPromo.classList.remove('hide');//скрываем отображение блока "Промо"
    restaurants.classList.remove('hide'); //скрываем отображение блока выбора ресторана
    menu.classList.add('hide');


})
