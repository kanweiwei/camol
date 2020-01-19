import isString from "lodash/isString";
import isObject from "lodash/isObject";
import MarkInterface from "../interfaces/markInterface";

export type MarkLike = MarkProps;

export type MarkProps = {
  type: string;
  data: any;
};

class Mark implements MarkInterface {
  /**
   * 标记类型
   *
   * @type {string}
   * @memberof Mark
   */
  type: string;

  /**
   * 额外数据
   *
   * @type {Object}
   * @memberof Mark
   */
  data: any = {};

  constructor({ type, data }: MarkProps) {
    this.type = type;
    this.data = data;
  }

  /**
   *
   * @param attrs
   */
  static create(attrs: string | MarkProps | Mark) {
    if (isString(attrs)) {
      attrs = {
        type: attrs,
        data: {}
      } as MarkInterface;
    }

    if (attrs instanceof Mark) {
      return attrs;
    }

    if (isObject(attrs)) {
      return Mark.fromObject(attrs);
    }
  }

  /**
   *
   * @param data
   */
  static fromObject(data: MarkProps) {
    return new Mark(data);
  }

  /**
   *
   *
   * @readonly
   * @memberof Mark
   */
  get object() {
    return "mark";
  }
}

export default Mark;
