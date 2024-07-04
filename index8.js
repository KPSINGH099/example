const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const directoryPath = 'C:\\Users\\LENOVO\\Downloads\\root'; // replace with your root folder path


// Function to recursively get all files in directory
const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
            arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, file));
        }
    });

    return arrayOfFiles;
};



let all=getAllFiles(directoryPath);
console.log(all);
