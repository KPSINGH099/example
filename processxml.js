const fs = require('fs');
const xml2js = require('xml2js');
console.log("hii");


function processXmlFile(filepath) {
    fs.readFile(filepath, (err, data) => {
        if (err) {
            console.error(`Error reading file ${filepath}:`, err);
            return;
        }
        console.log(data)
        //buffer of data is passed
        //fs.readFile simply returns bufffer of data for xml files if path exits
        xml2js.parseString(data, (err, result) => {
            if (err) {
                console.error(`Error parsing XML file ${filepath}:`, err);
                return;
            }
            console.log(result);
            console.log(result.root.map);
            console.log(Array.isArray(result.root.map));
            //console.log(result. FinComboBox.$.id);
            //extractData(filepath, result);
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