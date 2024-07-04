function extractData(filename, xmlObject) {
    const extractElements = (obj) => {
        if (obj.FinComboBox) {
            if (Array.isArray(obj.FinComboBox)) {
                obj.FinComboBox.forEach(comboBox => {
                    if (comboBox.$ && comboBox.$.id) {
                        console.log(comboBox.$.id);
                    }
                });
            } else if (obj.FinComboBox.$ && obj.FinComboBox.$.id) {
                console.log(obj.FinComboBox.$.id);
            }
        }

        for (const key in obj) {
            if (Array.isArray(obj[key])) {
                obj[key].forEach(element => {
                    if (typeof element === 'object') {
                        extractElements(element);
                    }
                });
            } else if (typeof obj[key] === 'object') {
                extractElements(obj[key]);
            }
        }
    };

    extractElements(xmlObject);
}

// Example usage with the given sample XML object
const sampleXmlObject = {
    root: {
        FinComboBox: [
            { $: { id: 'combo1' }, name: 'Combo 1' },
            { $: { id: 'combo2' }, name: 'Combo 2' }
        ],
        otherElement: {
            nestedArray: [
                { nestedObj: { FinComboBox: [{ $: { id: 'nestedCombo1' } }] } },
                { nestedObj: { FinComboBox: [{ $: { id: 'nestedCombo2' } }] } },
                {nestedObj:{ FinComboBox: { $: { id: 'otherCombo1' } } }}
            ]
        }
    },
    other: [
        { FinComboBox: { $: { id: 'otherCombo2' } } }
    ]
};

extractData('sample.xml', sampleXmlObject);



/*
code Explanation:
Handling FinComboBox:

If FinComboBox is an array, iterate over each element and log the id attribute if it exists.
If FinComboBox is a single object, log the id attribute if it exists.
Recursive Traversal:

Iterate over all keys in the object.
If the value of a key is an array, iterate over each element and recursively call extractElements for each element that is an object.
If the value of a key is an object, recursively call extractElements for that object.
Expected Output:
Given the sampleXmlObject, the program should output the id attributes of all FinComboBox elements, regardless of their nesting:

Copy code
combo1
combo2
nestedCombo1
nestedCombo2
otherCombo1
These outputs correspond to the id attributes found in the various FinComboBox elements in the provided sampleXmlObject.
*/