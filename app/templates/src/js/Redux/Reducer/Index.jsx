import {REQUEST_POSTS, RECEIVE_POSTS} from '../Action/Index'
import Immutable from 'immutable'

//首次渲染页面
const defaultState = Immutable.fromJS({fetchload: true, list: {}})

export const fetchData = (state = defaultState, action) =>{
	switch (action.type) {
		case REQUEST_POSTS:
			return state.set('fetchload', action.data) 
			
		case RECEIVE_POSTS:
			return Immutable.Map({'fetchload': action.data, 'list': action.json})
			
		default: 
			return state;
	}
}





