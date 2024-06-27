const fs = require('fs');
const xml2js = require('xml2js');
const ExcelJS = require('exceljs');

// Sample XML string
const xml = `
<FinComboBox id="x">
  <properties>
    <FinDataProviderId>y</FinDataProviderId>
  </properties>
</FinComboBox>
`;

// Create a parser
const parser = new xml2js.Parser();

parser.parseString(xml, async (err, result) => {
  if (err) {
    throw err;
  }

  // Extract the id attribute from FinComboBox
  const idAttribute = result.FinComboBox.$.id;

  // Extract the text content of FinDataProviderId
  const finDataProviderIdContent = result.FinComboBox.properties[0].FinDataProviderId[0];

  // Create a new Excel workbook and sheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  // Define columns
  worksheet.columns = [
    { header: 'id', key: 'id', width: 10 },
    { header: 'FinDataProviderId', key: 'finDataProviderId', width: 30 },
  ];

  // Add a row with the extracted values
  worksheet.addRow({
    id: idAttribute,
    finDataProviderId: finDataProviderIdContent,
  });

  // Write to file
  await workbook.xlsx.writeFile('output.xlsx');

  console.log('Excel file has been created.');
});
