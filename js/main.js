'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TOTAL = 8;
var PIN_X_MIN = 50;
var PIN_X_MAX = 1150;
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;

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

var map = document.querySelector('.map');
var pinList = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var pinFragment = document.createDocumentFragment();

getSimilarAds(OFFER_TOTAL).forEach(function (item) {
  var currentPin = item;
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = currentPin.location.x + 'px';
  pinElement.style.top = currentPin.location.y + 'px';
  pinElement.querySelector('img').src = currentPin.author.avatar;

  pinFragment.appendChild(pinElement);
});

pinList.appendChild(pinFragment);

map.classList.remove('map--faded');
