import React from 'react'
import {getContact} from '../../api'
import {Link} from 'react-router'

export default class Contact extends React.Component {
	componentWillMount() {
		// default to no contact information.
		this.setState({
	        contact: undefined 
	    })
	}
	componentDidMount() {
		// call for the contact's info by their ID.
		getContact(this.props.params.contact, data => this.setState({ contact: data }))
		// hide button to add new contact and search box.
		let addNew = document.getElementsByClassName('new')[0]
		addNew.style.display='none'
		let searchBar = document.getElementById('search')
		searchBar.style.display='none'
	}
	render() {
		if (this.state.contact){
			// CSS for 'color' div.
			let contactColor={backgroundColor:`#${this.state.contact.color}`}
			// format display of contact information.
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
		// until the contact information is recieved...
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