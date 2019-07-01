import React from 'react'
import ErrorPng from '../assets/404.png'
import { Button } from 'antd';

export default function Error (props) {
    const style = {
        error: {
            "width": "100%",
            "textAlign": "center",
            "height": "100%",
        },
        bg: {
            "width": "60%",
            "marginLeft": "120px",
            "marginTop": "40px"
        },
        'btn-wrap': {
            "marginTop": "50px"
        }
    };
    return (
        <div style={style.error}>
            <img src={ErrorPng} style={style.bg} alt="" />
            <div className="btn-wrap" style={style["btn-wrap"]}>
                <Button type="primary" href="/home" icon="left" shape="round"> 回首页 </Button>
            </div>
        </div>
    )
}
