import * as React from "react";
import BlockInterface from "camol/lib/interfaces/blockInterface";
import InlineInterface from "camol/lib/interfaces/inlineInterface";
import TextInterface from "camol/lib/interfaces/textInterface";

type Attributes = {
  "data-key": string;
};

export type renderNodeArgs = {
  node: BlockInterface | InlineInterface | TextInterface;
  attributes: Attributes;
  children?: React.ReactNode | React.ReactNode[];
};

function renderNode({ node, attributes, children }: renderNodeArgs) {
  switch (node.object) {
    case "block":
      return (
        <div {...attributes} key={node.key}>
          {children}
        </div>
      );
    case "inline":
      return (
        <span {...attributes} key={node.key}>
          {children}>
        </span>
      );
    case "text":
      return node.text;
    default:
      return null;
  }
}

export default {
  renderNode
};
