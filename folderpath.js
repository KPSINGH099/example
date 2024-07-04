const fs = require('fs');
const path = require('path');

function printFolders(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error("Failed to read directory:", err);
            return;
        }

        files.forEach(file => {
            const fullPath = path.join(directory, file);
            fs.stat(fullPath, (err, stats) => {
                if (err) {
                    console.error("Failed to get stats for file:", err);
                    return;
                }

                if (stats.isDirectory()) {
                    console.log(fullPath);
                }
            });
        });
    });
}

// Call the function with the path to the metadata folder
const metadataFolder = 'C:\\Users\\LENOVO\\Downloads\\example\\root';
printFolders(metadataFolder);
