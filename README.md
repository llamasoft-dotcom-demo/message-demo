# message-demo
## Submission by bejumi

### Overall Plan
My goal was to meet the requirements of the exercise using existing, freely available libraries. After researching available options starting with a great [overview article](http://ourcodeworld.com/articles/read/52/top-10-best-notification-libraries-and-plugins-for-javascript-and-jquery). 
After examining the features and API for all the mentioned libraries and doing a cursory google search for a few more, I settled on toastrjs as it was capable of meeting all the requirements and uses jquery which the exercise already relied on. 
After implementing the notification library, I went about solving a pet peeve I have always had with notification systems. 
When a message is dismissed (perhaps because I was in the middle of something or it popped over something I was interacting with) there is often no way to review that message later (I'm looking at you windows, android and ios). 
To fix that, I decided to store a message history so the user could review any missed messages later. 
I followed the same process in finding a suitable library for handling storage, starting [here](https://www.sitepoint.com/9-javascript-libraries-working-with-local-storage/).
I started with basiljs but switched to lockrjs for better handling of collections.

### Requirements
- Messages appear in the top right of the screen
- New messages fade out after 3 sec
- New messages appear below older messages
- Messages have a close button in the corner to hide them  

### Improvements
- The Start Messages button has a toggle visual effect
- Messages can be of type info, success, warning or error
- Messages have a simple progress bar to show when they will auto hide
- Messages are now stored and can be recalled even across browsing sessions
- Message history shows five messages at a time with the ability to clear the history if desired
- Message history displays using the same manner and style as other messages but also include a time-stamp

### Assumptions
- The user has a browser that supports localStorage
  - A check could be added with a fallback to another storage mechanism (session or cookie) if necessary
- The messages should never contain confidential information as they are stored locally
  - If sensitive information is passed using the message system, the messages will have to be encrypted (secstore.js can do this)
- An attempt was made to minimize existing code formatting changes to make the diff clearer
  - This would not be necessary in an environment with code standards or code cleaning tools

### Next Steps
Beyond changing the color of messages and including Bootstrap, I spent very little time restyling the messages or the page. 
The out of the box stye included with toastr is sufficient for this exercise but should be tweaked to match an existing site's themes.
The message history being displayed as notifications makes them look consistent but doesn't work well when new messages are still incoming. 
I would consider building a dedicated UI for message management that would allow a user to delete individual messages without having to clear the entire history.


