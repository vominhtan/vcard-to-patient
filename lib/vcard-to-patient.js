const dateRegex = /(?:\d{1,2}\/)?(?:\d{1,2}\/)?(?:\d{4})/gm;
function toPatient(vcard) {
  const dob = dateRegex.exec(vcard.name);

  const buffer = vcard.name
    .replaceAll(dateRegex, '/')
    .replaceAll(/[/s\/;\.]*$/gm, '')
    .replaceAll(/^[/s\/;\.]*/gm, '')
    .replaceAll(/[\\\,]*/gm, '')
    .trim();

  const [patientName, parentName, otherName] = buffer
    .split('/')
    .map((n) => n.trim());

  const [patientLastName, patientFirstName] =
    patientName.split(/\s(?=[\S]*?$)/gm);

  return {
    ...vcard,
    fullName: buffer,
    note: vcard.note ? vcard.note.replaceAll('\\n', '\n') : '',
    name: patientName,
    patientFirstName,
    patientLastName,
    parentName,
    otherName,
    dob: dob ? dob[0] : null,
  };
}

module.exports = {
  toPatient,
};
