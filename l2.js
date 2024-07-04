const fs = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

// Example ctransformation function
function ctransformation(xmlObject) {
    // Perform some transformation on the XML object and return a new object
    // This is just a placeholder transformation
    return {
        id: xmlObject.id,
        name: xmlObject.name,
        value: xmlObject.value
    };
}

// Example extractdata function
function extractdata(xmlObjects) {
    const dataArray = [];
    
    xmlObjects.forEach(xmlObject => {
        const transformedObject = ctransformation(xmlObject);
        if (transformedObject.value > 10) { // Example condition
            dataArray.push(transformedObject);
        }
    });

    return dataArray;
}

// Modified processxml function to return extracted data
function processxml(xmlData, callback) {
    parser.parseString(xmlData, (err, result) => {
        if (err) {
            console.error("Failed to parse XML:", err);
            callback(err, null);
            return;
        }

        const xmlObjects = result.root.object; // Adjust according to your XML structure
        const extractedData = extractdata(xmlObjects);

        callback(null, extractedData);
    });
}

// Example main function
function main() {
    const xmlData = `
    <root>
        <object>
            <id>1</id>
            <name>Item1</name>
            <value>15</value>
        </object>
        <object>
            <id>2</id>
            <name>Item2</name>
            <value>5</value>
        </object>
        <object>
            <id>3</id>
            <name>Item3</name>
            <value>25</value>
        </object>
    </root>
    `;

    processxml(xmlData, (err, extractedData) => {
        if (err) {
            console.error("Error processing XML:", err);
            return;
        }

        console.log("Extracted Data in main:", extractedData);

        // Further processing can be done here
    });
}

// Call the main function
main();
