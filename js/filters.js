'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var houseType = filters.querySelector('#housing-type');

  /**
   * Возвращает все объекты, содержащие текущее значение селекта типа жилья
   * @param {array} item
   * @return {array}
   */
  var filterType = function (item) {
    return houseType.value === 'any' ? item.offer.type : item.offer.type === houseType.value;
  };

  window.filters = {
    type: filterType
  };
})();
