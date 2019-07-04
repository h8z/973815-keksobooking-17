'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TOTAL = 8;
var PIN_WIDTH = 49.09;
var PIN_X_MIN = PIN_WIDTH;
var PIN_X_MAX = 1200 - PIN_WIDTH;
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;

/**
 * Возвращает случайный элемент массива
 * @param {array} arr
 * @return {string}
 */
var getRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
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
 * Возвращает массив объектов с тестовыми данными объявлений, используя другие функции
 * @param {number} count количество создаваемых объявлений
 * @return {array}
 */
var getSimilarAds = function (count) {
  var similarAds = [];

  for (var i = 1; i <= count; i++) {
    var similarAd = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'type': getRandElement(OFFER_TYPES)
      },
      'location': {
        'x': getRandMinMax(PIN_X_MIN, PIN_X_MAX),
        'y': getRandMinMax(PIN_Y_MIN, PIN_Y_MAX)
      }
    };

    similarAds.push(similarAd);
  }

  return similarAds;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinList = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var pinFragment = document.createDocumentFragment();

var similarAds = getSimilarAds(OFFER_TOTAL);

similarAds.forEach(function (item) {
  var currentPin = item;
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = currentPin.location.x + 'px';
  pinElement.style.top = currentPin.location.y + 'px';
  pinElement.querySelector('img').src = currentPin.author.avatar;

  pinFragment.appendChild(pinElement);
});

pinList.appendChild(pinFragment);
