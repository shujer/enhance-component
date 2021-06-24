import React from 'react';
import { useMemo } from 'react';
import { Table as AntTable } from 'antd';
import { TableProps } from './interface';
import {
  TableKeyEnsurePlugin,
  TableSortPlugin,
  TableTipPlugin,
  TablePlugin,
} from './plugins';

const Table = <RecordType extends object = object>(
  props: TableProps<RecordType>,
) => {
  /**
   * 初始化并注册插件
   */
  const plugin = useMemo(() => {
    const plugin = new TablePlugin<RecordType>();
    plugin.register('plugin:keyensure', TableKeyEnsurePlugin);
    plugin.register('plugin:tips', TableTipPlugin);
    plugin.register('plugin:sort', TableSortPlugin);
    return plugin;
  }, []);

  /**
   * 获取处理后的 props
   */
  const pluginProps = plugin.getProps(props);

  /**
   * 将数据传递给 Antd Table
   */
  return <AntTable<RecordType> {...pluginProps}></AntTable>;
};

export default Table;
