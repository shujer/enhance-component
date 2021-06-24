import React from 'react';
import { Fragment } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { ColumnType, TableProps } from '../interface';

const TableTipPlugin = <
  R extends object = object,
  Props extends TableProps<R> = TableProps<R>,
>(
  props: Props,
) => {
  return {
    name: 'plugin:tips',
    visitor(column: ColumnType<R>, index: number, depth: number) {
      let title = column.title;
      if (column.tips) {
        title = (
          <Fragment>
            {column.title}
            <Tooltip placement="top" title={column.tips} autoAdjustOverflow>
              <QuestionCircleOutlined style={{ marginLeft: 4 }} />
            </Tooltip>
          </Fragment>
        );
      }
      return { ...column, title };
    },
  };
};

export default TableTipPlugin;
