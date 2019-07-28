'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var houseType = filtersForm.querySelector('#housing-type');

  /**
   * Возвращает все объекты, содержащие текущее значение селекта типа жилья
   * @param {array} item
   * @return {array}
   */
  var filterType = function (item) {
    return houseType.value === 'any' ? item.offer.type : item.offer.type === houseType.value;
  };

  filtersForm.addEventListener('change', window.offers.update);

  window.filters = {
    type: filterType
  };
})();
