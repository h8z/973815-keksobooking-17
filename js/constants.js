'use strict';

(function () {
  var PIN_X_MIN = 0;
  var PIN_X_MAX = 1138;
  var PIN_Y_MIN = 130;
  var PIN_Y_MAX = 630;
  var offerType = {
    bungalo: {minPrice: 0},
    flat: {minPrice: 1000},
    house: {minPrice: 5000},
    palace: {minPrice: 10000}
  };

  window.constants = {
    PIN_X_MIN: PIN_X_MIN,
    PIN_X_MAX: PIN_X_MAX,
    PIN_Y_MIN: PIN_Y_MIN,
    PIN_Y_MAX: PIN_Y_MAX,
    offerType: offerType
  };
})();
