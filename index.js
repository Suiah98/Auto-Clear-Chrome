var manifestData = chrome.runtime.getManifest();
var div = document.getElementById('version');

div.innerHTML += manifestData.version;