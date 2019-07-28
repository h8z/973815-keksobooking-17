'use strict';

(function () {
  /**
   * Перебирает DOM коллекцию, активирует элементы, удаляя атрибут 'disabled'
   * @param {domCollection} domCollection
   */
  var enableFormFields = function (domCollection) {
    domCollection.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  /**
   * Перебирает DOM коллекцию, деактивирует элементы, добавляя атрибут 'disabled'
   * @param {domCollection} domCollection
   */
  var disableFormFields = function (domCollection) {
    domCollection.forEach(function (item) {
      item.setAttribute('disabled', '');
    });
  };

  /**
   * При изменении значения одного из двух селектов времени, присваивает другому такое же
   * @param {evt} evt
   */
  var onTimeSelectChange = function (evt) {
    var target = evt.target;

    if (target === adForm.timeIn) {
      adForm.timeOut.value = target.value;
    } else {
      adForm.timeIn.value = target.value;
    }
  };

  /**
   * Записывает переданные в виде объекта координаты в соотв. инпут
   * @param {object} coordinates
   */
  var setAdFormAddressCoordinates = function (coordinates) {
    adFormAddress.value = coordinates.x + ', ' + coordinates.y;
  };

  /**
   * При изменении значения селекта "Тип жилья", также меняет атрибуты min и placeholder у инпута цены в соотв. со словарем houseType (модуль constants.js)
   */
  var onOfferTypeChange = function () {
    adForm.price.min = window.constants.houseType[adForm.offerType.value];
    adForm.price.placeholder = window.constants.houseType[adForm.offerType.value];
  };

  /**
   * Рендерит попап при ошибке отправки формы
   */
  var onError = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorPopup = errorTemplate.cloneNode(true);

    pageMain.appendChild(errorPopup);
  };

  /**
   * Рендерит попап при успешной отправке формы
   */
  var onSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successPopup = successTemplate.cloneNode(true);

    pageMain.appendChild(successPopup);
  };

  var adForm = window.elements.adForm;
  var adFormAddress = adForm.form.querySelector('#address');
  var pageMain = document.querySelector('main');

  adForm.price.min = window.constants.houseType['flat'];
  adForm.price.placeholder = window.constants.houseType['flat'];

  adForm.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.load(null, onSuccess, onError);
  });
  adForm.offerType.addEventListener('change', onOfferTypeChange);
  adForm.timeIn.addEventListener('change', onTimeSelectChange);
  adForm.timeOut.addEventListener('change', onTimeSelectChange);

  window.formTools = {
    setCoordinates: setAdFormAddressCoordinates,
    enableFields: enableFormFields,
    disableFields: disableFormFields,
    onTypeChange: onOfferTypeChange,
    onTimeChange: onTimeSelectChange,
    error: onError
  };
})();
