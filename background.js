/* Función para configurar por primera vez
chrome.runtime.onInstalled.addListener(function (object) {
  let externalUrl = "index.html";

  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: externalUrl }, function (tab) {
    });
  }
});
*/

// Comprueba la última versión de Auto Clear Chrome
fetch('https://raw.githubusercontent.com/Suiah98/Auto-Clear-Chrome/main/CheckVersion.txt')
  .then(response => response.text())
  .then(data => {
    let versionactual = compare(data, chrome.runtime.getManifest().version);
    if (versionactual == 1) {
      var forumUrl = 'https://github.com/Suiah98/Auto-Clear-Chrome';
      var options = {
        type: "basic",
        title: "Nueva actualización!",
        message: "Disponible Auto Clear Chrome " + data,
        iconUrl: "icon.png"
      }
      chrome.notifications.create(forumUrl, options, function (notificationId) { });
      chrome.notifications.onClicked.addListener(function (notificationId) {
        chrome.tabs.create({ url: notificationId });
      });
    }
  });

// Función que compara la versión actual con la disponible en GitHub
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var a_components = a.split(".");
  var b_components = b.split(".");

  var len = Math.min(a_components.length, b_components.length);


  for (var i = 0; i < len; i++) {

    if (parseInt(a_components[i]) > parseInt(b_components[i])) {
      return 1;
    }


    if (parseInt(a_components[i]) < parseInt(b_components[i])) {
      return -1;
    }
  }


  if (a_components.length > b_components.length) {
    return 1;
  }

  if (a_components.length < b_components.length) {
    return -1;
  }

  return 0;
}

// Limpia Chrome cada 3 horas
  setInterval(clearChrome, 10800000);

// Función que limpia Chrome
function clearChrome() {
  console.log("Chrome Limpiado!")
  var millisecondsPerYear = 1000 * 60 * 60 * 24 * 365;
  var oneYearAgo = (new Date()).getTime() - millisecondsPerYear;
  chrome.browsingData.remove({
    "since": oneYearAgo
  }, {
    "appcache": true,
    "cache": true,
    "cacheStorage": true,
    "cookies": false,
    "downloads": true,
    "fileSystems": false,
    "formData": false,
    "history": true,
    "indexedDB": false,
    "localStorage": false,
    "passwords": false,
    "serviceWorkers": false,
    "webSQL": false
  });
}