import React from 'react'
import {getContacts, sortByLastName} from '../../api'
import {Link} from 'react-router'

export default class List extends React.Component {
	componentWillMount() {
		// set key for List state to hold value of contacts returned.
		this.setState({
	        contacts: []  
	    });
	}
	componentDidMount() {
		// sort JSON of contacts into alphabetical order.
		getContacts(data => this.setState({ contacts: data.sort(sortByLastName) }))
		// hide button to add new contact and search box.
		let addNew = document.getElementsByClassName('new')[0]
		addNew.style.display=''
		let searchBar = document.getElementById('search')
		searchBar.style.display=''
	}
	render() {
		// list of contacts to be displayed automatically set to full list.
		let contactsList = this.state.contacts
		let contacts = undefined
		if (this.props.searchValue !== "none"){ // is there a search value?
			let search = this.props.searchValue.toLowerCase()
			// console.log('search:', search)
			let current = this.state.contacts
			let matches = []
			for (let person in current){
				// turn JSON into string and check for search term.
				let info=JSON.stringify(current[person]).toLowerCase()
				if (info.indexOf(search) > -1){
					// console.log(info)
					// create array of search results.
					matches.push(current[person])
				}
			}
			// assign filtered contacts to list to be displayed.
			contactsList = matches
		}
		// format display of contact information.
		contacts = contactsList.map(function(contact){
			return (
				<li className="media" key={contact.id} data-color={contact.color}>
					<Link to={`/${contact.id}`}>
						<div className="media-left">
							<img className="media-object" src={contact.image} title={`${contact.first_name} ${contact.last_name}`}/>
						</div>
						<div className="media-body">
							<h4 className="media-heading">{contact.last_name}, {contact.first_name}</h4>
							<p className="pTitle">{contact.title}</p>
							<p>{contact.team}</p>
						</div>
					</Link>
				</li>
			)
		})
		// render final list to page.
		return (
			<ul className="media-list">
				{contacts}
			</ul>
		)
	}
}

