import { isObject } from "lodash-es";
import keyUtil from "../utils/key-util";
import pathUtil from "../utils/path-util";

export type PointLike = PointProps;
interface PointProps {
  key?: string;
  offset?: number;
  path?: number[];
}
class Point {
  key: string;
  offset: number;
  path: number[];

  constructor({ key, offset, path }: PointProps) {
    this.key = key ?? keyUtil.create();
    this.offset = offset ?? 0;
    this.path = pathUtil.create(path);
  }

  static create(attrs: Point | PointProps) {
    if (attrs instanceof Point) {
      return attrs;
    }
    if (isObject(attrs)) {
      return Point.fromObject(attrs);
    }
  }

  static fromObject(attrs: PointProps) {
    return new Point(attrs);
  }

  get object() {
    return "point";
  }
}

export default Point;
