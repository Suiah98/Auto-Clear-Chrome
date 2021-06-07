function installinit() {
  if (localStorage.getItem('install_time'))
    return;

  var now = new Date().getTime();
  localStorage.setItem('install_time', now);

  var hora = prompt("A qué hora quieres que se limpie Chrome? (Historial , Descargas y Caché) (formato 24hrs)");
  chrome.storage.local.set({ data: hora }, function () {
    alert('Okay! , La extensión limpiará Chrome a las ' + hora);
  });
}
installinit();

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