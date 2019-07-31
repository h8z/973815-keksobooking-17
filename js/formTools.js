'use strict';

(function () {
  var HousePrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var CapacityMap = {
    '1': [1],
    '2': [2, 1],
    '3': [3, 2, 1],
    '100': [0]
  };

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
    adForm.price.min = HousePrice[adForm.offerType.value];
    adForm.price.placeholder = HousePrice[adForm.offerType.value];
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

  /**
   * Перебирает DOM коллекцию, добавляя класс 'hidden'
   * @param {domCollection} options
   */
  var removeOptions = function (options) {
    options.forEach(function (item) {
      item.setAttribute('class', 'hidden');
    });
  };

  /**
   * Обновляет класс 'hidden' у опций селекта кол-ва мест, в зависимости от селекта кол-ва комнат. Для работы использует мапу
   */
  var onRoomsChange = function () {
    var roomsCurrentValue = CapacityMap[rooms.value];

    removeOptions(capacityOptions);

    capacityOptions.forEach(function (item) {
      if (roomsCurrentValue.includes(parseInt(item.value, 10))) {
        item.classList.remove('hidden');
      }
    });
    capacity.value = CapacityMap[rooms.value][0];
  };

  var pageMain = document.querySelector('main');
  var adForm = window.elements.adForm;
  var adFormAddress = adForm.form.querySelector('#address');
  var rooms = adForm.form.querySelector('#room_number');
  var capacity = adForm.form.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');

  adForm.price.min = HousePrice['flat'];
  adForm.price.placeholder = HousePrice['flat'];

  removeOptions(capacityOptions);

  adForm.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.load(null, onSuccess, onError);
  });
  adForm.offerType.addEventListener('change', onOfferTypeChange);
  adForm.timeIn.addEventListener('change', onTimeSelectChange);
  adForm.timeOut.addEventListener('change', onTimeSelectChange);
  rooms.addEventListener('change', onRoomsChange);

  window.formTools = {
    setCoordinates: setAdFormAddressCoordinates,
    enableFields: enableFormFields,
    disableFields: disableFormFields,
    onTypeChange: onOfferTypeChange,
    onTimeChange: onTimeSelectChange,
    error: onError
  };
})();
