const MODEL_TYPES = {
  POINT:"@@__CAMOL_POINT__@@",
  BLOCK: "@@__CAMOL_BLOCK__@@",
  CHANGE: "@@__CAMOL_CHANGE__@@",
  CHARACTER: "@@__CAMOL_CHARACTER__@@",
  DOCUMENT: "@@__CAMOL_DOCUMENT__@@",
  DATA: "@@__CAMOL_DATA__@@",
  HISTORY: "@@__CAMOL_HISTORY__@@",
  INLINE: "@@__CAMOL_INLINE__@@",
  LEAF: "@@__CAMOL_LEAF__@@",
  MARK: "@@__CAMOL_MARK__@@",
  OPERATION: "@@__CAMOL_OPERATION__@@",
  RANGE: "@@__CAMOL_RANGE__@@",
  SCHEMA: "@@__CAMOL_SCHEMA__@@",
  STACK: "@@__CAMOL_STACK__@@",
  TEXT: "@@__CAMOL_TEXT__@@",
  VALUE: "@@__CAMOL_VALUE__@@"
};

export function isType(type: string, any: any): boolean {
  return !!(any && any[MODEL_TYPES[type]]);
}

/**
 * Export.
 *
 * @type {Object}
 */
export default MODEL_TYPES;
