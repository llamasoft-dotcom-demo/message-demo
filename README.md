Updates I made and extra features:
Alerts now appear as messages that fade in and out.  Position is fixed so user can still see them even when scrolling.



Interesting things you noticed about the code:

I noticed the map functions are namespaced to avoid collisions with other objects or variables in the global scope. This guided my decision to make any other functions a property of that object.

Suggestions for improvements:

Add features to the selected airports list to allow user to pan to that airport on click or remove the airport from the sidebar
Further refactor code into modules to allow for unit testing.
Add geolocation to allow users to search nearby airports.
Add a feature to allow users to search all airports in a particular state.
