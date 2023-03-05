const { BrowserWindow } = require('electron');
const electron = require('electron');

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        backgroundThrottling: false,
      },
      width: 500,
      height: 800,
      frame: false,
      resizable: false,
      show: false,
    });
    this.loadURL(url);
  }
}

module.exports = MainWindow;
