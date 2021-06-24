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
   * 获取处理后的数据
   */
  const pluginProps = plugin.getProps(props);
  return <AntTable<RecordType> {...pluginProps}></AntTable>;
};

export default Table;
