import React, { useContext } from 'react'
import someText from "../context/someText"
export default function Test() {

    const { setpage3num } = useContext(someText)
  
    return (
        <div>
            子页面测试
            <button onClick={() => {
                setpage3num("子组件数据555555555")
            }}>点击传递</button>
        </div>
    )
}
