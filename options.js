document.addEventListener('DOMContentLoaded', function () {
  // Obtener la frecuencia guardada al cargar la página
  chrome.storage.sync.get('clearFrequency', function (data) {
    let savedFrequency = data.clearFrequency;

    // Convertir la frecuencia de milisegundos a horas
    savedFrequency = savedFrequency / (60 * 60 * 1000);

    // Establecer la frecuencia guardada en el input
    document.getElementById('frequency').value = savedFrequency;
  });
});

function validateInput() {
  var input = document.getElementById("frequency").value;
  var parsed = parseInt(input);

  if (parsed != input || parsed < 1 || parsed > 1000) {
    alert("Por favor, ingrese un número entero entre 1 y 1000.");
    return false;
  } else {
    return true;
  }
}

document.getElementById('save').addEventListener('click', function (event) {
  event.preventDefault();  // Previene la acción por defecto del botón

  if (validateInput()) {
    let frequency = document.getElementById('frequency').value;

    // Convertir la frecuencia a milisegundos
    let clearFrequency = frequency * 60 * 60 * 1000;

    // Guardar la nueva frecuencia
    chrome.storage.sync.set({ 'clearFrequency': clearFrequency }, function () {
      console.log('Frecuencia de limpieza guardada: ' + clearFrequency);
    });

    // Actualizar la alarma con la nueva frecuencia
    chrome.alarms.create('clearChrome', { periodInMinutes: clearFrequency / (60 * 1000) });
  }
});