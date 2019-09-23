import PathUtil from "../utils/path-util";
import MODEL_TYPES from "../constants/model-types";

class Point {
  key: string | null = null;
  offset: number | null = null;
  path: number[] | null = null;

  get object() {
    return "point";
  }

  constructor(props: any = {}) {
    let { key = null, offset = null, path = null } = props;
    path = PathUtil.create(path);
    this.key = key;
    this.offset = offset;
    this.path = path;

    this[MODEL_TYPES.POINT] = true;
  }

  static isPoint(obj: any) {
    return !!(obj && obj[MODEL_TYPES.POINT]);
  }

  get isPoint() {
    return !!(this && this[MODEL_TYPES.POINT]);
  }

  get isSet() {
    return this.key != null && this.offset != null && this.path != null;
  }

  get isUnset() {
    return !this.isSet;
  }

  isAtEndOfNode(node: any) {
    if (this.isUnset) return false;
    const last = node.getLastText();
    return this.key === last.key && this.offset === last.text.length;
  }

  isAtStartOfNode(node: any) {
    if (this.isUnset) return false;

    if (this.offset !== 0) {
      return false;
    }

    const first = node.getFirstText();
    return this.key === first.key;
  }

  isInNode(node: any | Text) {
    if (this.isUnset) {
      return false;
    }
    if (node.isText && node.key === this.key) {
      return true;
    }
    if (node.hasNode(this.key)) {
      return true;
    }
    return false;
  }
}

export default Point;
