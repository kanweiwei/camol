import BlockInterface from "../interfaces/blockInterface";
import Inline, { InlineLike } from "./inline";
import Text, { TextLike } from "./text";
import InlineInterface from "../interfaces/inlineInterface";
import TextInterface from "../interfaces/textInterface";
import { isString, isObject, isArray } from "lodash-es";
import keyUtil from "../utils/key-util";

type BlockLike = BlockProps | BlockInterface;

type BlockProps = {
  type: string;
  key?: string;
  object?: "block";
  nodes?: (BlockLike | InlineLike | TextLike)[];
  data?: any;
};

class Block implements BlockInterface {
  key: string;
  type: string;
  get object(): "block" {
    return "block";
  }
  data: any = {};
  nodes: (BlockInterface | InlineInterface | TextInterface)[];

  constructor({ key, type, data, nodes }: BlockProps) {
    this.key = key ?? keyUtil.create();
    this.type = type;
    this.data = isObject(data) ? data : {};
    this.nodes = isArray(nodes) ? this.createChildren(nodes) : [];
  }

  static create(attrs: string | BlockLike) {
    if (isString(attrs)) {
      attrs = {
        key: keyUtil.create(),
        type: attrs,
        object: "block",
        data: {},
        nodes: []
      };
    }
    if (attrs instanceof Block) {
      return attrs;
    }
    if (isObject(attrs)) {
      return Block.fromObject(attrs);
    }
    throw new Error(`argumants of 'create' is invalid`);
  }

  static fromObject(attrs: BlockLike) {
    return new Block(attrs);
  }

  get text() {
    return this.nodes.reduce((s, n) => s + n.text, "");
  }

  createChildren(nodes: (BlockLike | InlineLike | TextLike)[]) {
    return nodes.map(n => {
      switch (n.object) {
        case "text":
          return Text.create(n);
        case "inline":
          return Inline.create(n);
        case "block":
          return Block.create(n);
        default:
          throw new Error(`'createChildren' require a 'object' string`);
      }
    });
  }
}

export default Block;
