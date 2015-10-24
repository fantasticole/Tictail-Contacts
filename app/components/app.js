import React from 'react'
import {Link} from 'react-router'


class SearchContacts extends React.Component {
	render() {
		return (
			<input id="search" type="text" placeholder="search" onChange={this.props.onChange} />
		)
	}
}


export default class App extends React.Component {
	componentWillMount() {
		this.setState({
		    searchValue: 'none'
		})
	}
	handleChange(event){
		this.setState({
		    searchValue: event.target.value
		})
	}
	render() {
		return (
			<div>
				<div className="nav">
					<div className="title">
						<h1>
							<Link to={`/`}>TICTAIL CONTACTS</Link>
						</h1>
					</div>
					<div className="new">
						<h2>
							<Link to={`/new`}>+Add New</Link>
						</h2>
					</div>
					<SearchContacts onChange={this.handleChange.bind(this)}/>
				</div>
				<div className="pageInfo">
					{React.cloneElement(this.props.children, {searchValue: this.state.searchValue})}
				</div>
			</div>
		)
	}
}


