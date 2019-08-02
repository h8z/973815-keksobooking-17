'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var HouseType = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
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
    cardElement.querySelector('.popup__type').textContent = HouseType[data.offer.type.toUpperCase()];
    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = data.offer.description;
    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    cardElement.querySelector('.popup__close').addEventListener('click', closeCard);

    getCardPhotos(cardElement, data.offer.photos);
    getCardFeatures(cardElement, data.offer.features);

    document.addEventListener('keydown', onCardEscPress);

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

  var onCardEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  };

  /**
   * Запускает ф-цию удаления текущей карточки и рендерит новую
   * @param {array} data
   */
  var renderCard = function (data) {
    closeCard();

    map.insertBefore(getCard(data), filtersContainer);
  };

  /**
   * Проверяет открыта ли хотя бы 1 карточка, если да - удаляет ее а также модификатор --active класса пина, которым она была открыта
   */
  var closeCard = function () {
    var openedCard = map.querySelector('.map__card');
    var activePin = map.querySelector('.map__pin--active');

    if (openedCard) {
      openedCard.remove();
      document.removeEventListener('keydown', onCardEscPress);
    }

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var map = window.elements.map;
  var filtersContainer = map.querySelector('.map__filters-container');

  window.cards = {
    render: renderCard,
    close: closeCard
  };
})();
