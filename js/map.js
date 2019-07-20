'use strict';

(function () {
  /**
   * Приводит страницу в "активное состояние". Блок карты и формы становятся доступными. На карте появляются "похожие" объявления (моки). Начинает работать дополнительная валидация форм
   */
  var enablePage = function () {
    window.elements.map.classList.remove('map--faded');
    window.elements.adForm.classList.remove('ad-form--disabled');
    window.elements.adFormPrice.min = window.constants.offerType['flat'].minPrice;
    window.elements.adFormPrice.placeholder = window.constants.offerType['flat'].minPrice;
    window.form.enableFormFields(window.elements.adFormFields);
    window.form.enableFormFields(filtersFormFields);
    pinList.appendChild(window.mocks.pinFragment);

    window.elements.adFormOfferType.addEventListener('change', window.form.onOfferTypeChange);
    window.elements.adFormTimeIn.addEventListener('change', window.form.onTimeSelectChange);
    window.elements.adFormTimeOut.addEventListener('change', window.form.onTimeSelectChange);
  };

  /**
   * Делает все формы страницы неактивными, записывает начальные координаты главного пина, равные ее центру
   */
  var disablePage = function () {
    window.form.setAdFormAddressCoordinates(window.pin.getPinMainCoordinates());
    window.form.disableFormFields(window.elements.adFormFields);
    window.form.disableFormFields(filtersFormFields);
  };

  var pinMain = window.elements.map.querySelector('.map__pin--main');
  var pinList = window.elements.map.querySelector('.map__pins');
  var filtersFormFields = window.elements.filtersForm.querySelectorAll('select, fieldset');

  disablePage();

  pinMain.addEventListener('mousedown', window.pin.onPinMouseDown);

  window.map = {enablePage: enablePage};
})();
