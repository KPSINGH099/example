const fs = require('fs');
const xml2js = require('xml2js');
console.log("hii");


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


processXmlFile("C:\\Users\\LENOVO\\Downloads\\root\\root1\\a_form.xml")


/*this xml will be represented as 
<root>
	<map id="x" srvclass="rest">
		<ui type="abc">id</ui>
	</map>
	<map id="abc1" srvclass="rest">
		<ui type="abc">id</ui>
	</map>
	<map id="abc2" srvclass="rest">
		<ui type="abc">id</ui>
	</map>
	<FinComboBox id="c">
		<properties>
			<def>xyz</def>
			<FinDataProviderId>CC</FinDataProviderId>
			<abc></abc>
		</properties>
	</FinComboBox>
	<FinComboBox id="c">
		<properties>
			<def>xyz</def>
			<FinDataProviderId>CC</FinDataProviderId>
			<abc></abc>
		</properties>
	</FinComboBox>
</root>
*/

/*
{
  root: {
    map: [ [Object], [Object], [Object] ],
    FinComboBox: [ [Object], [Object] ]
  }
}
*/
async function processAllXmlFiles(directory) {
    try {
        const files = await fs.readdir(directory);
        const xmlFiles = files.filter(file => file.includes('datamap.xml'));
        
        const allResults = [];
        for (const file of xmlFiles) {
            const filePath = path.join(directory, file);
            const result = await processXmlFile(filePath);
            allResults.push(...result);
        }
        return allResults;
    } catch (err) {
        console.error(`Error processing directory ${directory}:`, err);
        throw err;
    }
}

// Usage example
processAllXmlFiles('path/to/your/directory')
    .then(finalArray => {
        console.log('Final combined data array:', finalArray);
    })
    .catch(error => {
        console.error('Error processing XML files:', error);
    });