function toArray(vcardStr) {
  const regexVCard = /BEGIN:VCARD([\s\S]*?)END:VCARD/gm;
  let m;
  const contacts = [];
  let fields = [];
  let counter = 0;
  while ((m = regexVCard.exec(vcardStr))) {
    fields = Array.from(new Set([...fields, ...getAllFieldNames(m[1])]));
    contacts.push({
      name: getField('N', m[1]),
      fullName: getField('FN', m[1]),
      note: getField('NOTE', m[1]),
    });
    counter++;
  }
  return contacts;
}

function getField(fieldName, data) {
  const regex = new RegExp(`^${fieldName}:([\\s\\S]*?)\\n[A-Z]*:`, 'gm');
  let match = regex.exec(data);
  return match ? match[1] : null;
}

module.exports = {
  parse(data) {
    return toArray(data);
  },
};
