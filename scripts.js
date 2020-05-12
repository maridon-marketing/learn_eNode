const {ipcRenderer} = require('electron')
const {Builder, By, Key, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromedriver = require('chromedriver');

const otherF = require('./otherF.js');

var db = {
	name: 'Storage'
}


var runChrome = async function(arg1, arg2) {
  let driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(
 	 new chrome.ServiceBuilder(chromedriver.path).build()
  )
  .build()
  try {
    await driver.get('http://www.google.com')
    await driver.findElement(By.name('q')).sendKeys(arg1 + ' ' + arg2, Key.RETURN)
    let element = await driver.findElement(By.id('logo'))
    console.log(element.getAttribute('title'))
    
    db.val = await element.getAttribute('title')
    
    console.log(db)
    
  } finally {
    // await driver.quit()
  }
}



const asyncMsgBtn = document.getElementById('msg')
const addBtn = document.getElementById('add')


$(addBtn).on('click', () => {
	var aN = document.getElementById('_input1').value
	var aN2 = document.getElementById('_input2').value
	//otherF._addBtn(aN)
	runChrome(aN, aN2)
})



// Test IPC main function
asyncMsgBtn.addEventListener('click', () => {
	ipcRenderer.send('a-msg', 'ping')
})
ipcRenderer.on('a-reply', (event, arg) => {
	const msgs = `Reply received: ${arg}`
	document.getElementById('reply-div').innerHTML = msgs
})

