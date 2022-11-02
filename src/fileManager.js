const fs = require('fs');
const path = require('path');
function listDirectories(targetDir){
//const targetDir = process.argv[2] || process.cwd()
    let formatlist = ['jpg', 'jpeg', 'png'];
    let images = ['jotain'];
    fs.promises.readdir(targetDir)

        .then(filenames => {
            for (let filename of filenames) {
                console.log("targetDir: " + targetDir);
                console.log("filename: " + filename);
                console.log("would be: " + path.join(targetDir,filename));
                const buttonValue = document.getElementById('file-menu-select');
                const imagePut = document.getElementById('picture-selector');
                buttonValue.setAttribute('value', targetDir);
                let fullPath = path.join(targetDir,filename);
                //////////////////////////////////////////
                // fs.lstat(fullPath, (err, stats) => { //
                //     if (err) throw err;              //
                //     if(stats.isDirectory()){         //
                //     listDirectories(fullPath);       //
                //     }                                //
                // });                                  //
                //////////////////////////////////////////
                fs.lstat(fullPath, (err, stats) => {
                    if (err) throw err;
                    for(var i=0; i < formatlist.length; i++){
                        if(fullPath.toString().split('.').pop() === formatlist[i]){
                            console.log(fullPath + " is image.");
                            images.push(fullPath);
                            const newImage = document.createElement("img");
                            newImage.setAttribute('src',fullPath);
                            newImage.setAttribute('id', 'image-'+ images.length);
                            newImage.style.width = '256px';
                            newImage.style.height = '256px';
                            imagePut.appendChild(newImage);
                        }
                    }
                })
                const element = document.getElementById('directory-list');
                const template = document.querySelector('#file-list');
                const clone = template.content.cloneNode(true);
                let li = clone.querySelectorAll("li");
                li[0].textContent = fullPath;
                li.forEach(element => {
                    element.addEventListener('click', event => {
                        clickHandler.emit('clickEvent', fullPath);
                    });
                });
                element.appendChild(clone);

            }
        })


        .catch(err => {
            console.log("Virhe\n");
            console.log(err)
        })
}
module.exports = {
    listDirectories : listDirectories
};
