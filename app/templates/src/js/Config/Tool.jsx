import fetchJsonp from 'fetch-jsonp';


module.exports =  {

	objorString(obj){
		let array = [];
		for (let key in obj){
			let str = key+'='+obj[key];
			array.push(str);
		}
		let urlParam = array.join('&')
		return urlParam;
	},

	isEmptyObject(obj) {   
	　　for (var name in obj){
	　　　　return false;//返回false，不为空对象
	　　}　　
	　　return true;//返回true，为空对象
	},

	async ajax(url){
		
	    try{

			let reponse = await fetchJsonp(url);
			let data = reponse.json();
			return data;

		}catch(e){
			console.log("获取错误", e);
		}  
	}
}


