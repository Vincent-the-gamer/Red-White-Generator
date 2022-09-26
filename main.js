const {app,Menu, BrowserWindow} = require('electron');
const env = require('./env.json')
let win = null;

function createWindow(){
    //取消顶部菜单栏
    Menu.setApplicationMenu(null);
    //新建浏览器窗口
    win = new BrowserWindow({
        title: "红白字生成器 by 诡锋",
        width: 1100,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false //关闭上下文隔离，使得前端可以使用Node模块
        },
    });
    win.loadFile("index.html");
    win.on('closed', () => {
        win = null;
    })
    //开发者环境下，打开开发者工具
    if(env.env === 'development'){
        win.toggleDevTools();
    }
}

app.on('ready',createWindow)

//当全部窗口关闭时退出
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});