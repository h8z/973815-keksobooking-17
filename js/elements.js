'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('fieldset');
  var adFormPrice = adForm.querySelector('#price');
  var adFormOfferType = adForm.querySelector('#type');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');

  window.elements = {
    map: map,
    adForm: {
      form: adForm,
      fields: adFormFields,
      price: adFormPrice,
      offerType: adFormOfferType,
      timeIn: adFormTimeIn,
      timeOut: adFormTimeOut
    }
  };
})();
