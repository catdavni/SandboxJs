const el = require('electron');
const { ipcRenderer } = el;

window.addEventListener('keydown', (e) => {
  console.log(e.key);
  if (e.key === 'F12') {
    ipcRenderer.send('toggleDevTools', 'MainWindow');
  }
});