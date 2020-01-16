import LeafInterface from "./leafInterface";
export default interface TextInterface {
  key: string;
  leaves: LeafInterface[];
  readonly object: "text";
  readonly text: string;
}
