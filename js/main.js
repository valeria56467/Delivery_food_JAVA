'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
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
const cardsMenu = document.querySelector('.cards-menu');
const modalBody = document.querySelector('.modal-body'); //получаем окно корзины
const modalPrice = document.querySelector('.modal-pricetag');
const buttonClearCart = document.querySelector('.clear-cart');

let login = localStorage.getItem('gloDelivery'); //создаем переменную для проверки авторизации по которой у нас будет идти проверка, придаем ей значение сохранения

const cart = []; //создаем массив для корзины


const getData = async function (url) {
    const response = await fetch(url);
    if (!response.ok) { // нам надо убедиться что ошибок нет при запросе данных
        throw new Error(`Ошибка по адресу ${url}, 
        статус ошибка ${response.status}!+`); // использованна интерполяция те при каком тексте вставляе javascript код (`   ${____}`)
    }
    return await response.json();
    } /*объявляем функцию, которая будет работать с БД - делать запрос к серверу и получать данные, функция будет асинхронной,
те внутри мы сможем управлять задержкой, в данному случае  выполнение след. строки не начнется, пока не выполнится текущая строка */


//console.log(getData('./db/partners.json'));

function toggleModal() {
  modal.classList.toggle("is-open");
};

function toggleModalAuth() { //функция вызова окна авторизации
    modalAuth.classList.toggle('is-open')
    loginInput.style.borderColor = '';
};

function authorized() {
    function logOut () { //эта функция обнуляет наш логин
        login = null;
        localStorage.removeItem('gloDelivery');
        buttonAuth.style.display = ''; //отображаем кнопку "Войти"
        userName.style.display = ""; //скрываем имя пользователя
        buttonOut.style.display = ""; //скрываем кнопку Выход
        cartButton.style.display = '';
        buttonOut.removeEventListener('click', logOut);
        checkAuth();
    };

  //console.log('Авторизован');
  userName.textContent = login //свойство которое содержит текст данного элемента, мыы можем не только получать но и записывать
 // мы можем менять стили css, у примеру -  buttonAuth.style.backgroundColor = 'red'  это изменение фона кнопки "Войти"
    buttonAuth.style.display = 'none'; //скрываем отображение кнопки "Войти", когда вход уже осуществлен
    userName.style.display = "inline"; //показываем имя пользователя
    buttonOut.style.display = "flex";//показываем кнопку "Выход"
    cartButton.style.display = 'flex';
    buttonOut.addEventListener('click', logOut) //на кнопку "Выход" добавляем событие
};

function notAuthorized() {
  //console.log('Не авторизован');
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

 };

function checkAuth() {
     if (login) {
         authorized();
     } else {
         notAuthorized();
     }

 };

//day2

function createCardRestaurant(restaurant) { //создаем функицию генерирования карточки товара
     const {
         image,
         kitchen,
         name,
         price,
         stars,
         products,
         time_of_delivery: timeOfDelivery //переименовываем переменную в массиве
     } = restaurant;

     const card = `
        <a class="card card-restaurant" data-products="${products}">
                <img src="${image}" alt="image" class="card-image"/>
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">${name}</h3>
                        <span class="card-tag tag">${timeOfDelivery}</span>
                    </div>
                <div class="card-info">
                    <div class="rating">
                        ${stars}
                    </div>
                     <div class="price">От ${price}</div>
                     <div class="category">${kitchen}</div>
                </div>
            </div>
        </a>
        `;
     cardsRestaurants.insertAdjacentHTML('beforeend', card); //так как необходимо вставлять верстку на страницу - используем метод .insertAdjacentHTML, мы указываем куда вставит и что вствить -

 };

function createCardGood (goods) {
   //console.log(goods)
    const {
            description,
            id,
            image,
            name,
            price,

    } = goods
    const card = document.createElement('div');
    card.className = 'card';
    //card.id=id;
    card.insertAdjacentHTML('beforeend',  `
	<img src="${image}" alt="image" class="card-image"/>
		<div class="card-text">
			<div class="card-heading">
				<h3 class="card-title card-title-reg">${name}</h3>
			</div>
			<div class="card-info">
				<div class="ingredients">${description}
				</div>
			</div>
			<div class="card-buttons">
				<button class="button button-primary button-add-cart" id="${id}"> <!--так же мы присвоили каждой карточке индетификацонный номер из базы-->
					<span class="button-card-text">В корзину</span>
					<span class="button-cart-svg"></span>
				</button>
			<strong class="card-price card-price-bold">${price} ₽</strong>
		    </div>
		</div>
    `);
    cardsMenu.insertAdjacentElement("beforeend", card);

};

//Объект event -  это объект события, который создается только во время событии
function openGoods(event) { //создаем функцию - обработчик событий, которую будем запускать при клике по карточке cardsRestaurants.addEventListener('click')
    const target = event.target; //сохраняем в переменную, что бы сократить запись, сам таргет нам нужен что бы определять в какой конкретно карточке мы кликнули
    const restaurant = target.closest('.card-restaurant') //метод поднимается выше  по элементам, пока не найдет  элемент с заданным селектором
    //console.log('restaurant: ', restaurant)
    if (restaurant){  //когда проходит клик по карточке с рестораном мы
            if (login != null){
                //console.log(restaurant.dataset.products);
                cardsMenu.textContent = "";
                containerPromo.classList.add('hide');//скрываем отображение блока "Промо"
                restaurants.classList.add('hide'); //скрываем отображение блока выбора ресторана
                menu.classList.remove('hide'); //показываем блок с блюдами выбранного ресторана
                getData(`./db/${restaurant.dataset.products}`).then(function (data) {
                    data.forEach(createCardGood);
                    });

            }
            else { toggleModalAuth();}
}
};

function addToCart(event) {
    const target = event.target;
    //console.log(target);
    const buttonAddToCart = target.closest('.button-add-cart'); //создаем кончтанту, содержащюю эту кнопку в HTML
    /*надо ввести проверку, событие произошло имеено по той "кнопке" по которой мы хотели*/
    if (buttonAddToCart) { //если клин не возвращает "null" тогда
        const card = target.closest('.card');
        const title = card.querySelector('.card-title-reg').textContent; //подымаемся выше по карточке и получаем название и цену товара aeyrwbz .textContent выводит только текст
        const cost= card.querySelector('.card-price').textContent; //получаем название товара;
        const id =buttonAddToCart.id;
        //console.log(title, cost, id);
       const food = cart.find(function (item) {
           return item.id === id;
       })

       if (food) {
           food.count += 1;
       } else {
           cart.push({ //добавляем в константу cart, заданную в начале элементы, полученные в функции
               id: id,
               title: title,
               cost: cost,
               count: 1
           });
       }
      // console.log(cart);
    }
};

function renderCart() { //добавлении функции для формирования списка
    modalBody.textContent = ''; //во избежание дублирования очищаем корзину
    cart.forEach(function ({ id, title, cost, count }) {
        const itemCart = `
        		<div class="food-row">
					<span class="food-name">${title}</span>
					<strong class="food-price">${cost}</strong>
					<div class="food-counter">
						<button class="counter-button counter-minus" data-id=${id}>-</button>
						<span class="counter">${count}</span>
						<button class="counter-button counter-plus" data-id=${id}>+</button>
					</div>
				</div>
        `;
        modalBody.insertAdjacentHTML('afterbegin', itemCart)
    });
    const totalPrice = cart.reduce(function (result, item) {
        return result + (parseFloat(item.cost)*item.count);
    }, 0);
    modalPrice.textContent = totalPrice + '₽'; //в вите текстовых строк из этих строк нам надо выделить числа, поэтому в пред. строке используем функцию parseFloat
};

function changeCount(event) { //функция изменения колличества товара в корзине
    const target = event.target;
    if (target.classList.contains('counter-button')) {
        const food = cart.find(function (item){
            return item.id === target.dataset.id;
        });

        if (target.classList.contains('counter-minus')) {
                food.count--; // уменьшеем на 1
            if (food.count === 0) { //но если количество элементов равно 0, то удаляем наш элемент с карточки
                cart.splice(cart.indexOf(food), 1)
            }

            };
        if (target.classList.contains('counter-plus')) {
                food.count++; //увеличиваем количество на 1
            };
        renderCart();
        }
};

function init () { // создаем 1 функцию для инициализации
    getData('./db/partners.json').then(function (data) {
        data.forEach(createCardRestaurant)
    });
    cartButton.addEventListener("click", function () {
        renderCart();
        toggleModal();
    });
    buttonClearCart.addEventListener('click', function () { //добавление функционала на кнопку корзины "Отмена"
        cart.length = 0;
        renderCart()
    });

    modalBody.addEventListener('click', changeCount)
    cardsMenu.addEventListener('click', addToCart) //к события на "меню", по которому мы будем запускать функцию "Добавить в корзину"
    close.addEventListener("click", toggleModal);
    cardsRestaurants.addEventListener('click', openGoods);
    logo.addEventListener('click', function () { //при клике на "лого возвращаем блок промо и рестораны
        containerPromo.classList.remove('hide');//скрываем отображение блока "Промо"
        restaurants.classList.remove('hide'); //скрываем отображение блока выбора ресторана
        menu.classList.add('hide');
    })
    checkAuth();
};

new Swiper('.swiper-container', { //добавление свапера, см. https://swiperjs.com/get-started/
    loop: true,
    autoplay: {
        delay: 3000,
    },
    sliderPerView: 1,
    sliderPerColumn: 1,
});

init();