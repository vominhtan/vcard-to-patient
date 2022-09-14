function normalizer(text) {
  return ('' + text)
    .replaceAll(/[úùụủũứừựửữưƯÚÙỤỦŨỨỪỰỬỮ]/gm, 'u')
    .replaceAll(/[áàạảãÁÀẠẢÃ]/gm, 'a')
    .replaceAll(/[ẤẦẬẨẪấầậẩẫâÂ]/gm, 'a')
    .replaceAll(/[ẮẰẶẲẴắằặẳẵăĂ]/gm, 'a')
    .replaceAll(/[éèẹẻẽÉÈẸẺẼ]/gm, 'e')
    .replaceAll(/[ếềệểễẾỀỆỂỄÊ]/gm, 'e')
    .replaceAll(/[óòọỏõÓÒỌỎÕ]/gm, 'o')
    .replaceAll(/[ỐỒỘỔỖốồộổỗÔô]/gm, 'o')
    .replaceAll(/[ỚỜỢỞỠớờợởỡơƠ]/gm, 'o')
    .replaceAll(/[íìịỉĩÍÌỊỈĨ]/gm, 'i')
    .replaceAll(/[ÝỲỴỶỸýỳỵỷỹ]/gm, 'y');
}

function normalizeForSearching(patient) {
  return {
    ...patient,
    search: Object.fromEntries(
      Object.entries(patient).map(([key, value]) => [key, normalizer(value)])
    ),
  };
}

module.exports = {
  normalizeForSearching,
};
