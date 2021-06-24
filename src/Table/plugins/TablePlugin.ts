import { ColumnType, Plugin, ColumnVisitor, TableProps } from '../interface';

export function pipe<R>(funcs: ColumnVisitor<R>[]): ColumnVisitor<R> {
  if (funcs.length === 0) {
    return (...args: Parameters<ColumnVisitor<R>>) => args[0];
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args: Parameters<ColumnVisitor<R>>) => {
    const [column, ...rest] = args;
    return b(a(column, ...rest), ...rest);
  });
}

export class TablePlugin<
  R extends object = object,
  Props extends TableProps<R> = TableProps<R>,
> {
  private plugins: Record<string, Plugin<R, Props>> = {};

  /**
   * @description 注册插件
   */
  register(name: string, plugin: Plugin<R, Props>) {
    if (this.plugins[name]) {
      console.warn(`[${name}] already installed!`);
    }
    this.plugins[name] = plugin;
  }

  /**
   * @description 获取包装后的 Props
   */
  getProps(props: Props) {
    const { columns: propsColumns, onChange, ...restProps } = props;
    const plugins = this.initPlugins(props);
    const columns = this.processColumns(plugins, propsColumns ?? []);
    return {
      columns,
      ...restProps,
    };
  }

  private initPlugins(props: Props) {
    const plugins: ReturnType<Plugin<R, Props>>[] = [];
    Object.values(this.plugins).forEach((pluginFn) => {
      const plugin = pluginFn(props);
      if (plugin.required && !this.plugins[plugin.required]) {
        throw Error(`Plugin '${plugin.required}' is required!`);
      }
      plugins.push(plugin);
    });
    return plugins.sort(({ stage: a = 0 }, { stage: b = 0 }) =>
      a < b ? 1 : a > b ? -1 : 0,
    );
  }

  /**
   * @description 处理 columns
   */
  private processColumns(
    plugins: ReturnType<Plugin<R, Props>>[],
    columns: Props['columns'],
  ) {
    const visitors = Object.values(plugins)

      .filter((ele) => typeof ele.visitor === 'function')
      .map((ele) => ele.visitor) as ColumnVisitor<R>[];
    const visitor = pipe<R>(visitors);
    return this.traverseColumns(columns ?? [], visitor);
  }

  /**
   * @description 深度递归遍历 columns 节点
   */
  private traverseColumns(
    columns: ColumnType<R>[],
    visitor: (
      column: ColumnType<R>,
      index: number,
      depth: number,
    ) => ColumnType<R>,
  ) {
    const walk = (columns: ColumnType<R>[], depth: number): ColumnType<R>[] => {
      return columns.map((column, i) => {
        const children = column.children
          ? walk(column.children, depth + 1)
          : undefined;

        return visitor({ ...column, children }, i, depth);
      });
    };
    return walk(columns, 0);
  }
}
