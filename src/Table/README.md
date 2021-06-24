# Table

---

## 增加标题 Tips

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

## 非受控排序

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

## 受控排序

```tsx
import React, { useState } from 'react';
import { Table } from 'enhance-component';

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

export default () => {
  const [sorts, setSorts] = useState([
    {
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: true,
    },
    {
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: false,
    },
    {
      key: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: false,
    },
  ]);

  return (
    <Table
      sortOptions={{
        sortDirections: ['ascend', 'descend'],
        sorts,
        onSortChange: (nextSorts) => {
          setSorts(nextSorts);
        },
      }}
      columns={columns}
      dataSource={dataSource}
    />
  );
};
```
