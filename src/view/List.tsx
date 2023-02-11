import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from "dayjs"
import ListService from "../service/order"
import { orderset } from "../action/orderset"
export default function Management() {
  const history = useHistory()
  //全局的orderid
  let orderidAll = useSelector((state: any) => state.productorderid.orderidall)
  let dispatch = useDispatch();
  let [data, Setdata] = useState<any>([])
  let search = async () => {
    let { data: list } = await ListService.listquery()
    console.log(list);

    let data1 = list.list.map((item: any) => {
      let key = item._id
      let orderid = item.orderid  //订单id  string
      let partaname = item.partaid?.partaname //甲方名称 string
      let productname = item.productname  //产品名称 string
      let productcolor = item.productcolor //表面处理颜色  string
      let productlight = item.productlight  //光源 string 
      let productdirection = item.productdirection //出线方向 string
      let productsize = item.productsize //规格  number
      let productnum = item.productnum //数量 number
      let productprice = item.productprice //单价
      let totalprice = 0
      if (productsize > 500) {
        totalprice = productprice * productnum * productsize / 1000
      } else {
        totalprice = productprice * productnum / 2
      }
      return { key, orderid, partaname, productcolor, productname, productlight, productdirection, productsize, productnum, productprice, totalprice }
    })
    console.log(data1);
    Setdata(data1)
  }
  let InAddlist = (id: any) => {
    let orderid = id
    dispatch(orderset(orderid))
    // console.log(orderidAll);

    history.push("/menu/Addone")
  }
  useEffect(() => {
    search()

  }, [])
  interface DataType {
    key: number
    orderid: string
    partaname: string
    productcolor: string
    productname: string
    productlight: string
    productdirection: string
    productsize: number
    productnum: number
    productprice: number
    totalprice: number
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '订单编号',
      dataIndex: 'orderid',
      key: 'orderid',
      render: (_, record) => (
        <Space size="middle">
          <a style={{ color: "rgb(198, 102, 156)" }} onClick={() => { InAddlist(record.orderid) }}>{record.orderid}</a>
        </Space>
      ),
    },
    {
      title: '甲方名称',
      dataIndex: 'partaname',
      key: 'partaname',
    },
    {
      title: '产品名称',
      dataIndex: 'productname',
      key: 'productname',
    },
    {
      title: '表面处理(颜色)',
      dataIndex: 'productcolor',
      key: 'productcolor',
    }, {
      title: '光源',
      dataIndex: 'productlight',
      key: 'productlight',
    },
    {
      title: '出现方向',
      dataIndex: 'productdirection',
      key: 'productdirection',
    },
    {
      title: '规格(mm)',
      dataIndex: 'productsize',
      key: 'productsize',
    },
    {
      title: '数量（支）',
      dataIndex: 'productnum',
      key: 'productnum',
    }
    ,
    {
      title: '单价（元/米）',
      dataIndex: 'productprice',
      key: 'productprice',
    }
    ,
    {
      title: '金额(元）',
      dataIndex: 'totalprice',
      key: 'totalprice',
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
  return (
    <div>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  )
}
