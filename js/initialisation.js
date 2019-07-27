'use strict';

(function () {
  /**
   * Приводит страницу в "активное состояние". Блок карты и формы становятся доступными. На карте появляются другие объявления. Начинает работать дополнительная валидация форм
   */
  var enablePage = function () {
    map.classList.remove('map--faded');
    adForm.form.classList.remove('ad-form--disabled');
    adForm.price.min = window.constants.houseType['flat'];
    adForm.price.placeholder = window.constants.houseType['flat'];
    formTools.enableFields(adForm.fields);
    formTools.enableFields(filtersFormFields);
    window.backend.save(renderOffers, onError);

    adForm.offerType.addEventListener('change', formTools.onTypeChange);
    adForm.timeIn.addEventListener('change', formTools.onTimeChange);
    adForm.timeOut.addEventListener('change', formTools.onTimeChange);
  };

  /**
   * Делает все формы страницы неактивными, записывает начальные координаты главного пина, равные ее центру
   */
  var disablePage = function () {
    formTools.setCoordinates(window.pin.getCoordinates());
    formTools.disableFields(adForm.fields);
    formTools.disableFields(filtersFormFields);
  };

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

    return pinElement;
  };

  /**
   * Добавляет на карту 5 маркеров предложений, используя фрагмент
   * @param {array} data
   */
  var renderOffers = function (data) {
    var pinFragment = document.createDocumentFragment();

    data.slice(0, 5).forEach(function (item) {
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
   * Рендерит попап при ошибке отправки формы/получения данных с сервера
   */
  var onError = function () {
    var errorPopup = errorTemplate.cloneNode(true);
    pageMain.appendChild(errorPopup);
  };

  /**
   * Рендерит попап при успешной отправке формы
   */
  var onSuccess = function () {
    var successPopup = successTemplate.cloneNode(true);
    pageMain.appendChild(successPopup);
  };

  var adForm = window.elements.adForm;
  var map = window.elements.map;
  var formTools = window.formTools;
  var pageMain = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var pinList = map.querySelector('.map__pins');
  var pinMain = pinList.querySelector('.map__pin--main');
  var filtersForm = document.querySelector('.map__filters');
  var filtersFormFields = filtersForm.querySelectorAll('select, fieldset');

  disablePage();

  pinMain.addEventListener('mousedown', window.pin.onMouseDown);

  window.initialisation = {
    init: enablePage,
    error: onError,
    success: onSuccess
  };
})();
