

export const REQUEST_POSTS = 'REQUEST_POSTS'; //开始发送请求
export const RECEIVE_POSTS = 'RECEIVE_POSTS'; //收到请求结果


import Tool from '../../Config/Tool'


//发送请求开始
export const requestPosts = (data) =>{
	return {
    	type: REQUEST_POSTS,
    	data
  	}
}

//收到了请求结果
export const receivePosts = (data, json) =>{
	return {
    	type: RECEIVE_POSTS,
    	data,
    	json
  	}
}

//页面第一次渲染
export const fetchPosts = (start, end) =>{
	return dispatch => {
		dispatch(requestPosts(start));
		Tool.ajax('http://apis.juhe.cn/webscan/?domain=juhe.cn&key=e8653d8956536b7ee9fdc538be7bb707').then((data)=>{//百度测试api
			console.log(data)
			dispatch(receivePosts(end, data.reason));

		})
	}
}

