import {
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
      let config = {
        key: item.key,
        sortDirections: item.sortDirections || sortOptions.sortDirections,
        defaultSortOrder: item.defaultSortOrder || sortOptions.defaultSortOrder,
        sorter: item.sorter || sortOptions.sorter,
        sortOrder: item.sortOrder || sortOptions.sortOrder,
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
      if (extra.action !== 'sort' || !sorter) {
        return;
      }
      let changeSorts: { [x: string]: SortItem<R> } = {};
      let sorters = Array.isArray(sorter) ? sorter : [sorter];

      changeSorts = sorters.reduce((obj, ele) => {
        let key = ele.columnKey + '';
        let item: SortItem<R> = {
          ...(sortConfigs[key] ?? {}),
          sortOrder: ele.order,
        };
        obj[key] = item;
        return obj;
      }, {} as { [x: string]: SortItem<R> });

      let nextSorts = sorts.map((ele) => ({
        ...ele,
        ...(changeSorts[ele.key] ?? {}),
        sortOrder: changeSorts[ele.key]?.sortOrder ?? null,
      }));

      sortOptions.onSortChange?.(nextSorts, Object.values(changeSorts));
    },
  };
};

export default TableSortPlugin;
