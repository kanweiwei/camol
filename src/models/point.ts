import PathUtil from "../utils/path-util";
import KeyUtils from "../utils/key-util";
import MODEL_TYPES from "../constants/model-types";
import { isEqual } from "lodash-es";

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

  moveBackward(n = 1) {
    if (n === 0) {
      return this;
    }
    if (n < 0) {
      return this.moveForward(-n);
    }
    this.offset += n;
    return this;
  }

  moveForward(n = 1) {
    if (n === 0) {
      return this;
    }
    if (n < 0) {
      return this.moveBackward(-n);
    }
    this.offset += n;
    return this;
  }

  moveTo(offset: number): Point;
  moveTo(key: string, offset?: number): Point;
  moveTo(path: number[], offset?: number): Point;
  moveTo(path: string | number | number[], offset = 0) {
    if (typeof path === "number") {
      this.offset = path;
    } else if (typeof path === "string") {
      let key = path;
      this.path = key === this.key ? this.path : null;
      this.offset = offset;
    } else {
      this.key =
        this.path && path && isEqual(path, this.path) ? this.key : null;
      this.offset = offset;
    }
    return this;
  }

  moveToStartOfNode(node): Point {
    const first = node.getFirstText();
    return this.moveTo(first.key, 0);
  }

  moveToEndOfNode(node): Point {
    const last = node.getLastText();
    return this.moveTo(last.key, last.text.length);
  }

  setKey(key: string | null): Point {
    if (key !== null) {
      key = KeyUtils.create(key);
    }

    this.key = key;
    return this;
  }
}

export default Point;
