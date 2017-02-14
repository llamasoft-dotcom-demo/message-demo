# message-demo

# Updates made
* Messages now appear in the top right corner of the screen as they are received.
* Messages are overlayed across the top of the screen to not interfere with underlying components
* Messages append themselves down the side of the screen.
* Some styling enhancements made to the message box
* Ability to close message box manually via the "X" button
* Messages fade out after 3 seconds

# Code observations
* The messageSystem object is placed in the global scope.
* The messageSystem object is an anonymous object. Might serve better as it's own class

# Suggestions
* Refactor the messageSystem so that it does not live in the global scope and it can formally be instaitated via a closure. This will help with reusability.

# Going above and beyond
* Added a countdown bar timer at the bottom of each message to show how long the before the message is removed automatically.
