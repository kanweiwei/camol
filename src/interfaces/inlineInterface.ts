import TextInterface from "./textInterface";
import NodeInterface from "./nodeInterface";

export default interface InlineInterface
  extends NodeInterface<InlineInterface | TextInterface> {
  type: string;
  key: string;
  data: any;
  readonly object: "inline";
  readonly text: string;
}
