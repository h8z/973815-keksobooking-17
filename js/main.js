'use strict';

var offerType = {
  bungalo: {placeholder: 0, min: 0},
  flat: {placeholder: 1000, min: 1000},
  house: {placeholder: 5000, min: 5000},
  palace: {placeholder: 10000, min: 10000}
};
var OFFER_TOTAL = 8;
var PIN_X_MIN = 50;
var PIN_X_MAX = 1150;
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var PIN_MAIN_WIDTH = 62;
var PIN_MAIN_TIP = 22;

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
      'type': getRandElement(Object.keys(offerType))
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
 * Перебирает DOM коллекцию, активирует элементы, удаляя атрибут 'disabled'
 * @param {domCollection} domCollection
 */
var enableFormFields = function (domCollection) {
  domCollection.forEach(function (item) {
    item.removeAttribute('disabled');
  });
};

/**
 * Перебирает DOM коллекцию, деактивирует элементы, добавляя атрибут 'disabled'
 * @param {domCollection} domCollection
 */
var disableFormFields = function (domCollection) {
  domCollection.forEach(function (item) {
    item.setAttribute('disabled', '');
  });
};

/**
 * Возвращает объект с координатами главного пина
 * @return {object}
 */
var getPinMainCoordinates = function () {
  return {
    x: pinMainPositionX,
    y: pinMainPositionY
  };
};

/**
 * Записывает переданные в виде объекта координаты в соотв. инпут
 * @param {object} coordinates
 */
var setAdFormAddressCoordinates = function (coordinates) {
  adFormAddress.value = coordinates.x + ', ' + coordinates.y;
};

/**
 * При изменении значения селекта "Тип жилья", также меняет атрибуты min и placeholder у инпута цены в соотв. со словарем offerType
 */
var onOfferTypeChange = function () {
  var selectedType = adFormOfferType.value;
  var selectedTypeValues = offerType[selectedType];
  var attributes = Object.keys(selectedTypeValues);

  attributes.forEach(function (item) {
    var attribute = item;
    var value = selectedTypeValues[attribute];
    adFormPrice.setAttribute(attribute, value);
  });
};

/**
 * При изменении значения одного из двух селектов времени, присваивает другому такое же
 * @param {evt} evt
 */
var onTimeSelectChange = function (evt) {
  var target = evt.target;

  target === adFormTimeIn ? adFormTimeOut.value = target.value : adFormTimeIn.value = target.value;
};

/**
 * Приводит страницу в "активное состояние". Блок карты и формы становятся доступными. На карте появляются "похожие" объявления (моки). Начинает работать дополнительная валидация форм
 */
var onPinMainClick = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  enableFormFields(adFormFields);
  enableFormFields(filtersFormFields);
  pinList.appendChild(pinFragment);

  pinMainPositionY += (PIN_MAIN_WIDTH / 2 + PIN_MAIN_TIP);
  setAdFormAddressCoordinates(getPinMainCoordinates());

  adFormOfferType.addEventListener('change', onOfferTypeChange);
  adFormTimeIn.addEventListener('change', onTimeSelectChange);
  adFormTimeOut.addEventListener('change', onTimeSelectChange);
  pinMain.removeEventListener('click', onPinMainClick);
};

/**
 * Делает все формы страницы неактивными, записывает начальные координаты главного пина, равные ее центру
 */
var disablePage = function () {
  setAdFormAddressCoordinates(getPinMainCoordinates());
  disableFormFields(adFormFields);
  disableFormFields(filtersFormFields);

  pinMain.addEventListener('click', onPinMainClick);
};

var map = document.querySelector('.map');
var pinList = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinFragment = document.createDocumentFragment();
var pinMain = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');
var adFormAddress = adForm.querySelector('#address');
var adFormOfferType = adForm.querySelector('#type');
var adFormPrice = adForm.querySelector('#price');
var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');
var filtersForm = document.querySelector('.map__filters');
var filtersFormFields = filtersForm.querySelectorAll('select, fieldset');
var pinMainPositionX = pinMain.offsetLeft + PIN_MAIN_WIDTH / 2;
var pinMainPositionY = pinMain.offsetTop + PIN_MAIN_WIDTH / 2;

getSimilarAds(OFFER_TOTAL).forEach(function (item) {
  var currentPin = item;
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = currentPin.location.x + 'px';
  pinElement.style.top = currentPin.location.y + 'px';
  pinElement.querySelector('img').src = currentPin.author.avatar;
  pinFragment.appendChild(pinElement);
});

disablePage();
