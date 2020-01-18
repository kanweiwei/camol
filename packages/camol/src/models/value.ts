import Document, { DocumentLike } from "./document";
import Range, { RangeLike } from "./range";
import { isString, values, isObject } from "lodash-es";
import Point from "./point";

export type ValueLike = ValueProps;

type ValueProps = {
  document?: DocumentLike;
  selection?: RangeLike;
};

class Value {
  document: Document;
  selection: Range;

  constructor({ document, selection }: ValueProps) {
    this.document = Document.create(document);
    if (!selection) {
      const firstText = this.document.getFirstText();
      const anchor = Point.create({
        key: firstText.key,
        offset: 0
      });
      const focus = Point.create({
        key: firstText.key,
        offset: 0
      });
      selection = Range.create({
        anchor,
        focus
      });
    }
    if (selection instanceof Range) {
      this.selection = selection;
    } else {
      this.selection = Range.create(selection);
    }
  }

  static create(attrs?: string | ValueLike) {
    attrs = attrs ?? "";
    if (isString(attrs)) {
      attrs = {
        document: Document.create(attrs)
      };
    }
    if (attrs instanceof Value) {
      return attrs;
    }
    if (isObject) {
      return Value.fromObject(attrs);
    }
  }

  static fromObject(attrs: ValueProps) {
    return new Value(attrs);
  }
}

export default Value;
