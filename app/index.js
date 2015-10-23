import 'styles/styles.less'

import React from 'react'
import ReactDOM from 'react-dom'
import {IndexRoute, Router, Route, Link} from 'react-router'

import api from 'api'
import App from 'components/app'
import List from 'components/routes/list'
import Contact from 'components/routes/contact'
import Edit from 'components/routes/edit'

ReactDOM.render((
  <Router>
  	<Route path="/" component={App}>
	  	<IndexRoute component={List} />
	  	<Route path="/new" component={Edit} />
	  	<Route path="/:contact" component={Contact} />
	  	<Route path="/:contact/edit" component={Edit} />
  	</Route>
  </Router>
), document.getElementById('app'));