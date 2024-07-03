const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

const directoryPath = 'C:\\Users\\LENOVO\\Downloads\\root\\root1'; // replace with your root folder path

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

        const formFiles = allFiles.filter(file => file.includes('_form.xml'));
        const dataMapFiles = allFiles.filter(file => file.includes('data_map.xml'));

        for (const formFile of formFiles) {
            const formXML = await readXMLFile(formFile);
            const currentDir = path.dirname(formFile);
            const dataMapFile = dataMapFiles.find(file => path.dirname(file) === currentDir);

            if (dataMapFile) {
                const dataMapXML = await readXMLFile(dataMapFile);

                let dataMapIds = [];
                if (Array.isArray(dataMapXML.map)) {
                    dataMapIds = dataMapXML.map.map(item => item.$.id);
                } else if (dataMapXML.map && dataMapXML.map.$ && dataMapXML.map.$.id) {
                    dataMapIds = [dataMapXML.map.$.id];
                } else {
                    console.error(`Invalid structure in ${dataMapFile}`);
                    continue;
                }

                if (formXML && formXML.FinComboBox) {
                    let comboBoxes = formXML.FinComboBox;
                    if (!Array.isArray(comboBoxes)) {
                        comboBoxes = [comboBoxes];
                    }

                    comboBoxes.forEach(comboBox => {
                        const comboBoxId = comboBox.$.id;
                        if (dataMapIds.includes(comboBoxId)) {
                            console.log(`Match found in ${formFile}: ${comboBoxId}`);
                        } else {
                            console.log(`No match found in ${formFile} for id: ${comboBoxId}`);
                        }
                    });
                } else {
                    console.error(`Invalid structure in ${formFile}`);
                }
            } else {
                console.error(`No corresponding data_map.xml file found for ${formFile}`);
            }
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
};


processFiles();
