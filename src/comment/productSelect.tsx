import React, { useEffect, useState, useRef } from 'react'
import { Space, Table, Button, Modal, Form, Input, Select, InputNumber, Typography } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import designationService from "../service/designation" //产品名称
import colorService from "../service/color" //表面颜色
import sourceService from "../service/source"//光源
import directionService from "../service/directions"
import { useHistory } from "react-router-dom"
import { useStore } from 'react-redux';
import ListService from "../service/order"
import dayjs from "dayjs"
export default function ProductSelect({ Setdata, data, partAmsg, partBmsg, orderid }: any) {
    const history = useHistory()
    const { Text } = Typography;
    let [form] = Form.useForm()
    //请求产品名称的数据
    let [productnamelist, setproductnamelist] = useState([])
    //请求产品的颜色的数据
    let [productcolorlist, setproductcolor] = useState([])
    //光源
    let [productlightlist, setproductlight] = useState([])
    //出线方向
    let [productdirectionlist, setproductdirection] = useState([])
    let search = async () => {
        //产品名称
        let { data: productnamelist1 } = await designationService.listquery()
        setproductnamelist(productnamelist1.msg)
        // console.log(productnamelist1);
        //颜色
        let { data: productcolorlist1 } = await colorService.listquery()
        // console.log(productcolorlist1);
        setproductcolor(productcolorlist1.msg)
        //光源
        let { data: productlightlist1 } = await sourceService.listquery()
        // console.log(productlightlist1);
        setproductlight(productlightlist1.msg)
        //出现方向
        let { data: productdirectionlist1 } = await directionService.listquery()
        // console.log(productdirectionlist1);
        setproductdirection(productdirectionlist1.msg)


    }
    //声明产品名称选中状态下的产品
    const [productmodel1, setproductmodel1] = useState<any>("")

    useEffect(() => {
        search()
    }, [])
    // const form: any = useRef()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        form.resetFields()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields()
    };
    useEffect(() => {
        // console.log(data);


    })
    const onFinish = async (values: any) => {

        let { data: parta } = await ListService.listquery({ orderid })
        console.log(parta);
        let info
        if (data) {
            info = {
                ...values,
                orderid,
                partaid: parta.list[0].partaid._id,
                partbid: parta.list[0].partbid._id,
                productname: productnamelist.filter((item: any) => item._id === values.productname)[0]["productname"]
            }
        } else {
            info = {
                ...values,
                orderid,
                partaid: partAmsg._id,
                partbid: partBmsg._id,
                productname: productnamelist.filter((item: any) => item._id === values.productname)[0]["productname"]
            }
        }

        console.log(info);

        let { data: listadd } = await ListService.add(info)
        let { data: listorderbyid } = await ListService.listquery({ orderid })
        console.log(listorderbyid);
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
        Setdata(data1)
        form.resetFields()
        // console.log(data);
        setIsModalOpen(false);
    };
    //产品名称下拉框改变后的函数
    const handleChange = (value: any) => {
        let productnameMsg = productnamelist.filter((item: any) => item._id === value)[0]
        setproductmodel1(productnameMsg)
        form.setFieldsValue({ productmodel: productnameMsg["productmodel"] })
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    //改为父元素声明
    // let [data, Setdata] = useState<any>([])
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
    //点击进入订货单页面
    let inOrderBlank = () => {
        history.push({
            pathname: "/order/" + orderid,
            hash: orderid
        })
    }
    return (
        <div>
            {/* {orderid} */}
            <Button type="primary" onClick={showModal} style={{ marginTop: "30px",  background: " rgb(198, 102, 156)", border: "none" }}>
                新增订单
            </Button>
            <Modal title="新增订货单" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} style={{ textAlign: "center" }}>
                <Form
                    form={form}
                    // ref={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {/* 产品名称   productname*/}
                    <Form.Item
                        label="产品名称"
                        name="productname"
                        rules={[{ required: true, message: '名称不能为空' }]}
                    >
                        <Select
                            defaultValue="请选择"
                            style={{ width: 300 }}
                            onChange={handleChange}
                            labelInValue={false}
                            //数据渲染---产品名及产品型号
                            options={
                                productnamelist?.map((item: any) => {
                                    let value = item._id
                                    let label = item.productname
                                    return { value, label }
                                })

                            }
                        />
                    </Form.Item>
                    {/* 产品型号 */}
                    <Form.Item
                        label="产品型号"
                        name="productmodel"
                        rules={[{ required: true, message: '名称不能为空' }]}
                    >
                        <Input style={{ width: 300 }} />

                    </Form.Item>
                    {/* 表面处理颜色 */}
                    <Form.Item
                        label="表面处理(颜色)"
                        name="productcolor"
                        rules={[{ required: true, message: '颜色不能为空' }]}
                    >
                        <Select
                            defaultValue="请选择"
                            style={{ width: 300 }}
                            //数据渲染
                            options={productcolorlist?.map((item: any) => {
                                let value = item.productcolor
                                let label = item.productcolor
                                return { value, label }
                            })}
                        />
                    </Form.Item>
                    {/* 光源 */}
                    <Form.Item
                        label="光源"
                        name="productlight"
                        rules={[{ required: true, message: '光源不能为空' }]}
                    >
                        <Select
                            defaultValue="请选择"
                            style={{ width: 300 }}
                            //数据渲染---
                            options={
                                productlightlist?.map((item: any) => {
                                    let value = item.productlight
                                    let label = item.productlight
                                    return { value, label }
                                })}
                        />
                    </Form.Item>
                    {/* 出线方向 */}
                    <Form.Item
                        label="出线方向"
                        name="productdirection"
                        rules={[{ required: true, message: '出线方向不能为空' }]}
                    >
                        <Select
                            defaultValue="请选择"
                            style={{ width: 300 }}
                            //数据渲染---
                            options={productdirectionlist?.map((item: any) => {
                                let value = item.productdirection
                                let label = item.productdirection
                                return { value, label }
                            })}
                        />
                    </Form.Item>
                    {/* 规格 */}
                    <Form.Item
                        label="规格(mm)"
                        name="productsize"
                        rules={[{ required: true, message: '规格不能为空' }]}
                    >
                        <InputNumber<number>
                            style={{ width: 300 }}
                            step="0.01"
                            onChange={() => {
                            }}
                        />
                    </Form.Item>
                    {/* 数量 */}
                    <Form.Item
                        label="数量(支)"
                        name="productnum"
                        rules={[{ required: true, message: '数量不能为空' }]}
                    >
                        <InputNumber<number>
                            style={{ width: 300 }}
                            step="0.01"
                            onChange={() => {
                            }}
                        />
                    </Form.Item>
                    {/* 单价 */}
                    <Form.Item
                        label="单价(元/米)"
                        name="productprice"
                        rules={[{ required: true, message: '单价不能为空' }]}
                    >
                        <InputNumber<number>
                            style={{ width: 300 }}
                            step="0.01"
                            onChange={() => {
                            }}
                        />
                    </Form.Item>



                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ background: "rgb(198, 102, 156)", border: "none" }} >
                            提交
                        </Button>
                        <Button type="primary" htmlType="reset" style={{ marginLeft: "40px", background: "rgb(221, 172, 198)", border: "none" }}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

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
            {data ? <Button type="primary" onClick={() => { inOrderBlank() }}  style={{ background: "rgb(198, 102, 156)", border: "none" }}>生成订货单</Button> : ""}
        </div>
    )
}
