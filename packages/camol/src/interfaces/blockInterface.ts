import NodeInterface from "./nodeInterface";
import InlineInterface from "./inlineInterface";
import TextInterface from "./textInterface";

export default interface BlockInterface
  extends NodeInterface<BlockInterface | InlineInterface | TextInterface> {
  getFirstText(): TextInterface;
  readonly object: "block";
  readonly text: string;
}
