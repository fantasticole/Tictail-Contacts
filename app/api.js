import request from 'browser-request'

export function getContacts(cb){	
	return request('http://127.0.0.1:5000/contacts', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    // console.log(body) // Show the HTML for the page.
	    cb(JSON.parse(body))
	  }
	})
}

export function getContact(id, cb){
	return request(`http://127.0.0.1:5000/contacts/${id}`, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    // console.log(body) // Show the HTML for the page.
	    cb(JSON.parse(body))
	  }
	})
}

export function sortByLastName(a, b){
	if (a.last_name < b.last_name)
		return -1;
	if (a.last_name > b.last_name)
		return 1;
	return 0;
}

export function saveContact(obj, cb){
	let update = !!obj.id
	return request({
		method: update ? 'PUT' : 'POST',
		url:`http://127.0.0.1:5000/contacts` + (update ? ("/" + obj.id) : ""),
		body: obj,
		json: true},
		function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    // console.log("body:", body) // Show the HTML for the page.
		    cb(body)
	  }
	  else {
	  	console.log(error)
	  }
	})
}



