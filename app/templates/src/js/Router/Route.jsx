import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRedirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

if (module.hot) {
    module.hot.accept();
}

class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const Index = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/index').default)
    },'index')
}


const history = process.env.NODE_ENV !== 'development' ? hashHistory : browserHistory;

const RouteConfig = (
	<Router history={history}>
		<Route path="/" component={Roots}>
			<IndexRoute getComponent={Index}/>
			<IndexRedirect to="/index" />
			<Route path="index" getComponent={Index} />
		</Route>
	</Router>
)

export default RouteConfig;