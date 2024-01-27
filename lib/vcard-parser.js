function toArray(vcardStr) {
  const regexVCard = /BEGIN:VCARD([\s\S]*?)END:VCARD/gm;
  let m;
  const contacts = [];

  while ((m = regexVCard.exec(vcardStr))) {
    contacts.push({
      name: getField('N', m[1]),
      fullName: getField('FN', m[1]),
      note: getField('NOTE', m[1]),
      rev: /^REV:(.+)$/gm.exec(m[1])?.[1] || null,
      prodid: getField('PRODID', m[1]),
      vCard: m[1],
    });
  }
  return {
    contacts,
    stats: {},
  };
}

function getField(fieldName, data) {
  const regex = new RegExp(`^${fieldName}:([\\s\\S]*?)\\n[A-Z]*:`, 'gm');
  let match = regex.exec(data);
  return match ? match[1] : null;
}

module.exports = {
  parse(data) {
    const { contacts, stats } = toArray(data);
    console.log(stats);
    return contacts;
  },
};
