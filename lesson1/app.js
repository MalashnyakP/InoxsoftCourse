const fs = require('fs');
const path = require('path');
const util = require('util');

const readDirPromisify = util.promisify(fs.readdir);
const readFilePromisify = util.promisify(fs.readFile);
const renameFSPromisify = util.promisify(fs.rename);

const sortDirByGender = async (directoryPath, folder) => {
    const currDirectory = path.join(directoryPath, folder);
    const correctGender = folder === 'boys' ? 'male' : 'female';
    const newDirectory = folder === 'boys' ? path.join(directoryPath, 'girls') : path.join(directoryPath, 'boys');

    readDirPromisify(currDirectory).then(data => {
        data.forEach(fileName =>{
            const filePath = path.join(currDirectory, fileName);
            
            readFilePromisify(filePath).then(data => {
                const fileData = JSON.parse(data);
                
                if(fileData.gender !== correctGender){
                    renameFSPromisify(filePath, path.join(newDirectory, fileName));                            
                }
            })
        })
    })
}

sortDirByGender(__dirname, 'girls');
sortDirByGender(__dirname, 'boys');