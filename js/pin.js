'use strict';

(function () {
  var PinConfig = {
    WIDTH: 62,
    TIP: 18,
    X_MIN: 0,
    X_MAX: 1138,
    Y_MIN: 50,
    Y_MAX: 550,
    X_DEFAULT: 570,
    Y_DEFAULT: 375
  };

  /**
   * Возвращает объект с координатами главного пина
   * @param {Boolean} isCenter true - координаты равны середине пина; false || отсутствие параметра - место, куда метка указывает своим острым концом
   * @return {object}
   */
  var getPinMainCoordinates = function (isCenter) {
    var pinMainPositionX = pinMain.offsetLeft + PinConfig.WIDTH / 2;
    var pinMainPositionY = pinMain.offsetTop + PinConfig.WIDTH / 2;
    var pinMainPositionYtip = pinMain.offsetTop + PinConfig.WIDTH + PinConfig.TIP;

    return isCenter ? {x: pinMainPositionX, y: pinMainPositionY} : {x: pinMainPositionX, y: pinMainPositionYtip};
  };

  /**
   * Перемещает главный пин на исходное положение
   */
  var resetPinMainCoordinates = function () {
    pinMain.style.left = PinConfig.X_DEFAULT + 'px';
    pinMain.style.top = PinConfig.Y_DEFAULT + 'px';
  };

  /**
   * Записывает координаты центрального маркера в переменную, активирует обработчики перемещения мыши и отжатия клавиши
   * @param {evt} evt
   */
  var onPinMouseDown = function (evt) {
    evt.preventDefault();

    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  };

  /**
 * Расчитывает и записывает координаты перемещения. Проверяет чтобы маркер не оказался на пределами карты. Записывет итоговые координаты в инпут адреса формы
 * @param {evt} evt
 */
  var onPinMouseMove = function (evt) {
    evt.preventDefault();

    shiftCoords.x = startCoords.x - evt.clientX;
    shiftCoords.y = startCoords.y - evt.clientY;
    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;

    pinMain.style.top = (pinMain.offsetTop - shiftCoords.y) + 'px';
    pinMain.style.left = (pinMain.offsetLeft - shiftCoords.x) + 'px';

    if (pinMain.offsetTop - shiftCoords.y < PinConfig.Y_MIN) {
      pinMain.style.top = PinConfig.Y_MIN + 'px';
    } else if (pinMain.offsetTop - shiftCoords.y > PinConfig.Y_MAX) {
      pinMain.style.top = PinConfig.Y_MAX + 'px';
    } else if (pinMain.offsetLeft - shiftCoords.x < PinConfig.X_MIN) {
      pinMain.style.left = PinConfig.X_MIN;
    } else if (pinMain.offsetLeft - shiftCoords.x > PinConfig.X_MAX) {
      pinMain.style.left = PinConfig.X_MAX + 'px';
    }

    window.formTools.setCoordinates(getPinMainCoordinates());
  };

  /**
   * Завершает цикл перемещения маркера по карте, запускает активацию страницы
   * @param {evt} evt
   */
  var onPinMouseUp = function (evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
    window.initialisation.enable();
  };

  var pinMain = window.elements.map.querySelector('.map__pin--main');
  var startCoords = {x: 0, y: 0};
  var shiftCoords = {x: 0, y: 0};

  pinMain.addEventListener('mousedown', onPinMouseDown);

  window.pin = {
    getCoordinates: getPinMainCoordinates,
    resetCoordinates: resetPinMainCoordinates
  };
})();
