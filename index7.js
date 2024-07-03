const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

const directoryPath = './metadata'; // replace with your root folder path

// Function to read and parse XML file
const readXMLFile = async (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const result = await parser.parseStringPromise(fileContent);
    return result;
};

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

// Function to process files
const processFiles = async () => {
    try {
        const allFiles = getAllFiles(directoryPath);
        
        for (const file of allFiles) {
            if (file.includes('_form.xml')) {
                const formXML = await readXMLFile(file);
                const dataMapFile = allFiles.find(f => f.includes('data_map.xml') && f.startsWith(path.dirname(file)));

                if (dataMapFile) {
                    const dataMapXML = await readXMLFile(dataMapFile);
                    const dataMapId = dataMapXML.map.$.id;

                    if (formXML && formXML.obj && formXML.obj.FinComboBox) {
                        formXML.obj.FinComboBox.forEach(comboBox => {
                            const comboBoxId = comboBox.$.id;
                            if (comboBoxId === dataMapId) {
                                console.log(`Match found in ${file}: ${comboBoxId}`);
                            } else {
                                console.log(`No match found in ${file} for id: ${comboBoxId}`);
                            }
                        });
                    } else {
                        console.error(`Invalid structure in ${file}`);
                    }
                } else {
                    console.error(`No corresponding data_map.xml file found for ${file}`);
                }
            }
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
};

processFiles();
