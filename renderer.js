const {ipcRenderer} = require('electron')
const {ipcMain} = require('electron').remote
const asyncMsgBtn = document.getElementById('msg')

ipcMain.on('a-msg', (event, arg) => {
	event.sender.send('a-reply', 'Yes I am here too')
})