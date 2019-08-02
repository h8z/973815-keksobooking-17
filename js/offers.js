'use strict';

(function () {
  var OFFERS_TOTAL = 5;

  /**
   * Возвращает склонированный темплейт маркера предложения, заполняя его прокинутыми через параметр данными
   * @param {object} offer
   * @return {HTMLButtonElement}
   */
  var getOffers = function (offer) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = offer.location.x + 'px';
    pinElement.style.top = offer.location.y + 'px';
    pinElement.querySelector('img').src = offer.author.avatar;

    pinElement.addEventListener('click', function () {
      window.cards.render(offer);
      pinElement.classList.add('map__pin--active');
    });

    return pinElement;
  };

  /**
   * Добавляет на карту 5 маркеров предложений, используя фрагмент
   * @param {array} data
   */
  var renderOffers = function (data) {
    var pinFragment = document.createDocumentFragment();

    data.slice(0, OFFERS_TOTAL).forEach(function (item) {
      pinFragment.appendChild(getOffers(item));
    });

    pinList.appendChild(pinFragment);
  };

  /**
   * Удаляет все маркеры предложений на карте из исключением главного
   */
  var clearOffers = function () {
    var pins = pinList.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  /**
   * Обновляет маркеры предложений на карте, при изменении значений фильтров
   */
  var updateOffers = function () {
    var updatedData = serverData.filter(window.filters.type);

    clearOffers();
    renderOffers(updatedData);
  };

  /**
   * Создает копию данных с сервера и вызывает рендеринг пинов и карточек предложений при успешной загрузке данных
   * @param {array} data
   */
  var onSaveSuccess = function (data) {
    serverData = data;
    updateOffers(serverData);
  };

  var map = window.elements.map;
  var pinList = map.querySelector('.map__pins');
  var serverData = [];

  window.offers = {
    save: onSaveSuccess,
    update: updateOffers,
    clear: clearOffers
  };
})();
