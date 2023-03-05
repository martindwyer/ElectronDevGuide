const electron = require('electron');
const { Tray, Menu, app } = electron;

class TimerTray extends Tray {
  trayMenu;

  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.trayMenu = Menu.buildFromTemplate([
      {
        label: 'Open',
        click() {
          mainWindow.setPosition(3100, 50);
          mainWindow.show();
        },
      },
      {
        label: 'Close',
        click() {
          mainWindow.hide();
        },
      },
      {
        label: 'Quit',
        click() {
          app.quit();
        },
      },
    ]);
    this.setContextMenu(this.trayMenu);
    this.setToolTip('Timer App');
  }
}

module.exports = TimerTray;
