'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('fieldset');
  var adFormPrice = adForm.querySelector('#price');
  var adFormOfferType = adForm.querySelector('#type');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var filtersForm = document.querySelector('.map__filters');

  window.elements = {
    map: map,
    adForm: adForm,
    adFormFields: adFormFields,
    adFormPrice: adFormPrice,
    adFormOfferType: adFormOfferType,
    adFormTimeIn: adFormTimeIn,
    adFormTimeOut: adFormTimeOut,
    filtersForm: filtersForm
  };
})();
