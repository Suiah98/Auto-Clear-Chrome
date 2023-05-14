document.addEventListener('DOMContentLoaded', function() {
  // Obtener la frecuencia guardada al cargar la página
  chrome.storage.sync.get('clearFrequency', function(data) {
      let savedFrequency = data.clearFrequency;

      // Convertir la frecuencia de milisegundos a horas
      savedFrequency = savedFrequency / (60 * 60 * 1000);

      // Establecer la frecuencia guardada en el input
      document.getElementById('frequency').value = savedFrequency;
  });
});

document.getElementById('save').addEventListener('click', function() {
  let frequency = document.getElementById('frequency').value;
  // Convertir la frecuencia a milisegundos
  let clearFrequency = frequency * 60 * 60 * 1000;
  
  chrome.storage.sync.set({ 'clearFrequency': clearFrequency }, function() {
    console.log('Frecuencia de limpieza guardada: ' + clearFrequency);
  });
});
