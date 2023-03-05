const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/TimerTray');
const MainWindow = require('./app/MainWindow');

const { app, ipcMain } = electron;

let mainWindow, tray, trayMenu;

app.on('ready', () => {
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === 'darwin'
      ? 'iconTemplate@2x.png'
      : 'windows-icon@2x.png';

  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('update-timer', (event, timeLeft) => {
  tray.setTitle(timeLeft);
});
