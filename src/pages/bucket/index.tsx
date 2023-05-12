import { Button, Menu, Modal, ModalBody, ModalCloseButton,MenuList, ModalContent,MenuItem, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Flex, Box } from '@chakra-ui/react';
import ufo from '../../../public/images/ufo.png';
import Head from "next/head";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import { getBucketList } from '@/client';
import {useAccount} from 'wagmi'
import { Space, Table, Empty } from 'antd'
import { useEffect, useState } from "react";
import { useStore } from '@/lib/store';
import { BaseModal } from '@/components/BaseModal';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/es/table';

export default function Home() {
  const {address} = useAccount();
  const { setComModalOpen, comModalOpen, groupModalOpen, setGroupModalOpen } = useStore()
  const [bucketName, setBucketName] = useState("")
  const [groupName, setGroupName] = useState("")
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
	const [bucketDatas, setBucketDatas] = useState([
    { key: uuidv4(), name: 'data', description: '',
    children: [
        { name: 'data', key: uuidv4(), description: 'data des' },
        { name: 'data2', key: uuidv4(), description: 'data des' },
        { name: 'data3', key: uuidv4(), description: 'data des' },
        { name: 'data4', key: uuidv4(), description: 'data des' },
        { name: 'data5', key: uuidv4(), description: 'data des' },
      ]
    },
    { key: uuidv4(), name: 'data', description: '',
    children: [
        { name: 'data', key: uuidv4(), description: 'data des' },
        { name: 'data2', key: uuidv4(), description: 'data des' },
        { name: 'data3', key: uuidv4(), description: 'data des' },
        { name: 'data4', key: uuidv4(), description: 'data des' },
        { name: 'data5', key: uuidv4(), description: 'data des' },
      ]
    },
    { key: uuidv4(), name: 'data', description: '',
    children: [
        { name: 'data', key: uuidv4(), description: 'data des' },
        { name: 'data2', key: uuidv4(), description: 'data des' },
        { name: 'data3', key: uuidv4(), description: 'data des' },
        { name: 'data4', key: uuidv4(), description: 'data des' },
        { name: 'data5', key: uuidv4(), description: 'data des' },
      ]
    },
    { key: uuidv4(), name: 'data', description: '',
    children: [
        { name: 'data', key: uuidv4(), description: 'data des' },
        { name: 'data2', key: uuidv4(), description: 'data des' },
        { name: 'data3', key: uuidv4(), description: 'data des' },
        { name: 'data4', key: uuidv4(), description: 'data des' },
        { name: 'data5', key: uuidv4(), description: 'data des' },
      ]
    },
    { key: uuidv4(), name: 'data', description: '',
    children: [
        { name: 'data', key: uuidv4(), description: 'data des' },
        { name: 'data2', key: uuidv4(), description: 'data des' },
        { name: 'data3', key: uuidv4(), description: 'data des' },
        { name: 'data4', key: uuidv4(), description: 'data des' },
        { name: 'data5', key: uuidv4(), description: 'data des' },
      ]
    },
    { key: uuidv4(), name: 'data', description: '',
    children: [
        { name: 'data', key: uuidv4(), description: 'data des' },
        { name: 'data2', key: uuidv4(), description: 'data des' },
        { name: 'data3', key: uuidv4(), description: 'data des' },
        { name: 'data4', key: uuidv4(), description: 'data des' },
        { name: 'data5', key: uuidv4(), description: 'data des' },
      ]
    },
    { key: uuidv4(), name: 'data', description: '',
    children: [
        { name: 'data', key: uuidv4(), description: 'data des' },
        { name: 'data2', key: uuidv4(), description: 'data des' },
        { name: 'data3', key: uuidv4(), description: 'data des' },
        { name: 'data4', key: uuidv4(), description: 'data des' },
        { name: 'data5', key: uuidv4(), description: 'data des' },
      ]
    },
    { key: uuidv4(), name: 'bucket2', description: '',
    }
  ])
  // create bucket
	const handleSubmit = async () => { 
    setBucketName("");
    setComModalOpen(false);
    // TODO:
  };
      // create group
  const handleCreateGroup = async () => { 
    setGroupName("")
    setGroupModalOpen(false);
    // TODO: 
  };

  const handleSelectGroupChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };


  interface DataType {
    key: string;
    name: string;
    description: string;
    children?: DataType[];
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (text, record) => {
        console.log(record);
        return (
          <div className='flex justify-end'>
            <Space size="large">
              { record.children ? <a href="">Upload</a> : null }
              <a onClick={() => setGroupModalOpen(true)}>Bind Group</a>
              <a href="">Download</a>
            </Space>
          </div>
        )
      }
    },
    Table.EXPAND_COLUMN,
  ];

  const doGetBucketList = async () => {
   const res = await getBucketList(address);
   console.log('bu list', res);
  }

  useEffect(() => {
    console.log('a', address)
    if(!address){
      return
    }
  doGetBucketList();
  }, [address])

	return (
		<>
			<Head>
				<title>Create Api Key</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
      <div className='mt-[50px]'>
        { !bucketDatas.length ?
          <div className="flex flex-row justify-center items-center mx-20">
            <div className="mt-10 ">
              <div className='w-64 h-64 mx-auto my-5'>
                <Image src={ufo} alt='' className='w-full h-full object-cover'/>
              </div>
              <p className='font-jura text-xl text-center flex justify-center -mt-10'>No Bucket has been created for your account.</p>
              <div className="font-jura text-xl text-center flex justify-center mt-8">
                <button className='flex-shrink-0 mb-6 flex items-center p-1 px-4 rounded bg-stone-600 hover:bg-stone-700 active:bg-stone-500 focus:ring-stone-500 text-sm'
                  onClick={() => setComModalOpen(true)}>
                  Create Bucket
                </button>
              </div>
            </div>
          </div>:
          <div className='mx-20'>
            <h1 className='text-2xl font-bold'>Bucket</h1>
            <p className='text-xl my-2'>Select a bucket to store data</p>
            <div className='flex flex-wrap my-6'>
              <Button variant="grayPrimary" fontSize="sm" paddingX={6} color={"#fff"}
                className="!mt-[10px] h-[35px] leading-3 mr-4" onClick={() => setComModalOpen(true)}
              >
                Create Bucket
              </Button>
              <Button variant="grayPrimary" isDisabled={true} fontSize="sm" paddingX={6} color={bucketName.length ? "#fff" : "#999" }
                className="!mt-[10px] h-[35px] leading-3 mr-4" onClick={() => setGroupModalOpen(true)}
              >
                Bind Group
              </Button>
              <Button variant="grayPrimary" isDisabled={true} fontSize="sm" paddingX={6} color={bucketName.length ? "#fff" : "#999" }
                className="!mt-[10px] h-[35px] leading-3 mr-4" onClick={handleSubmit}
              >
                Download
              </Button>
              <Button variant="grayPrimary" isDisabled={true}  fontSize="sm" paddingX={6} color={bucketName.length ? "#fff" : "#999" }
                className="!mt-[10px] h-[35px] leading-3 mr-4" onClick={handleSubmit}
              >
                Upload From File
              </Button>
            </div>
            <div style={{ maxHeight: `calc(100vh - 320px)`, overflow: 'auto'}}>
              { bucketDatas.map((item, index) => {
                return <div key={index} className='mb-6 overflow-auto'>
                  <Table
                    pagination={false}
                    showHeader={false}
                    size="middle"
                    columns={columns}
                    expandable={{ 
                      defaultExpandAllRows: true,
                    }}
                    dataSource={[item]}
                  />
                  {!item.children ? <div className='bg-[#1C2222]'>
                    <Empty style={{marginBlock: 0, padding: '20px 0'}} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>: null}
                </div>
              })}
            </div>
          </div>
        }
      </div>
      {/* create bucket */}
      <BaseModal isOpen={comModalOpen}
        onClose={() => setComModalOpen(false)}>
          <Flex w="full" justifyContent="space-between" flexDirection="column">
            <div className='mt-[20px] lg:w-[400px] sm:w-[300px]'>
              <h3>Bucket Name</h3>
              <input
                type="text"
                placeholder="Please enter"
                className="my-6 text-[#000] w-full h-[35px] bg-[#A0A79F] font-swiss721md border-0 block"
                value={bucketName}
                onChange={(e) => setBucketName(e.target.value)}
              />
              <p className='font-jura text-sm ml-2'>No Bucket has been created for your account.</p>
            </div>
            <Box mt={5} textAlign="right">
              <Button
                variant="grayPrimary"
                fontSize="sm"
                paddingX={6}
                color={bucketName.length ? "#fff" : "#999" }
                className="!mt-[10px] h-[35px] leading-3"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Flex>
      </BaseModal>
      <BaseModal isOpen={groupModalOpen} onClose={() => setGroupModalOpen(false)}>
        <Flex w="full" justifyContent="space-between" flexDirection="column">
          <div className='mt-[20px] lg:w-[400px] sm:w-[300px]'>
            <h3>Group Name</h3>
            <input
              type="text"
              placeholder="Please enter"
              className="my-6 text-[#000] w-full h-[35px] bg-[#A0A79F] font-swiss721md border-0 block"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <p className='font-jura text-sm ml-2'>No Group has been created for your account.</p>
          </div>
          <Box mt={5} textAlign="right">
            <Button
              variant="grayPrimary"
              fontSize="sm"
              paddingX={6}
              color={groupName.length ? "#fff" : "#999" }
              className="!mt-[10px] h-[35px] leading-3"
              onClick={handleCreateGroup}
            >
              Submit
            </Button>
          </Box>
        </Flex>
      </BaseModal>
		</>
	);
}
