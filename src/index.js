import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './routes/index';
import less from 'less';
import "./api/http.js";


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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
