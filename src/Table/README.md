# Table

---

## Tips 扩展

```tsx
import React from 'react';
import { Table } from 'enhance-component';

const dataSource = [
  {
    key: '1',
    name1: 'John',
    name2: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name1: 'John',
    name2: 'Mike',
    age: 42,
    address: '10 Downing Street',
  },
];
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    tips: 'Hello World!',
    children: [
      {
        title: 'Name1',
        key: 'name1',
        tips: 'Hello World!!!',
      },
      {
        title: 'Name2',
        key: 'name2',
        tips: 'Hello World!!!',
      },
    ],
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

export default () => <Table columns={columns} dataSource={dataSource} />;
```

## 排序扩展

```tsx
import React from 'react';
import { Table } from 'enhance-component';

const dataSource = [
  {
    key: '1',
    name1: 'Mike1',
    name2: 'Joe1',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name1: 'Joe2',
    name2: 'Mike2',
    age: 42,
    address: '10 Downing Street',
  },
];
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    children: [
      {
        title: 'Name1',
        key: 'name1',
      },
      {
        title: 'Name2',
        key: 'name2',
      },
    ],
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

export default () => (
  <Table
    sortOptions={{
      sortDirections: ['ascend', 'descend'],
      sorts: [
        {
          key: 'name1',
          sorter: (a, b) => a.name1?.length - b.name1?.length,
        },
        {
          key: 'name2',
          sorter: (a, b) => a.name2?.length - b.name2?.length,
        },
      ],
    }}
    columns={columns}
    dataSource={dataSource}
  />
);
```
