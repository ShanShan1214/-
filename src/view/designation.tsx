import React, { useEffect, useState } from 'react'
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import designationService from "../service/designation"
import DesignationAdd from "../comment/designationAdd"
export default function Designation() {
  let [data, Setdata] = useState<any>([])
  let search = async () => {
    let { data: list } = await designationService.listquery()
    let data1 = list.msg.map((item: any) => {
      let key = item._id
      let productname = item.productname
      let productmodel = item.productmodel
      return { key, productname, productmodel }
    })
    // console.log(data1);
    Setdata(data1)
  }
  useEffect(() => {
    search()

  }, [])
  interface DataType {
    key: string;
    productname: string;
    productmodel: number;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '产品名称',
      dataIndex: 'productname',
      key: 'productname',
      // render: text => <a>{text}</a>,
    },
    {
      title: '产品型号',
      dataIndex: 'productmodel',
      key: 'productmodel',
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
    let { data: one } = await designationService.add(info)
    //添加完重新渲染
    search()
  }
  return (
    <div>
     <DesignationAdd Add={Add}></DesignationAdd>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  )
}
