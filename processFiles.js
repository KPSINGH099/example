const processFiles = async () => {
    try {
        const allFiles = getAllFiles(directoryPath);

        const formFiles = allFiles.filter(file => file.includes('_form.xml'));
        const dataMapFiles = allFiles.filter(file => file.includes('data_map.xml'));

        for (const formFile of formFiles) {
            //call processXml instead
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
