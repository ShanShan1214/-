import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useHistory } from "react-router-dom"
import UserService from "../service/login"
export default function Login() {
    const history = useHistory()
    const onFinish = async (values: any) => {
        //  console.log(history);
        console.log(values);
        let { data } = await UserService.login({ username: values.username, userpwd: values.password })
        console.log(data);
        if (data.code == 1) {
            window.localStorage.setItem("username", data.username);
            window.localStorage.setItem("token", data.token);
            history.push({ pathname: "/menu/parta" })
            message.success("登录成功")
        } else {
            message.error(data.msg)
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        message.error("请注意红色提示")
        // console.log('Failed:', errorInfo);
    };
    return (
        <div className='loginPage'>
            <div className='centerForm'>
                <h1>27极简管理系统</h1>
                <Form
                    className='Form'
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '用户名不能为空!' },
                        {
                            pattern: /^[a-zA-Z0-9]{2,10}$/i,
                            message: "只能是数字字母组成长度2到10"
                        }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '密码不能为空' },
                        {
                            pattern: /^[0-9a-z]{5,10}$/i,
                            message: "只能是数字字母组成长度5到10",
                        }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <Button type="primary" htmlType="reset" className="buttonReset">
                            重置
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div >
    )
}
