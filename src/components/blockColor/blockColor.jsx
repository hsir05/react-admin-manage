import React from 'react';
import { Tooltip } from 'antd';
import './blockColor.scss'

const BlockChecbox = ({ onChange, list }) => (
    <div className="block-color" >
        {list.map(item => (
            <Tooltip title={item.title} key={item.key}>
                <div className="item select-icon" style={{background:`${item.key}`}}  onClick={() => onChange(item.key)}>
                </div>
            </Tooltip>
        ))}
    </div>
);

export default BlockChecbox;