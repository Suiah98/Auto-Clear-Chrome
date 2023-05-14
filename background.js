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

// Función que se dispara cuando se instala la extensión
chrome.runtime.onInstalled.addListener(function (object) {
  // La URL de la página de opciones
  let optionsUrl = "settings.html";

  // La frecuencia de limpieza predeterminada (3 horas)
  let defaultFrequency = 3 * 60 * 60 * 1000; // 3 horas en milisegundos

  // Establecer la frecuencia de limpieza predeterminada
  chrome.storage.sync.set({ 'clearFrequency': defaultFrequency }, function () {
    console.log('Frecuencia de limpieza predeterminada establecida: ' + defaultFrequency);

    // Crear una alarma con la frecuencia de limpieza
    chrome.alarms.create('clearChrome', { periodInMinutes: defaultFrequency / (60 * 1000) });
  });

  // Comprueba si la razón de la instalación es porque la extensión fue instalada
  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    // Si es así, crea una nueva pestaña con la página de opciones
    chrome.tabs.create({ url: optionsUrl }, function (tab) {
    });
  }
});

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

// Escucha la alarma y ejecuta la función clearChrome
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === 'clearChrome') {
    clearChrome();
  }
});