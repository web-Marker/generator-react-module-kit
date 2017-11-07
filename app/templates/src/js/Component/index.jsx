/*
* @Author: Mark
* @Date:   2017-07-07 16:59:18
* @Last Modified by:   mark
* @Last Modified time: 2017-07-17 16:51:34
*/

import React, {Component, PropTypes} from 'react';
import Tool from '../Config/Tool';
import { connect } from 'react-redux';
import *as action from '../Redux/Action/Index';
import { is, fromJS} from 'immutable';


if (module.hot) {
	module.hot.accept();
}
class Index extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			list:''
		}
	}
	
	componentWillMount(){
		this.props.dispatch(action.fetchPosts(true, false))
	}

	componentWillReceiveProps(nextProps){
		let {list} = this.props;
		console.log(list)
		if (!is(fromJS(list),fromJS(nextProps.list))) {
			this.setState({
				list: nextProps.list
			})
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
	}

	render() {
		return (
			<div className={`index need`}>
				{this.state.list ? 'The data is coming':'Waiting for data'}
			</div>		
		)
	}
}

//上级给下级的props
const mapStateToProps = (state) =>{

	return {
		list: state.fetchData.toJS().list
	}
}


export default connect(mapStateToProps)(Index);



