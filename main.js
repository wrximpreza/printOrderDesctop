const {app, BrowserWindow, Menu, Tray, ipcRenderer, ipcMain} = require('electron');
const path = require('path');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let tray = null;


function createWindow(event) {

    var win = new BrowserWindow({
        width: 400, height: 225, show: true
    });

    win.loadURL('http://t12.prime-hosting.com.ua/index.php?option=com_jshopping&view=search&app=1');

    // Open the DevTools.
    win.webContents.openDevTools();

    const iconName = 'icon.png';
    const iconPath = path.join(__dirname, iconName);

    tray = new Tray(iconPath);

    const contextMenu = Menu.buildFromTemplate([{
        label: 'Закрыть',
        click: function () {
            tray.destroy();
            win.destroy();
        }
    }]);

    tray.setToolTip('Печать с заказов Donut.oom.ua');
    tray.setContextMenu(contextMenu);

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    win.webContents.on('did-finish-load', () => {
        //win.webContents.print({'silent': true});
        //let id = win.webContents.getElementById('order_id').innerHTML;
        /*var m;
        ipcMain.on('order-id', (event, message) => {
            m = message;
        });
    
        ipcRenderer.send('ping', m);*/


    });

    setInterval(function () {
        win.reload();
    }, 60000);

}

app.on('ready', createWindow);