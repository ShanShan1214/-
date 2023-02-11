import React, { useEffect, useState } from 'react'
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from "dayjs"
import PartaService from "../service/partA"
import PartAdd from "../comment/PartAdd"
export default function Management() {
  let [data, Setdata] = useState<any>([])
  let search = async () => {
    let { data: list } = await PartaService.listquery()
    let data1 = list.msg.map((item: any) => {
      let key = item._id
      let partaname = item.partaname
      let tel = item.tel
      let date = dayjs(item.date).format("YYYY/MM/DD")
      return { key, partaname, tel, date }
    })
    // console.log(data1);
    Setdata(data1)
  }
  useEffect(() => {
    search()

  }, [])
  interface DataType {
    key: string;
    partaname: string;
    tel: number;
    date: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '甲方名称',
      dataIndex: 'partaname',
      key: 'partaname',
      // render: text => <a>{text}</a>,
    },
    {
      title: '电话',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
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
    let { data: one } = await PartaService.add(info)
    //添加完重新渲染
    search()
  }
  return (
    <div>
      <PartAdd Add={Add}></PartAdd>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  )
}
