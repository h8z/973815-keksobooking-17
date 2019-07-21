'use strict';

(function () {
  var PIN_MAIN_WIDTH = 62;
  var PIN_MAIN_TIP = 22;

  /**
   * Возвращает объект с координатами главного пина
   * @param {Boolean} isCenter true - координаты равны середине пина; false || отсутствие параметра - место, куда метка указывает своим острым концом
   * @return {object}
   */
  var getPinMainCoordinates = function (isCenter) {
    var pinMainPositionX = pinMain.offsetLeft + PIN_MAIN_WIDTH / 2;
    var pinMainPositionY = pinMain.offsetTop + PIN_MAIN_WIDTH / 2;

    return isCenter ? {x: pinMainPositionX, y: pinMainPositionY + PIN_MAIN_TIP} : {x: pinMainPositionX, y: pinMainPositionY};
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

    if (pinMain.offsetTop - shiftCoords.y < mapConfig.PIN_Y_MIN) {
      pinMain.style.top = mapConfig.PIN_Y_MIN + 'px';
    } else if (pinMain.offsetTop - shiftCoords.y > mapConfig.PIN_Y_MAX) {
      pinMain.style.top = mapConfig.PIN_Y_MAX + 'px';
    } else if (pinMain.offsetLeft - shiftCoords.x < mapConfig.PIN_X_MIN) {
      pinMain.style.left = mapConfig.PIN_X_MIN;
    } else if (pinMain.offsetLeft - shiftCoords.x > mapConfig.PIN_X_MAX) {
      pinMain.style.left = mapConfig.PIN_X_MAX + 'px';
    }

    window.formTools.setCoordinates(getPinMainCoordinates(true));
  };

  /**
   * Завершает цикл перемещения маркера по карте, запускает активацию страницы
   * @param {evt} evt
   */
  var onPinMouseUp = function (evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
    window.enablePage();
  };

  var mapConfig = window.constants.mapConfig;
  var pinMain = window.elements.map.querySelector('.map__pin--main');
  var startCoords = {x: 0, y: 0};
  var shiftCoords = {x: 0, y: 0};

  window.pin = {
    getCoordinates: getPinMainCoordinates,
    onMouseDown: onPinMouseDown
  };
})();
