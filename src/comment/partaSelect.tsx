
import { Button,  Select } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from 'react';
import PartaService from "../service/partA"
import { initList } from "../action/partlist"
import "../css/common.scss"
import dayjs from "dayjs"
export default function PartaSelect({ next, partAmsg, Setpartamsg }: any) {
    //全局的所有甲方信息
    let partaList = useSelector((state: any) => state.partaList.list); //全局甲方
    let dispatch = useDispatch();
    let search = async () => {
        let { data } = await PartaService.listquery()
        console.log(data.msg);
        dispatch(initList(data.msg))
    }
    //选中状态下的甲方的所有信息 (改为父组件定义)
    // const [partAmsg, Setpartamsg] = useState<any>()
    useEffect(() => {
        search()
    }, [])
    //选中之后显示下面电话和日期 ，确认甲方信息按钮
    const [partAselect, SetpartAselect] = useState<any>(0)
    const handleChange = (value: string) => {
        // console.log(`selected ${value}`);
        //选中改变控制甲方详细信息的甲方-id值来显示详情和确认按钮
        SetpartAselect(value)
        Setpartamsg(partaList.filter((item: any) => item._id === value)[0])
    };
    return (
        <div>
            <><Select
                defaultValue="请选择"
                style={{ width: 120, margin: "20px 0" }}
                onChange={handleChange}
                options={partaList.map((item: any) => {
                    let value = item._id
                    let label = item.partaname
                    return { value, label }
                })}
            />
                {partAselect !== 0 ? <><div className='partAbutton' style={{}}>电话&emsp;{partAmsg?.tel}</div>
                    <div className='partAbutton'>日期&emsp;{dayjs(partAmsg?.date).format("YYYY年MM月DD日")}</div></> : ""}

                {partAselect !== 0 ? <Button type="primary"  onClick={() => { next() }} style={{ marginBottom: "30px", background: " rgb(198, 102, 156)", border: "none" }}>
                    确认甲方信息
                </Button> : ""}
            </>

        </div>
    )
}
