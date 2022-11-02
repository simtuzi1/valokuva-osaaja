const facedetect = require('./src/imageSelect.js')
const setButton = document.getElementById('do-img');

setButton.addEventListener('click', () => {
  let input = 'image-7';
    facedetect.run(input);
});
