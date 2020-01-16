import { isArray, isObject, isString } from "lodash-es";
import InlineInterface from "../interfaces/inlineInterface";
import TextInterface from "../interfaces/textInterface";
import keyUtil from "../utils/key-util";
import Text, { TextLike } from "./text";

export type InlineLike = InlineInterface | InlineProps;

type InlineProps = {
  key?: string;
  object?: "inline";
  type: string;
  data?: any;
  nodes?: (InlineLike | TextLike)[];
};

class Inline implements InlineInterface {
  key: string;
  type: string;
  data: any = {};
  nodes: (InlineInterface | TextInterface)[];

  constructor({ key, type, data, nodes }: InlineProps) {
    this.key = key ?? keyUtil.create();
    this.type = type;
    this.data = isObject(data) ? data : {};
    this.nodes = isArray(nodes) ? this.createChildren(nodes) : [];
  }

  static create(attrs: string | InlineProps | InlineInterface) {
    if (isString(attrs)) {
      attrs = {
        key: keyUtil.create(),
        type: attrs,
        object: "inline",
        data: {},
        nodes: []
      };
    }
    if (attrs instanceof Inline) {
      return attrs;
    }
    if (isObject(attrs)) {
      return Inline.fromObject(attrs);
    }
  }

  static fromObject(attrs: InlineProps) {
    return new Inline(attrs);
  }

  get object(): "inline" {
    return "inline";
  }

  get text() {
    return this.nodes.reduce((s, n) => s + n.text, "");
  }

  createChildren(nodes: (InlineLike | TextLike)[]) {
    return nodes
      .map(n => {
        switch (n.object) {
          case "text":
            return Text.create(n);
          case "inline":
            return Inline.create(n);
          default:
            return void 0;
        }
      })
      .filter(n => n);
  }
}

export default Inline;
