const fs = require('fs');
const xml2js = require('xml2js');

function extractData(filepath, result) {
    // Your extractData logic here
    // This function should return an array
    return [];
}

function processXmlFile(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err) {
                console.error(`Error reading file ${filepath}:`, err);
                reject(err);
                return;
            }

            xml2js.parseString(data, (err, result) => {
                if (err) {
                    console.error(`Error parsing XML file ${filepath}:`, err);
                    reject(err);
                    return;
                }

                try {
                    const extractedData = extractData(filepath, result);
                    resolve(extractedData);
                } catch (error) {
                    reject(error);
                }
            });
        });
    });
}

// Usage example
processXmlFile('path/to/your/file.xml')
    .then(dataArray => {
        console.log('Extracted data array:', dataArray);
    })
    .catch(error => {
        console.error('Error processing XML file:', error);
    });
