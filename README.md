#Updates I made and extra features:
1. Alerts now appear as messages that fade in and out.  Position is fixed so user can still see them even when scrolling.
2. When more than one message appears, the message boxes are stacked.
3. Each message has a close button that will remove the message from view.
4. There is a notification system that counts the number of new messages received.  When the notification icon is clicked old 5. Messages and their timestamp can be viewed and the red notification circle is removed on clicking the message list.
6. I created a clear button to remove all notifications.
7. There is a status indicator when the messages are running.
8. I added a media query to make the site responsive on mobile devices. Content is stacked vertically.
9. Layout updated to make the site more readable.

#Interesting things you noticed about the code:
I noticed the mesage system is namespaced to avoid collisions with other objects or variables in the global scope. 

#Suggestions for improvements:
1. Further refactor code into modules to allow for unit testing.
2. Adding the click events to the message system object.
3. Allow users to delete messages from the 'old messages' list.
4. Allow a user to customize messages (speed, max number at once, color, position, etc.)
5. Add a search feature to lookup old messages.

