import EVENT_HANDLERS from "./event-handlers";

const PLUGIN_PROPS = [
  ...EVENT_HANDLERS,
  "decorateNode",
  "onChange",
  "renderEditor",
  "renderMark",
  "renderNode",
  "renderPlaceholder",
  "renderPortal",
  "schema",
  "validateNode"
];

export default PLUGIN_PROPS;
