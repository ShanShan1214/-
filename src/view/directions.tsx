import React, { useEffect, useState } from 'react'
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import directionService from "../service/directions"
import DirectionAdd from "../comment/directionAdd"
export default function Direction() {
  let [data, Setdata] = useState<any>([])
 
  
  let search = async () => {
    let { data: list } = await directionService.listquery() 
    console.log(list);
    let data1 = list.msg.map((item: any) => {
      let key = item._id
      let productdirection = item.productdirection
      return { key, productdirection }
    })
    // console.log(data1);
    Setdata(data1)
  }
  useEffect(() => {
    search()

  }, [])
  interface DataType {
    key: string;
    productdirection: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '产品方向',
      dataIndex: 'productdirection',
      key: 'productdirection',
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
    let { data: one } = await directionService.add(info)
    //添加完重新渲染
    search()
  }
  return (
    <div>
     <DirectionAdd Add={Add}></DirectionAdd>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  )
}