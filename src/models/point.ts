import { isObject } from "lodash-es";
import keyUtil from "../utils/key-util";
import pathUtil from "../utils/path-util";

interface PointAttrs {
  key?: string;
  offset?: number;
  path?: number[];
}
class Point {
  key: string;
  offset: number;
  path: number[];

  constructor({ key, offset, path }: PointAttrs) {
    this.key = key ?? keyUtil.create();
    this.offset = offset ?? 0;
    this.path = pathUtil.create(path);
  }

  static create(attrs: Point | PointAttrs) {
    if (attrs instanceof Point) {
      return attrs;
    }
    if (isObject(attrs)) {
      return Point.fromObject(attrs);
    }
  }

  static fromObject(attrs: PointAttrs) {
    return new Point(attrs);
  }

  get object() {
    return "point";
  }
}

export default Point;
