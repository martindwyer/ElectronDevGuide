const electron = require('electron');
const { ipcMain } = electron;
const { app, BrowserWindow, Menu } = electron;

let mainWindow, addWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed', () => app.quit());
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true, contextIsolation: false },
    width: 300,
    height: 200,
    title: 'Add New Task',
  });

  addWindow.loadURL(`file://${__dirname}/add.html`);

  addWindow.on('closed', () => (addWindow = null));
}

ipcMain.on('task:add', (evt, task) => {
  mainWindow.webContents.send('task:add', task);
  addWindow.close();
});

const menuTemplate = [
  {
    label: 'Task',
    submenu: [
      {
        label: 'New Task',
        click() {
          createAddWindow();
        },
      },
      {
        label: 'Clear Tasks',
        click() {
          mainWindow.webContents.send('task:clear');
        },
      },
      {
        label: 'Quit',
        accelerator: (() =>
          process.platform === 'darwin' ? 'Command+Q' : 'Control+Q')(),
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.platform === 'darwin') {
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Developer',
    submenu: [
      { role: 'reload' },
      {
        label: 'Toggle Dev Tools',
        accelerator:
          process.platform === 'darwin' ? 'Command+Alt+I' : 'Control+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}
