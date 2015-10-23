import React from 'react'
import {getContact, saveContact} from '../../api'
import {Link} from 'react-router'

class LocationSelector extends React.Component {
	render() {
		return (
			<select required className="loc" name="location" onChange={this.props.onChange} >
				<option value="">select location</option>
				<option value="Europe/Stockholm">Europe/Stockholm</option>
				<option value="America/New York">America/New York</option>
			</select>
		)
	}
}

export default class Edit extends React.Component {
	componentWillMount() {
		this.setState({
	        contact: {
	        	"first_name": "",
				"last_name": "",
				"title": "",
				"color": "",
				"image": "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12080476_1160320367330373_838501514_n.jpg",
				"location": "",
				"team": ""
	        },
	        empty: []
	    })
	}
	componentDidMount() {
		if (this.props.params.contact){
			getContact(this.props.params.contact, data => this.setState({ contact: data }))
		}
		let addNew = document.getElementsByClassName('new')[0]
		addNew.style.display='none'
		let searchBar = document.getElementById('search')
		searchBar.style.display='none'
	}
	handleChange(event){
		this.state.contact[event.target.name] = event.target.value
		this.setState(this.state)
	}
	handleClick(){
		let empty = []
		for (var key in this.state.contact){
			if (!this.state.contact[key]){
				empty.push(key)
			}
		}
		if (empty.length === 0){
			saveContact(this.state.contact, function(data){
				window.location = `/#/${data.id}`
			})
		}
		else{
			this.setState({empty: empty})
		}
	}
	render() {
		if (this.state.contact){
			let contactColor={backgroundColor:`#${this.state.contact.color}`}
			return (
				<li className="editMedia" key={this.state.contact.id}>
					<div className="media-left">
						<img className="media-object" src={this.state.contact.image || "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12080476_1160320367330373_838501514_n.jpg"}/>
					</div>
					<div className="media-body">
						<form className="about">
							<h4>FIRST NAME:</h4>
							<input required placeholder="enter first name" onChange={this.handleChange.bind(this)} name="first_name" type="text" defaultValue={`${this.state.contact.first_name}`} />
							<br className="showWhenSmall"/>
							<h4 className="rightInput">LAST NAME:</h4>
							<input required placeholder="enter last name" onChange={this.handleChange.bind(this)} name="last_name" type="text" defaultValue={`${this.state.contact.last_name}`} />
							<br/>
							<h4>TITLE:</h4>
							<input required placeholder="enter title" onChange={this.handleChange.bind(this)} name="title" type="text" defaultValue={`${this.state.contact.title}`} />
							<br className="showWhenSmall"/>
							<h4 className="rightInput">TEAM:</h4>
							<input required placeholder="enter team" onChange={this.handleChange.bind(this)} name="team" type="text" defaultValue={`${this.state.contact.team}`} />
							<br/>
							<h4>HEX COLOR:</h4>
							<input required className="colorPicker" maxlength="6" placeholder="enter color" onChange={this.handleChange.bind(this)} name="color" type="text" defaultValue={`${this.state.contact.color}`} />
							<div className="colorViewer" style={contactColor}></div>
							<br className="showWhenSmall"/>
							<h4 className="rightInput">LOCATION:</h4>
							<LocationSelector onChange={this.handleChange.bind(this)}/>
							<br/>
							<h4>IMAGE URL:</h4>
							<input required onChange={this.handleChange.bind(this)} name="image" type="text"defaultValue={`${this.state.contact.image}` || "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12080476_1160320367330373_838501514_n.jpg"} />
							<br className="showWhenSmall"/>
							<p className="instruct">A square picture, please.</p>
							<br/>
							<button onClick={this.handleClick.bind(this)}>Save Contact</button>
						</form>
					</div>
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