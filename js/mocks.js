'use strict';

(function () {
  var OFFER_TOTAL = 8;

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
        'type': utils.getRandElement(Object.keys(window.constants.houseType))
      },
      'location': {
        'x': utils.getRandMinMax(mapConfig.PIN_X_MIN, mapConfig.PIN_X_MAX),
        'y': utils.getRandMinMax(mapConfig.PIN_Y_MIN, mapConfig.PIN_Y_MAX)
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

  var mapConfig = window.constants.mapConfig;
  var utils = window.utils;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();

  getSimilarAds(OFFER_TOTAL).forEach(function (item) {
    var currentPin = item;
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = currentPin.location.x + 'px';
    pinElement.style.top = currentPin.location.y + 'px';
    pinElement.querySelector('img').src = currentPin.author.avatar;
    pinFragment.appendChild(pinElement);
  });

  window.pinFragment = pinFragment;
})();
