// run `node index.js` in the terminal
const fs = require('fs');
const vCardParser = require('./lib/vcard-parser');
const { toPatient } = require('./lib/vcard-to-patient');
const { normalizeForSearching } = require('./lib/patient-for-search');

console.log(`Hello Node.js v${process.versions.node}!`);

const fileName = process.argv[2];

fs.readFile(fileName, 'utf8', (err, data) => {
  fs.writeFileSync(
    `${fileName}.json`,
    JSON.stringify(
      vCardParser.parse(data).map(toPatient).map(normalizeForSearching),
      null,
      4
    )
  );
});
