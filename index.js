// run `node index.js` in the terminal
const fs = require('fs');
const vCard = require('vcard-parser');
const vCardParser = require('./lib/vcard-parser');
const { toPatient } = require('./lib/vcard-to-patient');
const { normalizeForSearching } = require('./lib/patient-for-search');

console.log(`Hello Node.js v${process.versions.node}!`);

const fileName = process.argv[2];

fs.readFile(fileName, 'utf8', (err, data) => {
  // // Step 3: Convert the file content to a string
  // const vCardString = data.toString();

  // // Step 4: Parse the vCard data
  // const vCardData = vCard.parse(vCardString);

  // // Step 5: Log the parsed data to the console
  // console.log(vCardData);

  // fs.writeFileSync(`${fileName}.json`, JSON.stringify(vCardData));

  fs.writeFileSync(
    `${fileName}.json`,
    JSON.stringify(
      vCardParser.parse(data).map(toPatient).map(normalizeForSearching),
      null,
      4
    )
  );
});
