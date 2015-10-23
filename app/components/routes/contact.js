import React from 'react'
import {getContact} from '../../api'
import {Link} from 'react-router'

export default class Contact extends React.Component {
	componentWillMount() {
		this.setState({
	        contact: undefined 
	    })
	}
	componentDidMount() {
		getContact(this.props.params.contact, data => this.setState({ contact: data }))
		let addNew = document.getElementsByClassName('new')[0]
		addNew.style.display='none'
		let searchBar = document.getElementById('search')
		searchBar.style.display='none'
	}
	render() {
		if (this.state.contact){
			let contactColor={backgroundColor:`#${this.state.contact.color}`}
			return (
				<li className="singleMedia" key={this.state.contact.id}>
					<div className="media-left">
						<img className="media-object" src={this.state.contact.image} title={`${this.state.contact.first_name} ${this.state.contact.last_name}`}/>
					</div>
					<div className="media-body">
						<h4>NAME:</h4><p>{this.state.contact.first_name}&nbsp;{this.state.contact.last_name}</p>
						<br/>
						<h4>TITLE:</h4><p>{this.state.contact.title}</p>
						<br/>
						<h4>TEAM:</h4><p>{this.state.contact.team}</p>
						<br/>
						<h4>COLOR:</h4><div className="color" style={contactColor} title={`#${this.state.contact.color}`}></div>
						<br/>
						<h4>LOCATION:</h4><p>{this.state.contact.location}</p>
					</div>
					<Link to={`/${this.state.contact.id}/edit`}>
						<button>Edit Contact</button>
					</Link>
				</li>
			)
		}
		return (
			<li className="singleMedia">
				<div className="media-left">
					<img className="media-object"/>
				</div>
				<div className="media-body">
					Loading Contact Details...
				</div>
			</li>
		)
	}
}