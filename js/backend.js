'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var SUCCESS_CODE = 200;

  /**
   * Обрабатывает xhr-запрос на удаленный сервер
   * @param {callback} onSuccess
   * @param {callback} onError
   * @return {xhr}
   */
  var setupRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  /**
   *  Обработчик загрузки данных с сервера
   * @param {callback} onSuccess
   * @param {callback} onError
   */
  var getRequest = function (onSuccess, onError) {
    var xhr = setupRequest(onSuccess, onError);

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  /**
   * Обработчик отправки данных на сервер
   * @param {object} data
   * @param {callback} onSuccess
   * @param {callback} onError
   */
  var postRequest = function (data, onSuccess, onError) {
    var xhr = setupRequest(onSuccess, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    save: getRequest,
    load: postRequest
  };
})();
