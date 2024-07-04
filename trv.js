const fs = require('fs');
const path = require('path');

function listFoldersAndFiles(directory) {
    const folders = [];

    // First iteration: list folders and store their paths
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error("Failed to read directory:", err);
            return;
        }

        let pending = files.length;

        if (!pending) {
            // If no files are found, print message
            console.log("No folders found");
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
                    folders.push(fullPath);
                }

                if (!--pending) {
                    // When done collecting folder paths, proceed to print files
                    printFilesInFolders(folders);
                }
            });
        });
    });
}

function printFilesInFolders(folders) {
    folders.forEach(folder => {
        console.log(`Folder: ${folder}`);
        fs.readdir(folder, (err, files) => {
            if (err) {
                console.error(`Failed to read folder ${folder}:`, err);
                return;
            }

            files.forEach(file => {
                const filePath = path.join(folder, file);
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.error(`Failed to get stats for file ${filePath}:`, err);
                        return;
                    }

                    if (stats.isFile()) {
                        console.log(`  File: ${filePath}`);
                    }
                });
            });
        });
    });
}

// Call the function with the path to the metadata folder
const metadataFolder = 'C:\\Users\\LENOVO\\Downloads\\example\\root';
listFoldersAndFiles(metadataFolder);
