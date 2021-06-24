import { ColumnType, TableProps } from '../interface';

const TableKeyEnsurePlugin = <
  R extends object = object,
  Props extends TableProps<R> = TableProps<R>,
>(
  props: Props,
) => {
  return {
    name: 'plugin:keyensure',
    visitor(column: ColumnType<R>, index: number, depth: number) {
      let key = column.key ? column.key + '' : undefined;
      if (!key && column.dataIndex) {
        key = Array.isArray(column.dataIndex)
          ? column.dataIndex.join('_')
          : column.dataIndex + '';
      }
      if (!key) {
        key = `__ETABLE_INNTER_KEY__`;
      }
      return { ...column, key, dataIndex: key };
    },
    stage: 100,
  };
};

export default TableKeyEnsurePlugin;
