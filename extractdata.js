function extractData(filename, xmlObject) {
    // This inner function is a recursive function that traverses the XML structure to find elements named FinComboBox.
    //It takes one parameter, obj, which is expected to be a part of the XML object
    const extractElements = (obj) => {
        //It checks if the obj has a property FinComboBox

        if (obj.FinComboBox) {
            //It checks if FinComboBox is an array
            //if xml has more than one Fincombox 
            if (Array.isArray(obj.FinComboBox)) {
                obj.FinComboBox.forEach(comboBox => {
                    const id = comboBox.$.id;
                    console.log(id)
                });
            }
        
        }
        //If FinComboBox is not found in obj, it iterates over each key in obj. 
        else {
            //may be root obj dont have Fincombobox as key but other key can have fincombox as value and fincombobox will be containing object
            for (const key in obj) {
                //For each key, it checks if the corresponding value is an object.
                //like fincombox will have value converted as object 
                if (typeof obj[key] === 'object') {
                    //If it is an object, it calls extractElements recursively on that object to continue the traversal.
                    extractElements(obj[key]);
                }
            }
        }
    };
    //The extractElements function is called with the initial xmlObject passed to extractData, starting the traversal process.

    extractElements(xmlObject);

 
}