'use strict';

(function () {
  /**
   * Возвращает случайный элемент массива
   * @param {array} arr
   * @return {string}
   */
  var getRandElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  /**
   * Возвращает случайное число в заданном диапазоне
   * @param {number} min мин. значение
   * @param {number} max макс. значение
   * @return {number}
   */
  var getRandMinMax = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  window.utils = {
    randElement: getRandElement,
    randMinMax: getRandMinMax
  };
})();
