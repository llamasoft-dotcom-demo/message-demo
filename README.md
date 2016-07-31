Updates I made and extra features:
Alerts now appear as messages that fade in and out.  Position is fixed so user can still see them even when scrolling.
When more than one message appears, the message boxes are stacked.
Each message has a close button that will remove the message from view.
There is a notification system that counts the number of new messages received.  When the notification icon is clicked old messages and their timestamp can be viewed and the red notification circle is removed on clicking the message list.
I created a clear button to remove all notifications.
There is a status indicator when the messages are running.

Interesting things you noticed about the code:
I noticed the mesage system is namespaced to avoid collisions with other objects or variables in the global scope. 

Suggestions for improvements:
Further refactor code into modules to allow for unit testing.
Adding the click events to the message system object.
Allow users to delete messages from the 'old messages' list.
Allow a user to customize messages (speed, max number at once, color, position, etc.)
Add a search feature to lookup old messages.

