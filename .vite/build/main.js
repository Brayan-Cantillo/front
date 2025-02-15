"use strict";
const electron = require("electron");
const path = require("path");
if (require("electron-squirrel-startup")) {
  electron.app.quit();
}
const createWindow = () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new electron.BrowserWindow({
    width,
    height,
    icon: path.join(__dirname, "../assets/favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
    autoHideMenuBar: true
  });
  {
    mainWindow.loadURL("http://localhost:5173");
  }
};
electron.app.on("ready", createWindow);
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
