const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 350,
        height: 450,
        frame: false,
        icon: path.join(__dirname, "icon.ico"),
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile("index.html");
}

app.whenReady().then(createWindow);

ipcMain.on("minimize-window", () => {
    mainWindow?.minimize();
});

ipcMain.on("close-window", () => {
    mainWindow?.close();
});