import { isObject, isString } from "lodash-es";
import LeafInterface from "../interfaces/leafInterface";
import MarkInterface from "../interfaces/markInterface";
import Mark, { MarkProps } from "./mark";

export type LeafProps = {
  marks: (MarkProps | MarkInterface)[];
  text: string;
};

class Leaf implements LeafInterface {
  /**
   * 标记的数组
   *
   * @type {MarkInterface[]}
   * @memberof Leaf
   */
  marks: MarkInterface[] = [];

  /**
   * 文本
   *
   * @type {string}
   * @memberof Leaf
   */
  text: string = "";

  constructor({ text, marks }: LeafProps) {
    this.text = text;
    this.marks = marks ? marks.map(m => Mark.create(m)) : [];
  }

  static create(attrs?: string | LeafProps | LeafInterface) {
    attrs = attrs ?? "";
    if (isString(attrs)) {
      attrs = {
        marks: [],
        text: attrs
      };
    }
    if (attrs instanceof Leaf) {
      return attrs;
    }
    if (isObject(attrs)) {
      return Leaf.fromObject(attrs);
    }
  }

  static fromObject(attrs: LeafProps) {
    return new Leaf(attrs);
  }

  get object() {
    return "leaf";
  }
}

export default Leaf;
