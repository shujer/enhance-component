import React, { ReactNode } from 'react';
import {
  TableColumnType as AntTableColumnType,
  TableProps as AntTableProps,
} from 'antd';

/**
 * extend column type
 */
export type ColumnType<R> = Omit<
  AntTableColumnType<R>,
  'sorter' | 'sortDirections' | 'defaultSortOrder' | 'sortOrder'
> & {
  tips?: ReactNode;
  children?: ColumnType<R>[];
};

export type SingleSorter<R> = (
  a: R,
  b: R,
  sortOrder?: AntTableColumnType<R>['sortOrder'],
) => number;

export type MultipleSorter<R> = {
  compare?: SingleSorter<R>;
  multiple?: number;
};

/**
 * extend sort options
 */
export interface SortItem<R> {
  /**
   * 必填，需要排序的字段
   */
  key: string;
  /**
   * 支持的排序方式，覆盖 SortOptions 的 sortDirections
   */
  sortDirections?: AntTableColumnType<R>['sortDirections'];
  /**
   * 默认的排序方式
   */
  defaultSortOrder?: AntTableColumnType<R>['defaultSortOrder'];
  /**
   * 自定义本地的排序方式
   */
  sorter?: boolean | SingleSorter<R> | MultipleSorter<R>;
  /**
   * 列排序的受控的配置
   */
  sortOrder?: AntTableColumnType<R>['sortOrder'];
}
/**
 * 排序配置，扩展 SortItem，支持统一的配置
 */
export interface SortOptions<R> extends Omit<SortItem<R>, 'key'> {
  /**
   * 排序配置
   */
  sorts: SortItem<R>[];
  /**
   * 排序发生变化的回调
   */
  onSortChange?: (sorts: SortItem<R>[], changeSorts: SortItem<R>[]) => any;
}

/**
 * extend table type
 */
export interface TableProps<R extends object = object>
  extends Omit<AntTableProps<R>, 'columns' | 'sortDirections'> {
  columns?: ColumnType<R>[];
  sortOptions?: SortOptions<R>;
}

export type ColumnVisitor<R> = (
  column: ColumnType<R>,
  index: number,
  depth: number,
) => ColumnType<R>;

export type TableChangeParameters<R extends object = object> = Parameters<
  NonNullable<TableProps<R>['onChange']>
>;

export type Plugin<
  R extends object = object,
  P extends TableProps<R> = TableProps<R>,
> = (props: P) => {
  name: string;
  stage?: number;
  required?: string;
  visitor?: ColumnVisitor<R>;
  onChange?: TableProps<R>['onChange'];
};
