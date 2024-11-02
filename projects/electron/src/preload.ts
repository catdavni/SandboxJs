import { ipcRenderer } from 'electron';

// Debug preload script
// Trigger HMR to trigger debugger to attach (Dev tools must be open)
//debugger;

window.addEventListener('keydown', (e) => {
  console.log('preload vrum', e.key);
  if (e.key === 'F12') {
    ipcRenderer.send('toggleDevTools', 'MainWindow');
  }
});
