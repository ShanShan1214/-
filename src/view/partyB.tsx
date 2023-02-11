import React, { useEffect, useState } from 'react'
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from "dayjs"
import PartbService from "../service/partB"
import PartBAdd from "../comment/PartbAdd"
export default function Management() {
  let [data, Setdata] = useState<any>([])

  let search = async () => {
    let { data: list } = await PartbService.listquery()
    console.log(list);
    
    let data1 = list.msg.map((item: any) => {
      let key = item._id
      let partbname = item.partbname
      let fax = item.fax
      let date = dayjs(item.date).format("YYYY/MM/DD")
      return { key, partbname, fax, date }
    })
    // console.log(data1);
    Setdata(data1)
  }
  useEffect(() => {
    search()

  }, [])
  interface DataType {
    key: string;
    partbname: string;
    fax: number;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '乙方名称',
      dataIndex: 'partbname',
      key: 'partbname',
      // render: text => <a>{text}</a>,
    },
    {
      title: '传真',
      dataIndex: 'fax',
      key: 'fax',
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
    let { data: one } = await PartbService.add(info)
    //添加完重新渲染
    search()
  }
  return (
    <div>
      <PartBAdd Add={Add}></PartBAdd>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  )
}
