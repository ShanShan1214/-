import React, { useEffect, useState } from 'react'
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import colorService from "../service/color"
import ColorAdd from "../comment/colorAdd"
export default function Color() {
  let [data, Setdata] = useState<any>([])
 
  
  let search = async () => {
    let { data: list } = await colorService.listquery() 
    console.log(list);
    let data1 = list.msg.map((item: any) => {
      let key = item._id
      let productcolor = item.productcolor
      return { key, productcolor }
    })
    // console.log(data1);
    Setdata(data1)
  }
  useEffect(() => {
    search()

  }, [])
  interface DataType {
    key: string;
    productcolor: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '颜色',
      dataIndex: 'productcolor',
      key: 'productcolor',
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
    let { data: one } = await colorService.add(info)
    //添加完重新渲染
    search()
  }
  return (
    <div>
     <ColorAdd Add={Add}></ColorAdd>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  )
}