const path = require('path')
const { app, BrowserWindow } = require('electron')
require('dotenv').config()

if (process.env.RELOAD) {
    const electron = path.join(__dirname, 'node_modules', '.bin', 'electron')

    require('electron-reload')(__dirname, {
        electron
    })
}

function createWindow() {
    let win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
