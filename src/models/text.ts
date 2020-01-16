import { isObject, isString } from "lodash-es";
import LeafInterface from "../interfaces/leafInterface";
import TextInterface from "../interfaces/textInterface";
import keyUtil from "../utils/key-util";
import Leaf, { LeafProps } from "./leaf";

export type TextLike = TextProps | TextInterface;

export type TextProps = {
  object?: "text";
  key?: string;
  leaves?: (LeafProps | LeafInterface)[];
};

class Text implements TextInterface {
  key: string;
  leaves: LeafInterface[] = [];
  constructor({ key, leaves }: TextProps) {
    this.key = key ?? keyUtil.create();
    this.leaves = leaves ? leaves.map(l => Leaf.create(l)) : [];
  }

  static create(attrs: string | TextProps | TextInterface) {
    if (isString(attrs)) {
      attrs = {
        key: keyUtil.create(),
        object: "text",
        leaves: [Leaf.create(attrs)]
      };
    }
    if (attrs instanceof Text) {
      return attrs;
    }
    if (isObject(attrs)) {
      return Text.fromObject(attrs);
    }
  }

  static fromObject(attrs: TextProps) {
    return new Text(attrs);
  }

  get object(): "text" {
    return "text";
  }

  get text() {
    return this.leaves.reduce((s, n) => s + n.text, "");
  }
}

export default Text;
