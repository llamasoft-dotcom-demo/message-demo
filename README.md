# message-demo by Alexander Heerens

## Thoughts and Ideas

* Even if it is just a small application I wanted to have at least some separation between the logic and the UI. AngularJS would be to much overhead, although the MVC separation is nice. Therefore I decided to keep the messageSystem as an object but separate methods handling the UI from the ones doing the logic.

* Added some custom bootstrap style to get a clean and responsive layout.

* Performance matters, moved JS got the bottom so the browser can already render the page.

* As I wanted to have addition features like "pinning of messages" and "custom messages" the page should look like a message board. 

* To be able to work (pin, delete etc) with the messages I hold them in an array inside the messageSystem. That gives me a control over the messages and their states. 

* I also could have worked completely on the DOM using helper classes instead of an array to hold all messages and states. That would result of course in less JS but have negative effect on the maintainability. As said, model and view should be somehow separated.

* In order to not the write too much HTML inside the JS I created a "message-template" that is copied for every new message. In that way the template can be changed more convenient.

* jQuery comes with some nice fade and delay (queue events) which I could use for the UI sugar. Skipping pinned messages was also quite easy. Discovered that I also need to remove() the message after fade() to clean the DOM.

* Bootstrap JS already had a own logic to remove alerts from the UI but I used my own click event because: a) I also need to update the model and b) I don't want to have another JS lib loaded just for this feature.

* I saw that jQuery was still in an old version. If it is not a company standard/convention it is recommended to have one of the latest version in a new project.

* Added some constants.

* Decided to use a boolean for the running state rather than the button label. A change in wording does not effect the logic.


## Possible TODOs

* There is no validation (not empty) yet for custom messages.

* Custom messages are not secure yet. Text must be escaped to avoid Cross-Site Scripting (XSS)

