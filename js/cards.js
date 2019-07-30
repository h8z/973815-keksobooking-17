'use strict';

(function () {
  var HouseType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  /**
   * Возвращает склонированный темплейт карточки предложения
   * @param {object} data
   * @return {HTMLArticleElement}
   */
  var getCard = function (data) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = HouseType[data.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = data.offer.description;
    cardElement.querySelector('.popup__avatar').src = data.author.avatar;

    getCardPhotos(cardElement, data.offer.photos);
    getCardFeatures(cardElement, data.offer.features);

    return cardElement;
  };

  /**
   * Удаляет все дочерние элементы списку удобств, добавляет новые на основе переданного массива
   * @param {HTMLArticleElement} card
   * @param {array} data
   */
  var getCardFeatures = function (card, data) {
    var features = card.querySelector('.popup__features');

    data.forEach(function (type) {
      var feature = document.createElement('li');

      feature.classList.add('popup__feature', 'popup__feature--' + type);
      features.appendChild(feature);
    });
  };

  /**
   * Добавляет новые фото на основе шаблона, подставляя ссылки из массива, передаваемого параметром. В конце удаляет шаблон
   * @param {HTMLArticleElement} card
   * @param {array} data
   */
  var getCardPhotos = function (card, data) {
    var photoCollection = card.querySelector('.popup__photos');

    data.forEach(function (path) {
      var photo = photoCollection.querySelector('.popup__photo').cloneNode(true);

      photo.src = path;
      photoCollection.appendChild(photo);
    });

    photoCollection.removeChild(photoCollection.children[0]);
  };

  /**
   * Рендерит карторчки в блок карты, использует фрагмент
   * @param {array} data массив объектов с сервера
   */
  var renderCards = function (data) {
    var cardFragment = document.createDocumentFragment();

    data.slice(0, 1).forEach(function (card) { // slice временно для отображения лишь одной карточки
      cardFragment.appendChild(getCard(card));
    });

    map.insertBefore(cardFragment, filtersContainer);
  };

  var map = window.elements.map;
  var filtersContainer = map.querySelector('.map__filters-container');

  window.renderCards = renderCards;
})();
