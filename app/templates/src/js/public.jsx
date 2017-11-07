/*
* @Author: Mark
* @Date:   2017-07-07 16:27:22
* @Last Modified by:   mark
* @Last Modified time: 2017-09-05 09:19:00
*/
import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import router from './Router/Route';
import {Provider} from 'react-redux';
import store from './Redux/Store/Store';
import fetchJsonp from 'fetch-jsonp';

//加载样式
import 'Sy/reset';

//加载rem计算
import './Config/phonerm';

store.subscribe(() => { //监听state变化
    console.log(store.getState())
});

render(
	<Provider store={store}>
		{router}
	</Provider>
	,document.getElementById('app')
);