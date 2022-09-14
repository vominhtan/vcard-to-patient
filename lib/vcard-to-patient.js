const dateRegex = /(?:\d{1,2}\/)?(?:\d{1,2}\/)?(?:\d{4})/gm;
function toPatient(vcard) {
  const dob = dateRegex.exec(vcard.name);

  const buffer = vcard.name
    .replaceAll(dateRegex, '/')
    .replaceAll(/[/s\/;\.]*$/gm, '')
    .replaceAll(/^[/s\/;\.]*/gm, '')
    .trim();

  const [patientName, parentName, otherName] = buffer
    .split('/')
    .map((n) => n.trim());

  return {
    ...vcard,
    name: buffer,
    note: vcard.note ? vcard.note.replaceAll('\\n', '\n') : '',
    patientName,
    parentName,
    otherName,
    dod: dob ? dob[0] : null,
  };
}

module.exports = {
  toPatient,
};
