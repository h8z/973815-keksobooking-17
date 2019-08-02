'use strict';

(function () {
  /**
   * Приводит страницу в "активное состояние". Блок карты и формы становятся доступными. На карте появляются другие объявления. Начинает работать дополнительная валидация форм
   */
  var enablePage = function () {
    map.classList.remove('map--faded');
    adForm.form.classList.remove('ad-form--disabled');
    formTools.enableFields(adForm.fields);
    formTools.enableFields(filtersFields);
    window.backend.save(window.offers.save, formTools.error);
  };

  /**
   * Делает все формы страницы неактивными, записывает начальные координаты главного пина, равные ее центру
   */
  var disablePage = function () {
    formTools.setCoordinates(window.pin.getCoordinates());
    formTools.disableFields(adForm.fields);
    formTools.disableFields(filtersFields);
  };

  /**
   * Приводит страницу к начальному состоянию, как при первой загрузке
   */
  var resetPage = function () {
    map.classList.add('map--faded');
    adForm.form.classList.add('ad-form--disabled');
    window.pin.resetCoordinates();

    window.cards.close();
    window.offers.clear();
    disablePage();
  };

  var map = window.elements.map;
  var adForm = window.elements.adForm;
  var formTools = window.formTools;
  var filtersForm = document.querySelector('.map__filters');
  var filtersFields = filtersForm.querySelectorAll('select, fieldset');

  disablePage();

  window.initialisation = {
    enable: enablePage,
    reset: resetPage
  };
})();
