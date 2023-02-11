import { Button, message, Steps, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import PartaSelect from "../comment/partaSelect"
import PartbSelect from "../comment/PartbSelect"
import ProductSelect from "../comment/productSelect"
import dayjs from "dayjs"
import ListService from "../service/order"
import { orderset } from "../action/orderset"
export default function Addone() {
  //全局的orderid
  let orderidAll = useSelector((state: any) => state.productorderid.orderidall)
  let dispatch = useDispatch();
  const steps = [
    //甲方信息
    {
      title: '选择甲方'
    },
    //乙方
    {
      title: '选择乙方',
    },
    {
      title: '选择产品',
    },
  ];
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);

  };
  //searchlist
  let searchlist = async (id: any) => {
    let { data: listorderbyid } = await ListService.listquery({ orderid: id })
    // console.log(listorderbyid);
    let key = 0
    let data1 = listorderbyid.list.map((item: any) => {
      key++
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
      return { key, partaname, productcolor, productname, productlight, productdirection, productsize, productnum, productprice, totalprice }
    })
    // console.log(data);
    
    Setdata(data1)

  }
  const [orderid, setorderid] = useState<any>(0)
  useEffect(() => {
    // setCurrent(2)
    console.log(orderidAll);
    if (orderidAll) {
      setorderid(orderidAll)
      setCurrent(2)
      searchlist(orderidAll)
    } else {
      let orderid1 = dayjs(new Date()).format("YYYY") + "-27-" + new Date().getTime()
      setorderid(orderid1)
    }
  }, [])
  useEffect(() => {
    return () => {
      setCurrent(0)
      dispatch(orderset(0))
      // console.log("页面销毁");
    }
  }, [])
  //定义甲方需要存的信息
  const [partAmsg, Setpartamsg] = useState<any>()

  //定义乙方需要存的信息

  const [partBmsg, SetpartBmsg] = useState<any>()

  //定义第三个页面需要存的信息
  let [data, Setdata] = useState<any>()



  const items = steps.map(item => ({ key: item.title, title: item.title }));

  return (
    <div>
      <Steps current={current} items={items} />
      <div className="steps-action">
        {current == 0 ? <PartaSelect next={next} partAmsg={partAmsg} Setpartamsg={Setpartamsg}></PartaSelect> : ""}
        {current == 1 ? <PartbSelect next={next} partBmsg={partBmsg} SetpartBmsg={SetpartBmsg}></PartbSelect> : ""}
        {current == 2 ? <ProductSelect data={data} Setdata={Setdata} partAmsg={partAmsg} partBmsg={partBmsg} orderid={orderid}></ProductSelect> : ""}
      </div>
    </div>
  )
}
