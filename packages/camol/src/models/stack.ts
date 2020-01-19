import { isArray } from "lodash-es";

interface PluginKeys {
  // #region 事件句柄
  /**
   * 事件句柄
   */
  onBeforeInput: any;
  onBlur: any;
  onClick: any;
  onContextMenu: any;
  onCompositionEnd: any;
  onCompositionStart: any;
  onCopy: any;
  onCut: any;
  onDragEnd: any;
  onDragEnter: any;
  onDragExit: any;
  onDragLeave: any;
  onDragOver: any;
  onDragStart: any;
  onDrop: any;
  onInput: any;
  onFocus: any;
  onKeyDown: any;
  onKeyUp: any;
  onPaste: any;
  onSelect: any;
  // #endregion
  // #region 非事件句柄
  /**
   * 非事件句柄
   */
  scheam: any;
  decorateNode: any;
  onChange: any;
  renderEditor: any;
  renderMark: any;
  renderNode: any;
  renderPlaceholder: any;
  renderPortal: any;
  schema: any;
  validateNode: any;
  // #endregion
}

type PluginInstance<P> = {
  [K in keyof P]?: P[K];
};

class Stack {
  plugins: PluginInstance<PluginKeys>[];

  constructor(plugins?: PluginInstance<PluginKeys>[]) {
    this.plugins = plugins ?? [];
  }

  static create(plugins: PluginInstance<PluginKeys>[] | Stack) {
    if (plugins instanceof Stack) {
      return plugins;
    }
    if (isArray) {
      return Stack.fromObject(plugins);
    }
  }
  static fromObject(plugins: PluginInstance<PluginKeys>[]) {
    return new Stack(plugins);
  }

  /**
   * 获取所有拥有指定属性的插件
   * @param property
   */
  getPluginsWith(property: string) {
    return this.plugins.filter(p => property in p);
  }
}

export default Stack;
