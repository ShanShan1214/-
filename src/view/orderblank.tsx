import React, { useEffect, useState, useRef } from 'react'
import "../css/common.scss"
import {Table,Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useHistory } from "react-router-dom"
import ListService from "../service/order"
import dayjs from "dayjs"
export default function Orderblank() {
    const { Text } = Typography;
    const history = useHistory()
    const [orderid, setorderid] = useState<any>()
    const [msg, setmsg] = useState<any>()
    let [data, Setdata] = useState<any>()
    interface DataType {
        key: number
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
            title: '序号',
            dataIndex: 'key',
            key: 'key',
            // render: text => <a>{text}</a>,
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
        }

    ];
    //searchlist
    let searchlist = async (id: any) => {
        let { data: listorderbyid } = await ListService.listquery({ orderid: id })
        console.log(listorderbyid);
        let msg1=listorderbyid.list[0]
        setmsg(msg1)
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
    useEffect(() => {
        console.log(history.location);
        let orderid1 = history.location.hash.substring(1)
        setorderid(orderid1)
        // console.log(orderid1);
        searchlist(orderid1)
        console.log(msg);

    }, [])
    return (
        <div className='orderPage'>
            {/* {msg[0]} */}
            <h3 className='title'>佛山市二十七装饰材料有限公司</h3>
            <h4 className='title2'>订单确认书</h4>
            <div className='bodytext'>
                <div className='msg'>
                    <section className='partamsg'>
                        <p>出货方(甲方):{msg?.partaid?.partaname }</p>
                        <p>电话:{msg?.partaid?.tel }</p>
                        <p>订货方(乙方):{msg?.partbid?.partbname}</p>
                    </section>
                    <section className='partbmsg'>
                        <p>订单:{orderid}</p>
                        <p>日期:{dayjs(msg?.date).format("YYYY-MM-DD")}</p>
                        <p>传真:{msg?.partbid?.fax }</p>
                    </section>
                </div>
                <p className='observe'>兹因甲方向乙方订购下列产品，经双方议妥条款如下，以资共同遵守。</p>
                <p className='observe'>一、货品名称、数量、金额等如下：</p>
                <Table columns={columns} dataSource={data} bordered style={{ marginTop: "30px" }} 
                 summary={pageData => {
                    let totalBorrow = 0;
                    let totalRepayment = 0;

                    pageData.forEach(({ productnum, totalprice }) => {
                        totalBorrow += productnum;
                        totalRepayment += totalprice;
                    });

                    return (
                        <>
                            {data ? <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>合计</Table.Summary.Cell>
                                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                <Table.Summary.Cell index={2}></Table.Summary.Cell>
                                <Table.Summary.Cell index={3}></Table.Summary.Cell>
                                <Table.Summary.Cell index={4}></Table.Summary.Cell>
                                <Table.Summary.Cell index={5}></Table.Summary.Cell>
                                <Table.Summary.Cell index={6}></Table.Summary.Cell>
                                <Table.Summary.Cell index={7}>
                                    <Text >{totalBorrow}</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={8}></Table.Summary.Cell>
                                <Table.Summary.Cell index={9}>
                                    <Text>{totalRepayment}</Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                                : ""
                            }

                        </>
                    );
                }}
                
                />
                <p className='observe'>二、交货期限：订单确认后第3个工作日（若需开模日期另加计5-7个工作日）</p>
                <p className='observe'>三、运输方式：甲方自提。</p>
                <p className='observe'>四、付款方式：请全款支付,款到发货,我司账号如下:</p>
                <p className='observe' style={{ marginLeft: "50px" }}>户名：沈星星 建设银行：6217 0031 1003 0133 001(开户行：佛山狮山支行)</p>
                <p className='observe' style={{ marginLeft: "50px" }}>户名：沈星星 农业银行：6228 2714 6783 1235 472(开户行：佛山狮山支行)</p>
                <p className='observe' style={{ marginLeft: "50px" }}>户名：沈星星 邮政银行：6217 9958 8000 9229 184(开户行：佛山狮山支行)</p>
                <p className='observe'>五、未尽事宜：双方另行协商。</p>
                <p className='observe'>六、说明：本订单确认书一式两份，甲乙双方各执一份。</p>
                <div className='msg'>
                    <section className='partamsg'>
                        <p>甲方签字(盖章):</p>
                        <p>地&emsp; &emsp; &emsp; &emsp;址:</p>
                        <p>联&emsp;络&emsp;电&emsp;话:</p>
                        <p>经&emsp;&emsp;办&emsp;&emsp;人:</p>
                    </section>
                    <section className='partbmsg'>
                        <p>乙方签字(盖章):佛山市二十七装饰材料有限公司</p>
                        <p>乙   方    地   址:佛山市南海区狮山镇颜峰大道工业园7号</p>
                        <p>联   络    电   话:0757-85515086</p>
                        <p>经       办       人:雷君豪 13726699039</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
