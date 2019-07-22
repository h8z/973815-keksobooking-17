'use strict';

(function () {
  /**
   * Приводит страницу в "активное состояние". Блок карты и формы становятся доступными. На карте появляются "похожие" объявления (моки). Начинает работать дополнительная валидация форм
   */
  var enablePage = function () {
    map.classList.remove('map--faded');
    adForm.form.classList.remove('ad-form--disabled');
    adForm.price.min = window.constants.houseType['flat'];
    adForm.price.placeholder = window.constants.houseType['flat'];
    formTools.enableFields(adForm.fields);
    formTools.enableFields(filtersFormFields);
    pinList.appendChild(window.pinFragment);

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

  disablePage();

  pinMain.addEventListener('mousedown', window.pin.onMouseDown);

  window.enablePage = enablePage;
})();
