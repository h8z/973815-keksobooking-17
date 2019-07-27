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
    formTools.enableFields(filtersFields);
    window.backend.save(onSaveSuccess, formTools.error);

    adForm.offerType.addEventListener('change', formTools.onTypeChange);
    adForm.timeIn.addEventListener('change', formTools.onTimeChange);
    adForm.timeOut.addEventListener('change', formTools.onTimeChange);
    filtersForm.addEventListener('change', OnFiltersChange);
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
   * Обновляет маркеры предложений на карте, при изменении значений фильтров
   */
  var OnFiltersChange = function () {
    var updatedData = serverData.filter(window.filters.type);

    clearOffers();
    renderOffers(updatedData);
  };

  /**
   * Создает копию данных с сервера и вызывает рендеринг пинов при успешной загрузке данных
   * @param {array} data
   */
  var onSaveSuccess = function (data) {
    serverData = data;
    renderOffers(serverData);
  };

  var adForm = window.elements.adForm;
  var map = window.elements.map;
  var formTools = window.formTools;
  var pinList = map.querySelector('.map__pins');
  var pinMain = pinList.querySelector('.map__pin--main');
  var filtersForm = document.querySelector('.map__filters');
  var filtersFields = filtersForm.querySelectorAll('select, fieldset');
  var serverData = [];

  disablePage();

  pinMain.addEventListener('mousedown', window.pin.onMouseDown);

  window.initialisation = {
    init: enablePage
  };
})();
