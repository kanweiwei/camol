import { isObject } from "lodash-es";
import pathUtil from "../utils/path-util";
import Mark from "./mark";
import Point from "./point";

interface RangeAttrs {
  anchor: Point;
  focus: Point;
  isFocused: boolean;
  marks: Mark[];
}

class Range {
  anchor: Point;
  focus: Point;
  isFocused: boolean = false;
  marks: Mark[] = [];

  constructor({ anchor, focus, isFocused, marks }: RangeAttrs) {
    this.anchor = Point.create(anchor || {});
    this.focus = Point.create(focus || {});
    this.isFocused = isFocused ?? false;
    this.marks = marks ? marks.map(m => Mark.create(m)) : [];
  }

  static create(attrs: RangeAttrs | Range) {
    if (attrs instanceof Range) {
      return attrs;
    }
    if (isObject(attrs)) {
      return Range.fromObject(attrs);
    }
  }

  static fromObject(attrs: RangeAttrs) {
    return new Range(attrs);
  }

  get object() {
    return "object";
  }

  get isBlurred() {
    return !this.isFocused;
  }

  get isCollapsed() {
    return (
      this.anchor.key === this.focus.key && this.anchor.offset,
      this.focus.offset
    );
  }

  get isExpanded() {
    return !this.isCollapsed;
  }

  get isBackward() {
    const { anchor, focus } = this;
    if (anchor.key === focus.key) {
      return this.anchor.offset > this.focus.offset;
    }
    return pathUtil.isBefore(focus.path, anchor.path);
  }

  get isForward() {
    return !this.isBackward;
  }

  setPoints([anchor, focus]: [Point, Point]) {
    this.anchor = anchor;
    this.focus = focus;
    return this;
  }

  /**
   * 选区反转
   */
  flip() {
    return this.setPoints([this.focus, this.anchor]);
  }
}

export default Range;
