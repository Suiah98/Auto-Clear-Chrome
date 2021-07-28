// Función para configurar por primera vez
function installinit() {
  if (localStorage.getItem('install_time'))
    return;

  var now = new Date().getTime();
  localStorage.setItem('install_time', now);

  var hora = prompt("A qué hora quieres limpiar Chrome? (Historial , Descargas y Caché) (Formato 24hrs)");
  while (hora > 24 || hora < 0) {
    alert("Error , el número debe ser entre 0 y 24")
    var hora = prompt("A qué hora quieres limpiar Chrome? (Historial , Descargas y Caché) (Formato 24hrs)");
  }
  chrome.storage.local.set({ data: hora }, function () {
    alert('Listo! , La extensión limpiará Chrome a las ' + hora);
  });
}
installinit();

// Comprueba la última versión de Auto Clear Chrome
fetch('https://raw.githubusercontent.com/Suiah98/Auto-Clear-Chrome/main/CheckVersion.txt')
  .then(response => response.text())
  .then(data => {
    let versionactual = compare(data, chrome.app.getDetails().version);
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


// Función que comprueba la hora cada x tiempo y ejecuta la limpieza si es necesario
var a;
chrome.storage.local.get("data", function (item) {
  window.a = item["data"];
  var hour = parseInt(a, 10);

  setInterval(checkDate, 30 * 60 * 1000)

  function checkDate() {
    var date = new Date();
    if (date.getHours() === hour) {
      clearChrome();
      chrome.notifications.create('', {
        title: 'Tarea realizada',
        message: 'Chrome Limpiado correctamente',
        iconUrl: 'icon.png',
        type: 'basic'
      });
    }
  }
});

// Función que limpia Chrome
function clearChrome() {
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