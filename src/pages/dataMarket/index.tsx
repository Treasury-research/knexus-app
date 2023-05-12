import { Button } from '@chakra-ui/react'
import { Empty, Menu, MenuProps, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Head from 'next/head'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('My Publish', 'myPublish', null),
  getItem('My Purchase', 'myPurchase', null),
  getItem('Public List', 'publicList', null, [
    getItem('Data', 'data'),
    getItem('NFT Prompt', 'nftPrompt')
  ])
];

interface DataType {
  type: string,
  key: string;
  name: string;
  description: string;
  children?: any
}

const handleBuy = (id: string) => {
  // TODO:
}

const columnsSubtree: (action: "Buy" | "Unlist" | "Download") => ColumnsType<DataType> = (action) => {
  return [
    {
      title: 'Data Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Data Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          { action === "Buy"
            && <Popconfirm
              title="Buy"
              description="Confirm to buy the data?"
              onConfirm={() => handleBuy(record.key)}
              onCancel={() => {}}
              okText="Yes"
              cancelText="Cancel"
            >
            <a type="link">{action}</a>
          </Popconfirm>}
          { action === "Download" && <a>{action}</a>}
          { action === "Unlist" && <a>{action}</a>}
        </Space>
      ),
    },
  ];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Data Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    width: '25%'
  },
  {
    title: 'Data Description',
    dataIndex: 'description',
    key: 'description',
    width: '33%'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: '18%'
  },
  {
    title: 'Action',
    key: 'action',
  },
];

const data: DataType[] = [
  { key: uuidv4(), name: 'Bucket', description: 'Bucket des', type: 'bucket',
    children: [
      { name: 'data', key: uuidv4(), description: 'data des', price: 32,type: 'data' },
      { name: 'data2', key: uuidv4(), description: 'data des', price: 32,type: 'data' },
      { name: 'data3', key: uuidv4(), description: 'data des', price: 32,type: 'data' },
      { name: 'data4', key: uuidv4(), description: 'data des', price: 32,type: 'data' },
      { name: 'data5', key: uuidv4(), description: 'data des', price: 32,type: 'data' },
    ]
  },
  { key: uuidv4(), name: 'Bucket1', description: 'Bucket des', type: 'bucket',
    children: [
      { name: 'data', key: uuidv4(), description: 'data des', type: 'data', price: 32, },
      { name: 'data2', key: uuidv4(), description: 'data des', type: 'data', price: 32, },
      { name: 'data3', key: uuidv4(), description: 'data des', type: 'data', price: 32, },
      { name: 'data4', key: uuidv4(), description: 'data des', price: 32,type: 'data' },
      { name: 'data5', key: uuidv4(), description: 'data des', price: 32,type: 'data' },
    ]
  },
  { key: uuidv4(), name: 'Bucket2', description: 'Bucket des', type: 'bucket',
    children: [
      { name: 'data', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
      { name: 'data2', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
      { name: 'data3', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
      { name: 'data4', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
      { name: 'data5', key: uuidv4(), description: 'data des', price: 32,type: 'data' },
    ]
  },
  { key: uuidv4(), name: 'Bucket3', description: 'Bucket des', type: 'bucket',
    children: [
      { name: 'data', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
      { name: 'data2', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
      { name: 'data3', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
      { name: 'data4', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
      { name: 'data5', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
    ]
  },
  { key: uuidv4(), name: 'Bucket4', description: 'Bucket des', type: 'bucket',
    children: [
      { name: 'data', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
      { name: 'data2', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
      { name: 'data3', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
      { name: 'data4', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
      { name: 'data5', key: uuidv4(), description: 'data des', price: 32, type: 'data' },
    ]
  },
  { key: uuidv4(), name: 'bucket2', description: 'Bucket des', type: 'bucket', }
];

export default function Datamarket() {
  const [activeMenu, setActiveMenu] = useState<"myPublish" | "myPurchase" | "publicList" | "data" | "nftPrompt">("myPublish")
  const onClick: MenuProps['onClick'] = (e: any) => {
    setActiveMenu(e.key)
  };

  return (
    <>
      <Head>
				<title>Create Api Key</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
      <div className='mt-[50px]'>
        <div className='mx-20'>
          <h1 className='text-2xl font-bold'>Data Market</h1>
          <p className='text-xl my-2'>View your data list</p>
          <div className='flex my-6'>
            <Menu
              onClick={onClick}
              style={{ width: 256, background: "transparent", height: 600 }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              items={items}
            />
            <div className='flex-1'>
              <div className='w-11/12 mx-auto'>
                { activeMenu ==="myPublish" ? <Table columns={columns} scroll={{ y: 600 }} pagination={false}
                  expandable={{ expandedRowRender: (record) => <>
                    {record.children
                      ? <Table pagination={false} columns={columnsSubtree("Unlist")} showHeader={false} dataSource={record.children}/> 
                      : <Empty style={{marginBlock: 0, padding: '20px 0'}} image={Empty.PRESENTED_IMAGE_SIMPLE} />                        
                    }
                  </>,
                  defaultExpandAllRows: true
                  }}
                  dataSource={data}
                /> : null }
                { activeMenu === "myPurchase" ? <Table columns={columns} scroll={{ y: 600 }} pagination={false}
                  expandable={{ expandedRowRender: (record) => <>
                    {record.children
                      ? <Table pagination={false} columns={columnsSubtree("Download")} showHeader={false} dataSource={record.children}/> 
                      : <Empty style={{marginBlock: 0, padding: '20px 0'}} image={Empty.PRESENTED_IMAGE_SIMPLE} />                        
                    }
                  </>,
                  defaultExpandAllRows: true
                  }}
                  dataSource={data}
                /> : null }
                { activeMenu === "data" ? <Table columns={columns} scroll={{ y: 600 }} pagination={false}
                  expandable={{ 
                    expandedRowRender: (record) => <>
                    {record.children
                      ? <Table pagination={false} columns={columnsSubtree("Buy")} showHeader={false} dataSource={record.children}/> 
                      : <Empty style={{marginBlock: 0, padding: '20px 0'}} image={Empty.PRESENTED_IMAGE_SIMPLE} />                        
                    }
                  </>,
                  defaultExpandAllRows: true
                  }}
                  dataSource={data}
                /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
