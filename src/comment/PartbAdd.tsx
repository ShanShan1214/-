import React, { useState, useRef } from 'react'
import { Button, Modal, Form, Input } from 'antd';
export default function PartAdd({ Add }: any) {
    const form: any = useRef()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        form.current.resetFields()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.current.resetFields()
    };
    const onFinish = (values: any) => {
        // console.log('Success:', values);
        Add({ ...values})
        form.current.resetFields()
        setIsModalOpen(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Button type="primary" onClick={showModal} style={{ marginBottom: "30px", background: "rgb(198, 102, 156)", border: "none" }}>
                添加乙方
            </Button>
            <Modal title="新增乙方" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form
                    ref={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="乙方名称"
                        name="partbname"
                        rules={[{ required: true, message: '名称不能为空' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="传真"
                        name="fax"
                        rules={[{ required: true, message: '手机号不能为空' }]}
                    >
                        <Input />
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
        </div>
    )
}
