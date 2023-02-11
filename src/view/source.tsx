import React, { useEffect, useState } from 'react'
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import sourceService from "../service/source"
import SourceAdd from "../comment/sourceAdd"
export default function Source() {
  let [data, Setdata] = useState<any>([])
 
  
  let search = async () => {
    let { data: list } = await sourceService.listquery() 
    console.log(list);
    let data1 = list.msg.map((item: any) => {
      let key = item._id
      let productlight = item.productlight
      return { key, productlight }
    })
    // console.log(data1);
    Setdata(data1)
  }
  useEffect(() => {
    search()

  }, [])
  interface DataType {
    key: string;
    productlight: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '光源',
      dataIndex: 'productlight',
      key: 'productlight',
      // render: text => <a>{text}</a>,
    },
    {
      title: '状态',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" style={{ background: "rgb(198, 102, 156)", border: "none" }}>删除</Button>
        </Space>
      ),
    },
  ];
  //添加方法
  let Add = async (info: any) => {
    console.log("添加");
    let { data: one } = await sourceService.add(info)
    //添加完重新渲染
    search()
  }
  return (
    <div>
     <SourceAdd Add={Add}></SourceAdd>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  )
}