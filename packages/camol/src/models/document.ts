import BlockInterface from "../interfaces/blockInterface";
import Block, { BlockLike } from "./block";
import { isString, isObject, isArray } from "lodash-es";
import keyUtil from "../utils/key-util";

export type DocumentLike = DocumentProps;

type DocumentProps = {
  key?: string;
  data?: any;
  nodes?: BlockLike[];
};

class Document {
  key: string;
  data: any = {};
  nodes: BlockInterface[];
  get object() {
    return "document";
  }

  constructor({ key, data, nodes }: DocumentProps) {
    this.key = key ?? keyUtil.create();
    this.data = isObject(data) ? data : {};
    this.nodes = isArray(nodes) ? this.createChildren(nodes) : [];
  }

  static create(attrs?: string | DocumentLike) {
    attrs = attrs ?? "";
    if (isString(attrs)) {
      attrs = {
        key: keyUtil.create(),
        data: {},
        nodes: [Block.create(attrs)]
      };
    }
    if (attrs instanceof Document) {
      return attrs;
    }
    if (isObject(attrs)) {
      return Document.fromObject(attrs);
    }
  }
  static fromObject(attrs: DocumentProps) {
    return new Document(attrs);
  }

  createChildren(nodes: BlockLike[]): BlockInterface[] {
    return nodes.map(n => Block.create(n));
  }

  getFirstText() {
    return this.nodes?.[0].getFirstText();
  }
}

export default Document;
