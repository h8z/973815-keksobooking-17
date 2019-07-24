'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

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
      if (xhr.status === 200) {
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

    xhr.timeout = 5000;

    return xhr;
  };

  /**
   *  Обработчик загрузки данных с сервера
   * @param {*} onSuccess
   * @param {*} onError
   */
  var getRequest = function (onSuccess, onError) {
    var xhr = setupRequest(onSuccess, onError);

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  /**
   * Обработчик отправки данных на сервер
   * @param {*} data
   * @param {*} onSuccess
   * @param {*} onError
   */
  var postRequest = function (data, onSuccess, onError) {
    var xhr = setupRequest(onSuccess, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  /**
   * Рендерит попап при ошибки отправке формы/получения данных с сервера
   */
  var onError = function () {
    var errorPopup = errorTemplate.cloneNode(true);
    pageMain.appendChild(errorPopup);
  };

  /**
   * Рендерит попап при успешной отправке формы
   */
  var onSuccess = function () {
    var successPopup = successTemplate.cloneNode(true);
    pageMain.appendChild(successPopup);
  };

  var pageMain = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  window.backend = {
    getRequest: getRequest,
    postRequest: postRequest,
    onError: onError,
    onSuccess: onSuccess
  };
})();
