Hello!

For my first big React project, I built a web app to interact with the Tictail contacts API. Please see package.json for dependencies.

My first move was to plot out how I would display the full list. I decided to create an interface that the user could filter using a search box. The page loads the full list on page load, and then checks to see if there is text in the search box. If there is, the contacts that don't fit the search parameters are removed. The contacts whose images don't render display a title tag, which reads their name.

Once an employee is clicked, the app renders a new view via the route for that contact's id. All available information is displayed, along with an option to edit the contact by clicking a button at the bottom.

The edit page renders the same view as the page to add a new contact. When this view is loaded, it checks to see if an id was passed, in which case it populates the fields with the appropriate information. The information can be submitted once each field has a value. Once 'Save Contact' is clicked, the saveContact function checks to see if there is an id, in order to see if the information is an update or a new contact. From there it sends either a 'PUT' or a 'POST' request with the information in JSON form.

I tried to keep the design as simple as possible, in order to scale easily for mobile.

I look forward to any feedback!