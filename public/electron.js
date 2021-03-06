const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

// Initializing the Electron Window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1080, // width of window
    height: 768, // height of window
    webPreferences: {
      // The preload file where we will perform our app communication
      preload: isDev
        ? path.join(app.getAppPath(), './public/api/preload.js') // Loading it from the public folder for dev
        : path.join(app.getAppPath(), './build/api/preload.js'), // Loading it from the build folder for production
      worldSafeExecuteJavaScript: true, // If you're using Electron 12+, this should be enabled by default and does not need to be added here.
      contextIsolation: true, // Isolating context so our app is not exposed to random javascript executions making it safer.
      // nodeIntegration: true,
    },
  });

  // Loading a webpage inside the electron window we just created
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000' // Loading localhost if dev mode
      : `file://${path.join(__dirname, '../build/index.html')}` // Loading build file if in production
  );

  // Setting Window Icon - Asset file needs to be in the public/images folder.
  mainWindow.setIcon(path.join(__dirname, 'icons/mail_sender.png'));

  // In development mode, if the window has loaded, then load the dev tools.
  if (isDev) {
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    });
  }
};

// === DB ===
require('./api/database');

// === Controllers ===
require('./api/controllers');

// ((OPTIONAL)) Setting the location for the userdata folder created by an Electron app. It default to the AppData folder if you don't set it.
app.setPath(
  'userData',
  isDev
    ? path.join(app.getAppPath(), 'userdata/') // In development it creates the userdata folder where package.json is
    : path.join(process.resourcesPath, 'userdata/') // In production it creates userdata folder in the resources folder
);

// When the app is ready to load
app.whenReady().then(async () => {
  await createWindow(); // Create the mainWindow
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Logging any exceptions
process.on('uncaughtException', (error) => {
  console.log(`Exception: ${error}`);
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
