"use strict";const e=require("electron"),i=require("path");require("electron-squirrel-startup")&&e.app.quit();const n=()=>{const{width:r,height:o}=e.screen.getPrimaryDisplay().workAreaSize;new e.BrowserWindow({width:r,height:o,icon:i.join(__dirname,"../assets/favicon.ico"),webPreferences:{preload:i.join(__dirname,"preload.js")},autoHideMenuBar:!0}).loadFile(i.join(__dirname,"../renderer/main_window/index.html"))};e.app.on("ready",n);e.app.on("window-all-closed",()=>{process.platform!=="darwin"&&e.app.quit()});e.app.on("activate",()=>{e.BrowserWindow.getAllWindows().length===0&&n()});
