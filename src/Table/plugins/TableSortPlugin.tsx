import {
  ChangeSortItem,
  ColumnType,
  SortItem,
  TableProps,
  TableChangeParameters,
} from '../interface';
import { omit } from '../utils/omit';

const TableSortPlugin = <
  R extends object = object,
  Props extends TableProps<R> = TableProps<R>,
>({
  sortOptions = { sorts: [] },
}: Props) => {
  const { sorts } = sortOptions;
  const sortConfigs = sorts.reduce<{ [x: string]: SortItem<R> }>(
    (obj, item) => {
      const sorter = item.sorter || sortOptions.sorter;
      const sortDirections = item.sortDirections || sortOptions.sortDirections;
      const defaultSortOrder =
        item.defaultSortOrder || sortOptions.defaultSortOrder;
      const sortOrder = item.sortOrder || sortOptions.sortOrder;
      let config = {
        key: item.key,
        sortDirections,
        defaultSortOrder,
        sorter,
        sortOrder,
      };
      obj[item.key] = omit<SortItem<R>>(config);
      return obj;
    },
    {},
  );

  return {
    name: 'plugin:sort',
    required: 'plugin:keyensure',
    visitor(column: ColumnType<R>, index: number, depth: number) {
      if (!sorts.length) return column;
      const sortProps = sortConfigs[column.key as string] ?? {};
      return { ...column, ...sortProps };
    },
    onChange(...args: TableChangeParameters<R>) {
      const [_pagination, _filters, sorter, extra] = args;
      if (extra.action === 'sort' && sorter) {
        let changeSorts: ChangeSortItem<R>[] = [];
        if (Array.isArray(sorter)) {
          changeSorts = sorter.map((item) => ({
            key: item.columnKey as string,
            column: item.column,
            order: item.order,
          }));
        } else {
          changeSorts = [
            {
              key: sorter.columnKey as string,
              column: sorter.column,
              order: sorter.order,
            },
          ];
        }
        sortOptions.onSortChange?.(changeSorts);
      }
    },
  };
};

export default TableSortPlugin;
