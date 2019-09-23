import PathUtil from "../utils/path-util";

class Point {
  public key: string | null = null;
  public offset: string | null = null;
  public path: number[] | null = null;

  constructor(props: any) {
    let { key = null, offset = null, path = null } = props;
    path = PathUtil.create(path);
    this.key = key;
    this.offset = offset;
    this.path = path;
  }

  get object() {
    return "point";
  }

  get isSet() {
    return this.key != null && this.offset != null && this.path != null;
  }

  get isUnSet() {
    return !this.isSet;
  }
}
