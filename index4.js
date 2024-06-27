const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const xlsx = require('xlsx');

// Function to recursively traverse directories
function traverseDirectory(dir, callback) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${dir}:`, err);
            return;
        }

        files.forEach(file => {
            const filepath = path.join(dir, file);
            fs.stat(filepath, (err, stats) => {
                if (err) {
                    console.error(`Error stating file ${filepath}:`, err);
                    return;
                }

                if (stats.isDirectory()) {
                    traverseDirectory(filepath, callback);
                } else if (path.extname(file) === '.xml') {
                    callback(filepath);
                }
            });
        });
    });
}

// Function to process an XML file
function processXmlFile(filepath) {
    fs.readFile(filepath, (err, data) => {
        if (err) {
            console.error(`Error reading file ${filepath}:`, err);
            return;
        }

        xml2js.parseString(data, (err, result) => {
            if (err) {
                console.error(`Error parsing XML file ${filepath}:`, err);
                return;
            }

            extractData(filepath, result);
        });
    });
}

// Function to extract data from the parsed XML
function extractData(filename, xmlObject) {
    const fileData = [];

    // Function to traverse the XML structure
    const extractElements = (obj) => {
        if (obj.FinComboBox) {
            if (Array.isArray(obj.FinComboBox)) {
                obj.FinComboBox.forEach(comboBox => {
                    const id = comboBox.$.id;
                    const properties = comboBox.properties && comboBox.properties[0];
                    const dataProviderId = properties && properties.FinDataProviderId && properties.FinDataProviderId[0];

                    if (dataProviderId) {
                        fileData.push({
                            filename,
                            componenttype: 'FinComboBox',
                            id,
                            FinDataProviderId: dataProviderId
                        });
                    }
                });
            }
        } else {
            for (const key in obj) {
                if (typeof obj[key] === 'object') {
                    extractElements(obj[key]);
                }
            }
        }
    };

    extractElements(xmlObject);

    if (fileData.length > 0) {
        writeToExcel(fileData);
    }
}

// Function to write data to Excel file
function writeToExcel(data) {
    const outputFilePath = path.join(__dirname, 'output.xlsx'); // Output file path in the current directory
    const workBook = xlsx.utils.book_new();
    const workSheetData = data.map(item => ({
        Filename: item.filename,
        ComponentType: item.componenttype,
        ID: item.id,
        FinDataProviderId: item.FinDataProviderId
    }));

    const workSheet = xlsx.utils.json_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, 'Sheet1');

    try {
        xlsx.writeFile(workBook, outputFilePath);
        console.log(`Excel file successfully created at: ${outputFilePath}`);
    } catch (err) {
        console.error('Error writing Excel file:', err);
    }
}

// Start processing from the root directory
const rootDir = "C:\\Users\\LENOVO\\Downloads\\root";  // Corrected path
traverseDirectory(rootDir, processXmlFile);
