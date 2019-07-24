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
    window.backend.getRequest(getOffers, window.backend.renderError);

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

  var adForm = window.elements.adForm;
  var map = window.elements.map;
  var formTools = window.formTools;
  var pinMain = map.querySelector('.map__pin--main');
  var pinList = map.querySelector('.map__pins');
  var filtersForm = document.querySelector('.map__filters');
  var filtersFormFields = filtersForm.querySelectorAll('select, fieldset');

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

  disablePage();

  pinMain.addEventListener('mousedown', window.pin.onMouseDown);

  window.enablePage = enablePage;
})();
