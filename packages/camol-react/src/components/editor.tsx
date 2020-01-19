import * as React from "react";
import { Value, Document } from "camol";
import afterPlugin, { renderNodeArgs } from "../plugins/after";
import BlockInterface from "camol/lib/interfaces/blockInterface";
import InlineInterface from "camol/lib/interfaces/inlineInterface";
import TextInterface from "camol/lib/interfaces/textInterface";

interface Plugin {
  renderNode?(data: renderNodeArgs): React.ReactNode | React.ReactNode[];
}

interface EditorProps {
  value: Value;
  plugins: Plugin[];
  renderNode?(): React.ReactNode | React.ReactNode[];
  [propName: string]: any;
}

function renderNodes(
  nodes: (BlockInterface | InlineInterface | TextInterface)[],
  { plugins }
) {
  let renderNodePlugins = plugins.filter((n: any) => "renderNode" in n);

  return nodes.map(n => {
    let r: React.ReactNode | React.ReactNode[];
    for (let i = 0, len = renderNodePlugins.length; i < len; i++) {
      r = renderNodePlugins[i].renderNode({
        node: n,
        attributes: { "data-key": n.key },
        children: "nodes" in n ? renderNodes(n.nodes, { plugins }) : n.text
      });
      if (r) {
        return r;
      }
    }
    return null;
  });
}

function renderContent(document: Document, { plugins }) {
  return renderNodes(document.nodes, { plugins });
}

function renderEditor(props: EditorProps) {
  let { value, plugins, renderNode } = props;
  plugins = plugins ?? [];
  let customPlugin: Plugin = {};
  let allPlugins = [];
  if (renderNode) {
    customPlugin.renderNode = renderNode;
  }
  allPlugins = [...plugins, customPlugin, afterPlugin];
  return (
    <div
      data-camol-editor={true}
      // ref={this.ref}
      data-key={value.document.key}
      contentEditable={props.readOnly ? null : true}
      suppressContentEditableWarning
      className={props.className}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      onCompositionEnd={props.onCompositionEnd}
      onCompositionStart={props.onCompositionStart}
      onCopy={props.onCopy}
      onCut={props.onCut}
      onDragEnd={props.onDragEnd}
      onDragOver={props.onDragOver}
      onDragStart={props.onDragStart}
      onDrop={props.onDrop}
      onInput={props.onInput}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      onPaste={props.onPaste}
      onSelect={props.onSelect}
      autoCorrect={props.autoCorrect ? "on" : "off"}
      spellCheck={props.spellCheck}
      style={props.style}
      role={props.readOnly ? null : "textbox"}
      // tabIndex={tabIndex}
      // COMPAT: The Grammarly Chrome extension works by changing the DOM out
      // from under `contenteditable` elements, which leads to weird behaviors
      // so we have to disable it like this. (2017/04/24)
      data-gramm={false}
    >
      {renderContent(value.document, { plugins: allPlugins })}
    </div>
  );
}

function Editor(props: EditorProps) {
  return renderEditor(props);
}

export default Editor;
