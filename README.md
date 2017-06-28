# message-demo

# Updates made
* Messages now appear in the bottom right corner of the screen
* Messages dismiss after 3 seconds
* Messages will stack if they come in before the previous one(s) dismiss
* Messages can be automatically closed via the X button
* General layout improvements (using Bootstrap CSS)
* Allow the user to change the color the messages being displayed!

# Code observations
I really did enjoy this exercise and the creative freedom I was given. I added the Bootstrap CSS framework to help a bit with some of the UI components and layout. I am a bit of a novice when it comes to Jquery as I mostly use it only for personal projects, but I find it easy to do what I need. Much of my web development experience is with the ExtJS which is a complete UI framework which uses mostly javascript. While some cringe in the fear of having to constantly learn front end frameworks, I am very excited.

# Potential Improvements
* I think the javascript code overall could use some refactoring. Maybe make use of more closures and split some of the code across multiple files.
* I chose not to use one of the bigger frameworks like Angular 2, however I think an appliation like this would work well especially when it came to implementing the 'Change Color' functionality. Instead of storing reference to the current color in the global scope it could utilize Dependancy Injection Angular 2 provides.

# Above and Beyond
* Added an option to change the color of the message that appear. People love a choice!
* Took the time to educate myself on all the movie quotes provided. After doing so, I modified the data structure a bit to include the name of the person who spoke them. I think it adds a nice touch. Plus it's like Darth Vader is talking to you!
