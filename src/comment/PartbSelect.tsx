import React, { useEffect, useState } from 'react'
import { Button, Select } from 'antd';
import PartbService from "../service/partB"
import dayjs from "dayjs"
import "../css/common.scss"

export default function PartBSelect({ next, partBmsg, SetpartBmsg }: any) {
    //获取乙方信息
    const [partbList, setpartbList] = useState<any>()
    let search = async () => {
        let { data: listB } = await PartbService.listquery()
        setpartbList(listB.msg)

    }
    useEffect(() => {
        search()
        // console.log(partbList);

    }, [])
    //选中之后显示下面电话和日期 ，确认乙方信息按钮
    const [partBselect, SetpartBselect] = useState<any>(0)
    //选中状态下的乙方的所有信息 (改为父组件定义)
    // const [partBmsg, SetpartBmsg] = useState<any>()
    const handleChange = (value: string) => {
        // console.log(`selected ${value}`);
        //选中改变控制甲方详细信息的甲方-id值来显示详情和确认按钮
        SetpartBselect(value)
        SetpartBmsg(partbList.filter((item: any) => item._id === value)[0])
    };
    return (
        <div className='PartBPage'>
            <Select
                defaultValue="请选择"
                onChange={handleChange}
                style={{ width: 120, margin: "20px 0" }}
                options={
                    partbList?.map((item: any) => {
                        let value = item._id
                        let label = item.partbname
                        return { value, label }
                    })
                }
            />
            {partBselect !== 0 ? <><div className='partAbutton' >传真&emsp;{partBmsg?.fax}</div></>
                : ""}
            {partBselect !== 0 ? <Button type="primary" onClick={() => { next() }} style={{  background: " rgb(198, 102, 156)", border: "none" }} >
                确认乙方信息
            </Button> : ""}
        </div>
    )
}
