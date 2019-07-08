'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TOTAL = 8;
var PIN_X_MIN = 50;
var PIN_X_MAX = 1150;
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var PIN_MAIN_WIDTH = 62;
var PIN_MAIN_HEIGHT = 84;

/**
 * Возвращает случайный элемент массива
 * @param {array} arr
 * @return {string}
 */
var getRandElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Возвращает случайное число в заданном диапазоне
 * @param {number} min мин. значение
 * @param {number} max макс. значение
 * @return {number}
 */
var getRandMinMax = function (min, max) {
  return Math.random() * (max - min) + min;
};

/**
 * Возвращает объект с тестовыми данными объявления
 * @param {number} count отвечает за номер фотографии в ссылке
 * @return {object}
 */
var getAdword = function (count) {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + (count + 1) + '.png'
    },
    'offer': {
      'type': getRandElement(OFFER_TYPES)
    },
    'location': {
      'x': getRandMinMax(PIN_X_MIN, PIN_X_MAX),
      'y': getRandMinMax(PIN_Y_MIN, PIN_Y_MAX)
    }
  };
};

/**
 * Возвращает массив объектов с тестовыми данными объявлений
 * @param {number} count количество создаваемых объявлений
 * @return {array}
 */
var getSimilarAds = function (count) {
  var similarAds = [];

  for (var i = 0; i < count; i++) {
    similarAds.push(getAdword(i));
  }

  return similarAds;
};

/**
 * Перебирает DOM коллекцию, где каждому элементу удаляет или добавляет атрибут 'disabled' в зависимости от 2-ого параметра
 * @param {domCollection} domCollection передаваемая коллекция
 * @param {string} act действие, которое нужно совершить: 'enable' или 'disable'
 */
var enableOrDisableFormFields = function (domCollection, act) {
  for (var i = 0; i < domCollection.length; i++) {
    if (act === 'enable') {
      domCollection[i].removeAttribute('disabled');
    } else if (act === 'disable') {
      domCollection[i].setAttribute('disabled', '');
    }
  }
};

var map = document.querySelector('.map');
var pinList = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var pinFragment = document.createDocumentFragment();

var pinMain = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');
var adFormAddress = adForm.querySelector('#address');
var filtersForm = document.querySelector('.map__filters');
var filtersFormFields = filtersForm.querySelectorAll('select, fieldset');

/**
 * Возвращает объект с координатами главного пина
 * @param {Boolean} isCenter true - координаты равны середине пина; false || отсутствие параметра - место, куда метка указывает своим острым концом
 * @return {object}
 */
var getPinMainCoordinates = function (isCenter) {
  if (isCenter) {
    return {
      x: pinMain.offsetLeft + PIN_MAIN_WIDTH / 2,
      y: pinMain.offsetTop + PIN_MAIN_WIDTH / 2
    };
  } else {
    return {
      x: pinMain.offsetLeft + PIN_MAIN_WIDTH / 2,
      y: pinMain.offsetTop + PIN_MAIN_HEIGHT
    };
  }
};

/**
 * Записывает переданные в виде объекта координаты в соотв. инпут
 * @param {object} coordinates
 */
var setAdFormAddressCoordinates = function (coordinates) {
  adFormAddress.value = coordinates.x + ', ' + coordinates.y;
};

getSimilarAds(OFFER_TOTAL).forEach(function (item) {
  var currentPin = item;
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = currentPin.location.x + 'px';
  pinElement.style.top = currentPin.location.y + 'px';
  pinElement.querySelector('img').src = currentPin.author.avatar;

  pinFragment.appendChild(pinElement);
});

/**
 * Приводит страницу в "активное состояние". Блок карты и формы становятся доступными. На карте появляются "похожие" объявления (моки)
 */
var onPinMainClick = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  enableOrDisableFormFields(adFormFields, 'enable');
  enableOrDisableFormFields(filtersFormFields, 'enable');
  pinList.appendChild(pinFragment);
  setAdFormAddressCoordinates(getPinMainCoordinates());
};

pinMain.addEventListener('click', onPinMainClick);

/**
 * Делает все формы страницы неактивными, записывает начальные координаты главного пина, равные ее центру
 */
var disablePage = function () {
  setAdFormAddressCoordinates(getPinMainCoordinates(true));
  enableOrDisableFormFields(adFormFields, 'disable');
  enableOrDisableFormFields(filtersFormFields, 'disable');
};

disablePage();
