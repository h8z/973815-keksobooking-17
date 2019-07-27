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
    window.backend.save(getOffers, onError);

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
   * Наполняет карту маркерами других предложений
   * @param {array} data
   */
  var getOffers = function (data) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinFragment = document.createDocumentFragment();

    data.forEach(function (item) {
      var currentPin = item;
      var pinElement = pinTemplate.cloneNode(true);

      pinElement.style.left = currentPin.location.x + 'px';
      pinElement.style.top = currentPin.location.y + 'px';
      pinElement.querySelector('img').src = currentPin.author.avatar;
      pinFragment.appendChild(pinElement);
    });

    pinList.appendChild(pinFragment);
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
