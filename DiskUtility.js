const nodeDiskInfo = require('node-disk-info');
const EventEmitter = require('node:events');
const ls = require('./src/fileManager');
const clickHandler = new EventEmitter();

nodeDiskInfo.getDiskInfo()
  .then(devices => {
    output(devices);
  })
  .catch(err => {
    console.error(err);
  })

clickHandler.on('clickEvent', function actionListener(directoryPath) {
  const element = document.getElementById('device-list');
  const template = document.querySelector('#fileManager');

  const clone = template.content.cloneNode(true);
  let beRemoved = document.getElementById('directory-list');
  if (beRemoved != null){
    beRemoved.remove();
  }
  let ul = clone.querySelectorAll("ul");
  ul[0].setAttribute('id', 'directory-list');
  element.appendChild(clone);
  ls.listDirectories(directoryPath);

});


function range(end) {
  return Array.from({ length: end }, (_, index) => index);
}

function output(devices){
  let arr = range(devices.length);
  let arrEnd = arr.length;
  window.addEventListener('DOMContentLoaded', () => {
    const addText = (selector, text) => {
      const element = document.getElementById(selector);
      if (element){
        console.log("Listan kohde: " + arr.length);
        element.innerHTML += '<li data-filepath="'+ text +'" id="selectable-device-num-' + arr.pop() + '">' + text + '</li>';
      }
    }

    function addListener(){
      const elements = document.querySelectorAll('[id^=selectable-device]');
      elements.forEach(element => {
        element.addEventListener('click', event => {
          clickHandler.emit('clickEvent', element.textContent);
        });
      });
    }

    for (const type of ['list']) {
      for (const device of devices) {
        addText(`${type}-dev`, device.mounted)
        console.log('Filesystem', device.filesystem, '\n');
        addListener();
      }
    }
  })
}
