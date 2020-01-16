export default interface NodeInterface<T> {
  type: string;
  key: string;
  data: any;
  nodes: T[];
  readonly object: string;
}
