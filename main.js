// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, Notification, ipcMain, dialog } = require('electron')
const {download} = require("electron-dl");
// const dialog = electron.dialog;

const path = require('path')
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
  }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}
ipcMain.on("download", (event, info) => {
  info.properties.onProgress = status => event.sender.send("download progress", status);
  download(BrowserWindow.getFocusedWindow(), info.url, info.properties)
      .then(dl => event.sender.send("download complete", dl.getSavePath()));
});
// const NOTIFICATION_TITLE = 'Basic Notification'
// const NOTIFICATION_BODY = 'Notification from the Main process'

// function showNotification () {
//   new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
// }
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  createWindow()
//   ipcMain.on("download", (event, info) => {
//     download(BrowserWindow.getFocusedWindow(), info.url, info.properties)
//         .then(dl => 
//           // window.webContents.send("download complete", dl.getSavePath())
//         console.log("hello")
//         );
// });

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.