const fs = require('fs');
const xml2js = require('xml2js');

// Sample XML string
const xml = `
<FinComboBox id="x">
  <properties>
    <FinDataProviderId1>y</FinDataProviderId1>
    <FinDataProviderId>y</FinDataProviderId>
  </properties>
</FinComboBox>
`;

// Create a parser
const parser = new xml2js.Parser();

parser.parseString(xml, (err, result) => {
  if (err) {
    throw err;
  }

  // Extract the id attribute from FinComboBox
  const idAttribute = result.FinComboBox.$.id;

  // Extract the text content of FinDataProviderId
  const finDataProviderIdContent = result.FinComboBox.properties[0].FinDataProviderId[0];

  // Print the values
  console.log('id attribute:', idAttribute);
  console.log('FinDataProviderId content:', finDataProviderIdContent);
});
