# message-demo
I utilized a notification framework called boostrap-notify. I chose this framework because it is robust and highly configurable. It is
based on Bootstrap 3 and jQuery which I was already using to begin with. Please see http://bootstrap-notify.remabledesigns.com/. I
originally was going to do this all from scratch but the directions said you could use any third party libraries. One of the most important
things I have learned from being a software developer is to not re-invent the wheel if you don't have to. Also, never write the same
code twice. With these thoughts in mind I knew I needed to use a framework.

My application satisfies the following Llamasoft conditions...

- Messages should appear near the top of the page
By deafult the messages appear at the top right corner. However, this is configurable. If you click message options you have the choice
to show the messages at the top or bottom of the page. You can also select if they are on the left, right or center of the screen.

- Messages should fade out after 3 seconds
On top of the automatic 3 second fade out there is a button that will close all open messages. You can also close the message by
clicking on the close button in the right hand corner.

- If a new message appears before the previous message fades out, it should appear below the most recent visible message.
Yep, the messages form a queue with FIFO ordering. (First In First Out)


- Messages should have a close or delete box to dismiss the message before the fade out
Each message has a close button to do this.


Added functionality:

- Improved UI
The home page has a dark color scheme and a white Lucida Console font. This greatly improves the readability
of the page. Also, the messages each have a title and icon which improves the look. The icon is my Goldendoodle named Winston.

- Configurable
I created a message options modal that allows a user to change various properties of the messaging system.

- Close all button
There is a button that will close all current messages.

- Indicators
When the messaging system is running a busy loader appears. This lets any user know that the messaging system is active.
Also the Start Messages button not only changes text but changes color as well.


Improvements that could be made:
- Better responsive design.
- Better color scheme. The home page could definitely look better.
- Find a template framework to separate HTML files

If I were to do this again I would do it using AngularJS.
