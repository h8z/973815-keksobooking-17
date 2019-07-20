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

    if (target === window.elements.adFormTimeIn) {
      window.elements.adFormTimeOut.value = target.value;
    } else {
      window.elements.adFormTimeIn.value = target.value;
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
   * При изменении значения селекта "Тип жилья", также меняет атрибуты min и placeholder у инпута цены в соотв. со словарем offerType
   */
  var onOfferTypeChange = function () {
    window.elements.adFormPrice.min = window.constants.offerType[window.elements.adFormOfferType.value].minPrice;
    window.elements.adFormPrice.placeholder = window.constants.offerType[window.elements.adFormOfferType.value].minPrice;
  };

  var adFormAddress = window.elements.adForm.querySelector('#address');

  window.form = {
    setAdFormAddressCoordinates: setAdFormAddressCoordinates,
    enableFormFields: enableFormFields,
    disableFormFields: disableFormFields,
    onOfferTypeChange: onOfferTypeChange,
    onTimeSelectChange: onTimeSelectChange
  };
})();
