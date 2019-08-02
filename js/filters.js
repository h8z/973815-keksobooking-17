'use strict';

(function () {
  var PriceMap = {
    MIN: 10000,
    MAX: 50000
  };

  /**
   * Возвращает все объекты, соотв. текущему значению селекта типа жилья
   * @param {array} item
   * @return {array}
   */
  var filterType = function (item) {
    return typeSelect.value === 'any' ? item.offer.type : item.offer.type === typeSelect.value;
  };

  /**
   * Возвращает все объекты, соотв. текущему значению селекта количества комнат
   * @param {array} item
   * @return {array}
   */
  var filterRooms = function (item) {
    return roomsSelect.value === 'any' ? item.offer.rooms : item.offer.rooms === parseInt(roomsSelect.value, 10);
  };

  /**
   * Возвращает все объекты, соотв. текущему значению селекта количества комнат
   * @param {array} item
   * @return {array}
   */
  var filterGuests = function (item) {
    return guestsSelect.value === 'any' ? item.offer.guests : item.offer.guests === parseInt(guestsSelect.value, 10);
  };

  /**
   * Возвращает все объекты, соотв. текущему значению селекта цены
   * @param {array} item
   * @return {array}
   */
  var filterPrice = function (item) {
    if (priceSelect.value !== 'any') {
      var price;
      if (item.offer.price < PriceMap.MIN) {
        price = 'low';
      } else if (item.offer.price >= PriceMap.MIN && item.offer.price <= PriceMap.MAX) {
        price = 'middle';
      } else if (item.offer.price > PriceMap.MAX) {
        price = 'high';
      }
      return priceSelect.value === price;
    } else {
      return item;
    }
  };

  /**
   * Возвращает все объекты, соотв. активным чекбоксам удобств
   * @param {array} item
   * @return {array}
   */
  var filterFeatures = function (item) {
    var checkedFeatures = Array.from(filters.querySelectorAll('.map__checkbox:checked'));

    return checkedFeatures.every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  /**
   * Возвращает все объекты, соотв. всем фильтрам одновременно
   * @param {array} item
   * @return {array}
   */
  var filterAll = function (item) {
    return filterType(item) && filterRooms(item) && filterGuests(item) && filterPrice(item) && filterFeatures(item);
  };

  var filters = document.querySelector('.map__filters');
  var typeSelect = filters.querySelector('#housing-type');
  var priceSelect = filters.querySelector('#housing-price');
  var roomsSelect = filters.querySelector('#housing-rooms');
  var guestsSelect = filters.querySelector('#housing-guests');

  filters.addEventListener('change', window.offers.update);

  window.filters = {
    form: filters,
    all: filterAll
  };
})();
