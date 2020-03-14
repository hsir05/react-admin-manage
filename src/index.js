import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './routes/index';
import less from 'less';


const changeTheme = (val) => { // 改变主题样式
    less.modifyVars(
        {
            '@primary-color': val,
            '@link-color': val,
            '@btn-primary-bg': val,
        }
    )
    .then(() => {
        localStorage.setItem('theme', val)
    })
    .catch(error => {
    });
}
const theme = localStorage.getItem('theme')
theme && changeTheme(theme)

ReactDOM.render(<App />, document.getElementById('root'));
